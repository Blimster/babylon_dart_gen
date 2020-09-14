import { config } from "./config";
import { FunctionType, Scope, ScopeKind, Type, TypeKind, TypeLiteralType, TypeType } from "./model";

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
