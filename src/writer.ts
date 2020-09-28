import { Library, Class, Constructor, Method, Type, TypeType, TypeLiteralType, Parameter, Scope, ScopeKind, Getter, Setter, Property } from "./model"
import { config } from "./config";
import { firstScopeOfKind, includeSecondLevel as includeSecondLevel, isFirstOptionalParam, isFunctionType, isLastOptionalParam, isTypeLiteralType, isTypeType, parseConfigType, typeLiteralNameFromScope } from "./helper";
import { existsSync, mkdirSync, writeFileSync } from "fs";

class Writer {
    private lines: string[] = [];

    constructor(private fileName: string) { }

    writeToken(token: string): void {
        this.lines.push(token);
    }

    writeLine(line?: string): void {
        this.writeToken((line ? line : "") + "\n");
    }

    toFile(): void {
        const outFolder = config.outFolder;
        if (!existsSync(outFolder)) {
            mkdirSync(outFolder);
        }
        const content = this.lines.join("");
        writeFileSync(outFolder + "/" + this.fileName, content);
    }
}

const isMatchingType = (type1: Type, type2: Type): boolean => {
    if (isTypeType(type1) && isTypeType(type2)) {
        if (type1.name.startsWith("#") || type2.name.startsWith("#")) {
            return true;
        }
        if (type1.name !== type2.name) {
            return false;
        }
        if (type1.typeParameters.length !== type2.typeParameters.length) {
            return false;
        }
        for (let i = 0; i < type1.typeParameters.length; i++) {
            if (!isMatchingType(type1.typeParameters[i], type2.typeParameters[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

const typeOfPlaceholder = (type: Type, typeReplacement: Type, placeholder: string): Type => {
    if (isTypeType(type) && isTypeType(typeReplacement)) {
        if (typeReplacement.name === placeholder) {
            return type;
        }

        for (let i = 0; i < typeReplacement.typeParameters.length; i++) {
            const r = typeOfPlaceholder(type.typeParameters[i], typeReplacement.typeParameters[i], placeholder);
            if (r) {
                return r;
            }
        }
    }
    return null;
}

const replaceType = (type: Type, scope: Scope): Type => {
    if (isTypeType(type)) {
        for (const tr in config.typeReplacements) {
            const replacementType = parseConfigType(tr);
            if (isMatchingType(type, replacementType)) {
                let replacement = config.typeReplacements[tr];
                const tokens = replacement.match(/#[0-9]+/g);
                if (tokens) {
                    for (const token of tokens) {
                        const placeHolderType = typeOfPlaceholder(type, replacementType, token);
                        replacement = replacement.replace(token, typeToString(placeHolderType, scope));
                    }
                }
                const result = parseConfigType(replacement);
                result.isArray = type.isArray;
                return result;
            }
        }
    }
    return type;
}

const handleThisType = (type: TypeType, scope: Scope): string => {
    if (type.name === 'this') {
        const classScope = firstScopeOfKind(scope, ScopeKind.clazz);
        if (classScope) {
            return classScope.name;
        }
    }
    return type.name;
}

const typeToString = (type: Type, scope: Scope): string => {
    type = replaceType(type, scope);
    if (isTypeType(type)) {
        let result = "";
        if (type.isArray) {
            result += "List<";
        }
        result += handleThisType(type, scope);
        if (type.typeParameters && type.typeParameters.length > 0) {
            result += "<";
            result += type.typeParameters.map(t => typeToString(t, scope)).join(", ");
            result += ">";
        }
        if (type.isArray) {
            result += ">";
        }

        return result;
    } else if (isFunctionType(type)) {
        return typeToString(type.returnType, scope) + " Function(" + (type.parameters.map(p => typeToString(p.type, scope) + " " + p.name)).join(", ") + ")";
    } else if (isTypeLiteralType(type)) {
        return typeLiteralNameFromScope(scope);
    }
    return "UNSUPPORTED: " + type.kind;
};

const parameterToString = (parameter: Parameter, scope: Scope): string => {
    const paramScope = <Scope>{
        kind: ScopeKind.parameter,
        name: parameter.name,
        parent: scope
    };
    return typeToString(parameter.type, paramScope) + " " + parameter.name;
}

const parametersToString = (parameters: Parameter[], scope: Scope): string => {
    const params: string[] = [];
    for (let i = 0; i < parameters.length; i++) {
        const p = parameters[i];
        let paramString = "";
        if (isFirstOptionalParam(parameters, i)) {
            paramString += "[";
        }
        paramString += parameterToString(p, scope);
        if (isLastOptionalParam(parameters, i)) {
            paramString += "]";
        }
        params.push(paramString);
    }
    return "(" + params.join(", ") + ")";
}

const writeConstructor = (ctor: Constructor, scope: Scope, writer: Writer): void => {
    if (includeSecondLevel(scope.name, "constructor")) {
        writer.writeLine("  external " + firstScopeOfKind(scope, ScopeKind.clazz).name + parametersToString(ctor.parameters, scope) + ";");
    }
}

const writeMethod = (method: Method, scope: Scope, writer: Writer): void => {
    if (includeSecondLevel(firstScopeOfKind(scope, ScopeKind.clazz).name, method.name)) {
        const methodScope = <Scope>{
            kind: ScopeKind.function,
            name: method.name,
            parent: scope
        };
        writer.writeLine("  external " + (method.modifiers.length > 0 ? method.modifiers.join(" ") + " " : "") + typeToString(method.returnType, methodScope) + " " + method.name + parametersToString(method.parameters, methodScope) + ";");
    }
}

const writeGetter = (getter: Getter, scope: Scope, writer: Writer): void => {
    const getterScope = <Scope>{
        kind: ScopeKind.getter,
        name: getter.name,
        parent: scope
    };
    writer.writeLine("  external " + typeToString(getter.returnType, getterScope) + " get " + getter.name + ";");
}

const writeSetter = (setter: Setter, scope: Scope, writer: Writer): void => {
    const getterScope = <Scope>{
        kind: ScopeKind.setter,
        name: setter.name,
        parent: scope
    };
    writer.writeLine("  external set " + setter.name + "(" + parameterToString(setter.parameter, scope) + ");");
}

const writeGettersAndSetters = (getters: Getter[], setters: Setter[], scope: Scope, writer: Writer): void => {
    for (const getter of getters) {
        if (includeSecondLevel(scope.name, getter.name)) {
            writeGetter(getter, scope, writer);
        }
    }
    for (const setter of setters) {
        if (includeSecondLevel(scope.name, setter.name)) {
            writeSetter(setter, scope, writer);
        }
    }
}

const writeProperties = (properties: Property[], scope: Scope, writer: Writer): void => {
    for (const property of properties) {
        if (includeSecondLevel(scope.name, property.name)) {
            writer.writeLine("  " + typeToString(property.type, scope) + " " + property.name + ";");
        }
    }
}

const typeLiteralsForTypeLiteral = (type: TypeLiteralType, scope: Scope, result: { [key: string]: TypeLiteralType }): void => {
    result[typeLiteralNameFromScope(scope)] = type;
    type.properties.forEach(p => {
        if (isTypeLiteralType(p.type)) {
            const propertyScope = <Scope>{
                kind: ScopeKind.property,
                name: p.name,
                parent: scope
            }
            typeLiteralsForTypeLiteral(p.type, propertyScope, result);
        }
    });
}

const typeLiteralsForClass = (clazz: Class): { [key: string]: TypeLiteralType } => {
    const result = <{ [key: string]: TypeLiteralType }>{};
    const classScope = <Scope>{
        kind: ScopeKind.clazz,
        name: clazz.name
    };

    clazz.methods.forEach(m => {
        const methodScope = <Scope>{
            kind: ScopeKind.function,
            name: m.name,
            parent: classScope
        };
        if (isTypeLiteralType(m.returnType)) {
            result[typeLiteralNameFromScope(methodScope) + "Result"] = m.returnType;
        }
        m.parameters.forEach(p => {
            if (isTypeLiteralType(p.type)) {
                const paramScope = <Scope>{
                    kind: ScopeKind.parameter,
                    name: p.name,
                    parent: methodScope
                };
                typeLiteralsForTypeLiteral(p.type, paramScope, result);
            }
        });
    });

    return result;
}

const writeTypeLiteral = (name: string, typeLiteral: TypeLiteralType, scope: Scope, writer: Writer): void => {
    writer.writeLine("@JS()");
    writer.writeLine("@anonymous");
    writer.writeLine("class " + name + " {");
    writer.writeLine("  external factory " + name + "({" + typeLiteral.properties.map(tl => typeToString(tl.type, scope) + " " + tl.name).join(", ") + "});");
    typeLiteral.properties.forEach(prop => {
        const propertyScope = <Scope>{
            kind: ScopeKind.property,
            name: prop.name,
            parent: scope
        };
        writer.writeLine("  external " + typeToString(prop.type, propertyScope) + " get " + prop.name + ";");
    });
    writer.writeLine("}");
}

const writeClass = (clazz: Class, writer: Writer): void => {
    const scope = <Scope>{
        kind: ScopeKind.clazz,
        name: clazz.name
    };

    writer.writeLine("part of " + config.libraryName + ";");

    const typeLiterals = typeLiteralsForClass(clazz);
    Object.keys(typeLiterals).forEach(name => {
        writer.writeLine();
        writeTypeLiteral(name, typeLiterals[name], {
            kind: ScopeKind.typeLiteral,
            name: name
        }, writer);
    });

    writer.writeLine();
    writer.writeLine("@JS()");
    if (clazz.modifiers.length > 0) {
        writer.writeToken(clazz.modifiers.join(" ") + " ");
    }
    writer.writeToken("class " + clazz.name);
    if (clazz.typeParams.length > 0) {
        writer.writeToken("<" + clazz.typeParams.join(", ") + ">");
    }
    if (clazz.superType) {
        writer.writeToken(" extends " + typeToString(clazz.superType, null));
    }
    writer.writeLine(" {");
    for (const ctor of clazz.constructors) {
        writeConstructor(ctor, scope, writer);
    }
    writeProperties(clazz.properties, scope, writer);
    writeGettersAndSetters(clazz.getters, clazz.setters, scope, writer);
    for (const method of clazz.methods) {
        writeMethod(method, scope, writer);
    }
    writer.writeLine("}");
    writer.writeLine();
    writer.toFile();
}

export const writeLibrary = (library: Library): void => {
    for (const clazz of library.classes) {
        writeClass(clazz, new Writer(clazz.name.toLowerCase() + ".dart"));
    }
}