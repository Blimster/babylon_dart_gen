import * as ts from "typescript";
import { Class, Constructor, Parameter, Getter, Setter, Method, Library, Type, TypeType, TypeKind, FunctionType, TypeLiteralType, Property } from "./model";
import { config } from "./config";
import { includeTopLevel, isTypeType } from "./helper";

const isExported = (node: ts.Node): boolean => {
    return (
        (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0 ||
        (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
}

const isHidden = (name: string): boolean => {
    return name.startsWith("_");
}

const parseProperty = (node: ts.PropertyDeclaration | ts.PropertySignature, checker: ts.TypeChecker): Property => {
    if (!node.name.getText().startsWith("_")) {
        if (node.type) {
            return <Property>{
                name: node.name.getText(),
                type: parseType(node.type, checker)
            }
        }
        return <Property>{
            name: node.name.getText(),
            type: {
                kind: TypeKind.type,
                name: "dynamic",
            }
        }
    }
    return null;
}

const parseProperties = (node: ts.ClassDeclaration, checker: ts.TypeChecker): Property[] => {
    const result: Property[] = [];
    node.forEachChild(p => {
        if (ts.isPropertyDeclaration(p)) {
            const prop = parseProperty(p, checker);
            if (prop) {
                result.push(prop);
            }
        }
    });
    return result;
}


const parseType = (typeNode: ts.TypeNode, checker: ts.TypeChecker): Type => {
    if (ts.isArrayTypeNode(typeNode)) {
        const elementType = parseType(typeNode.elementType, checker);
        if (isTypeType(elementType)) {
            return <TypeType>{
                kind: TypeKind.type,
                name: (parseType(typeNode.elementType, checker) as TypeType).name,
                typeParameters: [],
                isArray: true
            }
        }
    } else if (ts.isTypeReferenceNode(typeNode)) {
        return <TypeType>{
            kind: TypeKind.type,
            name: typeNode.typeName.getText(),
            typeParameters: typeNode.typeArguments ? typeNode.typeArguments.map(ta => parseType(ta, checker)) : [],
            isArray: false
        }
    } else if (ts.isTypeLiteralNode(typeNode)) {
        const properties: Property[] = [];
        typeNode.members.forEach(m => {
            if (ts.isPropertySignature(m)) {
                properties.push(parseProperty(m, checker));
            }
        });
        return <TypeLiteralType>{
            kind: TypeKind.typeLiteral,
            properties
        };
    } else if (ts.isFunctionTypeNode(typeNode)) {
        return <FunctionType>{
            kind: TypeKind.function,
            returnType: parseType(typeNode.type, checker),
            parameters: parseParameters(typeNode.parameters, checker)
        };
    } else {
        return <TypeType>{
            kind: TypeKind.type,
            name: typeNode.getText(),
            typeParameters: [],
            isArray: false
        };
    }
}

const parseParameter = (parameter: ts.ParameterDeclaration, checker: ts.TypeChecker): Parameter => {
    //console.log(parameter.type.getText() + " -> " + parameter.type.kind);
    return {
        name: parameter.name.getText(),
        type: parseType(parameter.type, checker),
        doc: "TODO"
    };
}

const parseParameters = (parameters: ts.NodeArray<ts.ParameterDeclaration>, checker: ts.TypeChecker): Parameter[] => {
    return parameters.map(p => parseParameter(p, checker))
}

const parseConstructors = (clazz: ts.ClassDeclaration, checker: ts.TypeChecker): Constructor[] => {
    const result: Constructor[] = [];

    clazz.forEachChild(c => {
        if (ts.isConstructorDeclaration(c)) {
            result.push({
                parameters: parseParameters(c.parameters, checker),
                doc: "TODO"
            });
        }
    });

    return result;
};

const parseGetters = (node: ts.ClassDeclaration, checker: ts.TypeChecker): Getter[] => {
    const result: Getter[] = [];
    node.forEachChild(n => {
        if (ts.isGetAccessorDeclaration(n)) {
            if (!isHidden(n.name.getText())) {
                const symbol = checker.getSymbolAtLocation(n.name);
                result.push({
                    name: n.name.getText(),
                    returnType: parseType(n.type, checker),
                    doc: ts.displayPartsToString(symbol.getDocumentationComment(checker))
                });
            }
        }
    });
    return result;
}

const parseSetters = (node: ts.ClassDeclaration, checker: ts.TypeChecker): Setter[] => {
    const result: Setter[] = [];
    node.forEachChild(n => {
        if (ts.isSetAccessorDeclaration(n)) {
            if (!isHidden(n.name.getText())) {
                const symbol = checker.getSymbolAtLocation(n.name);
                result.push({
                    name: n.name.getText(),
                    parameter: parseParameter(n.parameters[0], checker),
                    doc: ts.displayPartsToString(symbol.getDocumentationComment(checker))
                });
            }
        }
    });
    return result;
}

const parseMethods = (node: ts.ClassDeclaration, checker: ts.TypeChecker): Method[] => {
    const result: Method[] = [];
    node.forEachChild(n => {
        if (ts.isMethodDeclaration(n)) {
            if (!isHidden(n.name.getText())) {
                const symbol = checker.getSymbolAtLocation(n.name);
                // console.log(n.name.getText() + " -> " + n.type.kind);
                result.push({
                    name: n.name.getText(),
                    modifiers: n.modifiers ? n.modifiers.map(m => m.getText()) : [],
                    returnType: parseType(n.type, checker),
                    parameters: parseParameters(n.parameters, checker),
                    doc: ts.displayPartsToString(symbol.getDocumentationComment(checker))
                });
            }
        }
    });
    return result;
}

const parseClass = (node: ts.ClassDeclaration, checker: ts.TypeChecker): Class => {
    const symbol = checker.getSymbolAtLocation(node.name);

    if (includeTopLevel(symbol.getName()) && isExported(node)) {
        if (!isHidden(symbol.getName())) {
            let superType: TypeType = null;
            if (node.heritageClauses) {
                for (const heritageClause of node.heritageClauses) {
                    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                        const symbol = checker.getSymbolAtLocation(heritageClause.types[0].expression);
                        const typeNode = heritageClause.types[0];
                        superType = parseType(typeNode, checker) as TypeType;
                    }
                }
            }

            const clazz = {
                name: symbol.getName(),
                superType,
                constructors: parseConstructors(node, checker),
                properties: parseProperties(node, checker),
                getters: parseGetters(node, checker),
                setters: parseSetters(node, checker),
                methods: parseMethods(node, checker)
            };
            return clazz;
        }
    }
    return null;
};

const parseNode = (node: ts.Node, checker: ts.TypeChecker, library: Library): void => {
    if (ts.isClassDeclaration(node)) {
        const clazz = parseClass(node, checker)
        if (clazz) {
            library.classes.push(clazz);
        }
    } else {
        ts.forEachChild(node, (n) => parseNode(n, checker, library));
    }

};

export const parseLibraries = (): Library => {
    const program = ts.createProgram({
        rootNames: [config.fileName],
        options: {
        },
    });
    const checker = program.getTypeChecker();
    const sourceFiles = program.getSourceFiles();

    const library: Library = {
        classes: []
    };
    for (const sourceFile of sourceFiles) {
        if (sourceFile.fileName.indexOf(config.fileName) !== -1) {
            parseNode(sourceFile, checker, library);
        }
    }
    return library;
};
