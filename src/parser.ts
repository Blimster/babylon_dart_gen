import * as ts from "typescript";
import { Class, Constructor, Parameter, Getter, Setter, Method, Library, Type, TypeType, TypeKind, FunctionType, TypeLiteralType, Property, Interface } from "./model";
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

const parseProperties = (node: ts.Node, checker: ts.TypeChecker, debug?: boolean): Property[] => {
    const result: Property[] = [];
    node.forEachChild(p => {
        if (ts.isPropertyDeclaration(p) || ts.isPropertySignature(p)) {
            const prop = parseProperty(p, checker);
            if (prop) {
                result.push(prop);
            }
        } else {
            if (debug) {
                console.log(p.kind);
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
        optional: checker.isOptionalParameter(parameter),
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

const parseMethods = (node: ts.Node, checker: ts.TypeChecker, debug?: boolean): Method[] => {
    const result: Method[] = [];
    node.forEachChild(n => {
        if (ts.isMethodDeclaration(n) || ts.isMethodSignature(n)) {
            if (!isHidden(n.name.getText())) {
                const symbol = checker.getSymbolAtLocation(n.name);
                result.push({
                    name: n.name.getText(),
                    modifiers: n.modifiers ? n.modifiers.filter(m => m.getText() !== "abstract").map(m => m.getText()) : [],
                    returnType: parseType(n.type, checker),
                    parameters: parseParameters(n.parameters, checker),
                    doc: ts.displayPartsToString(symbol.getDocumentationComment(checker))
                });
            }
        } else {
            if (debug) {
                console.log(n.kind);
            }
        }
    });
    return result;
}

const parseClass = (node: ts.ClassDeclaration, checker: ts.TypeChecker): Class => {
    const symbol = checker.getSymbolAtLocation(node.name);

    if (includeTopLevel(symbol.getName()) && isExported(node)) {
        if (!isHidden(symbol.getName())) {
            const modifiers: string[] = [];
            if (node.modifiers) {
                for (const modifier of node.modifiers) {
                    if (modifier.getText().trim() !== "export") {
                        modifiers.push(modifier.getText().trim());
                    }
                }
            }

            const typeParams: string[] = [];
            if (node.typeParameters) {
                for (const typeParam of node.typeParameters) {
                    typeParams.push(typeParam.name.getText());
                }
            }
            let superType: TypeType = null;
            if (node.heritageClauses) {
                for (const heritageClause of node.heritageClauses) {
                    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                        const typeNode = heritageClause.types[0];
                        superType = parseType(typeNode, checker) as TypeType;
                    }
                }
            }

            return {
                name: symbol.getName(),
                modifiers,
                typeParams,
                superType,
                constructors: parseConstructors(node, checker),
                properties: parseProperties(node, checker),
                getters: parseGetters(node, checker),
                setters: parseSetters(node, checker),
                methods: parseMethods(node, checker)
            };
        }
    }
    return null;
};

const parseInterface = (node: ts.InterfaceDeclaration, checker: ts.TypeChecker): Interface => {
    const symbol = checker.getSymbolAtLocation(node.name);
    if (includeTopLevel(symbol.getName()) && isExported(node)) {
        if (!isHidden(symbol.getName())) {
            const typeParams: string[] = [];
            if (node.typeParameters) {
                for (const typeParam of node.typeParameters) {
                    typeParams.push(typeParam.name.getText());
                }
            }

            let superTypes: TypeType[] = [];
            if (node.heritageClauses) {
                for (const heritageClause of node.heritageClauses) {
                    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                        for (const type of heritageClause.types) {
                            superTypes.push(parseType(type, checker) as TypeType);
                        }
                    }
                }
            }

            const interfaze = {
                name: symbol.getName(),
                typeParams,
                superTypes,
                properties: parseProperties(node, checker),
                methods: parseMethods(node, checker)
            };
            return interfaze;
        }
    }
    return null;
}

const parseNode = (node: ts.Node, checker: ts.TypeChecker, library: Library): void => {
    if (ts.isClassDeclaration(node)) {
        const clazz = parseClass(node, checker);
        if (clazz) {
            library.classes.push(clazz);
        }
    } else if (ts.isInterfaceDeclaration(node)) {
        const interfaze = parseInterface(node, checker);
        if (interfaze) {
            library.interfaces.push(interfaze);
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
        classes: [],
        interfaces: [],
    };
    for (const sourceFile of sourceFiles) {
        if (sourceFile.fileName.indexOf(config.fileName) !== -1) {
            parseNode(sourceFile, checker, library);
        }
    }
    return library;
};
