import { config } from "./config";
import { Class, FunctionType, Interface, Library, Parameter, Scope, ScopeKind, Type, TypeKind, TypeLiteralType, TypeType } from "./model";

export const parseConfigType = (type: string): TypeType => {
    type = type.trim();

    const isArray = type.endsWith("[]");
    if (isArray) {
        type = type.substring(0, type.length - 2);
    }

    const typeParameters: Type[] = [];
    if (type.endsWith(">")) {
        const typeParamsString = type.substring(type.indexOf("<") + 1, type.length - 1);
        type = type.substring(0, type.indexOf("<"));
        const typeParamsStringList = typeParamsString.split(",").map(t => t.trim());
        typeParamsStringList.forEach(t => typeParameters.push(parseConfigType(t)));
    }

    return {
        kind: TypeKind.type,
        name: type,
        isArray,
        typeParameters
    };
}

export const includeTopLevel = (name: string): boolean => {
    return !!config.include[name];
};

export const includeSecondLevel = (topLevelName: string, secondLevelName: string): boolean => {
    if (!config.include[topLevelName]) {
        return false;
    }
    const secondLevelFilter = config.include[topLevelName];
    if (secondLevelFilter.exclude && secondLevelFilter.exclude.indexOf(secondLevelName) !== -1) {
        return false;
    }
    if (secondLevelFilter.include && secondLevelFilter.include.indexOf(secondLevelName) === -1) {
        return false;
    }
    return true;
}

export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const isTypeType = (type: Type): type is TypeType => {
    return type.kind === TypeKind.type;
}

export const isTypeLiteralType = (type: Type): type is TypeLiteralType => {
    return type.kind === TypeKind.typeLiteral;
}

export const isFunctionType = (type: Type): type is FunctionType => {
    return type.kind === TypeKind.function;
}

export const typeLiteralNameFromScope = (scope: Scope): string => {
    let result = "";
    while (scope) {
        result = capitalize(scope.name) + result;
        scope = scope.parent;
    }
    return result;
}

export const firstScopeOfKind = (scope: Scope, kind: ScopeKind): Scope => {
    if (!scope) {
        return null;
    }
    if (scope.kind === kind) {
        return scope;
    }
    return firstScopeOfKind(scope.parent, kind);
}

export const isFirstOptionalParam = (params: Parameter[], index: number): boolean => {
    for (let i = 0; i < index; i++) {
        if (params[i].optional) {
            return false;
        }
    }
    return params[index].optional;
}

export const isLastOptionalParam = (params: Parameter[], index: number): boolean => {
    return params.length === index + 1 && params[index].optional;
}

export const classByName = (name: String, library: Library): Class => {
    for (const clazz of library.classes) {
        if (clazz.name === name) {
            return clazz;
        }
    }
    console.log("class not found: " + name);
    return null;
}

export const interfaceByName = (name: String, library: Library): Interface => {
    for (const interfaze of library.interfaces) {
        if (interfaze.name === name) {
            return interfaze;
        }
    }
    console.log("interface not found: " + name);
    return null;
}

export const implementedInterfaces = (library: Library, clazz: Class, interfaces: Map<string, Interface>): Interface[] => {
    if (clazz) {
        for (const interfaze of clazz.interfaces) {
            interfaces.set(interfaze.name, interfaceByName(interfaze.name, library));
        }
        if (clazz.superType) {
            implementedInterfaces(library, classByName(clazz.superType.name, library), interfaces);
        }
    }
    return Array.from(interfaces.values());
}

export const extendedInterfaces = (library: Library, interfaze: Interface, interfaces: Map<string, Interface>): void => {
    interfaces.set(interfaze.name, interfaceByName(interfaze.name, library));
    for (const superInterfaze of interfaze.superTypes) {
        extendedInterfaces(library, interfaceByName(superInterfaze.name, library), interfaces);
    }
}

export const missingGettersAndSetters = (library: Library, clazz: Class, interfaces: Interface[], properties: Map<string, [boolean, boolean]>): Map<string, [boolean, boolean]> => {
    if (clazz) {
        for (const interfaze of interfaces) {
            for (const property of interfaze.properties) {
                const getterSetter: [boolean, boolean] = [true, true];
                for (const getter of clazz.getters) {
                    if (getter.name === property.name) {
                        getterSetter[0] = false;
                    }
                }
                for (const setter of clazz.setters) {
                    if (setter.name === property.name) {
                        getterSetter[1] = false;
                    }
                }
                for (const prop of clazz.properties) {
                    if (prop.name === property.name) {
                        getterSetter[0] = false;
                        getterSetter[1] = false;
                    }
                }
                let currentGetterSetter = properties.get(property.name);
                if (currentGetterSetter) {
                    currentGetterSetter[0] = currentGetterSetter[0] && getterSetter[0];
                    currentGetterSetter[1] = currentGetterSetter[1] && getterSetter[1];
                } else {
                    properties.set(property.name, getterSetter);
                }
            }
        }
        if (clazz.superType) {
            missingGettersAndSetters(library, classByName(clazz.superType.name, library), interfaces, properties);
        }
    }
    return properties;
}
