export enum TypeKind {
    type,
    typeLiteral,
    function
}

export interface Type {
    kind: TypeKind;
}

export interface TypeType extends Type {
    name: string;
    isArray: boolean;
    typeParameters: Type[];
}

// TODO type parameters
export interface FunctionType extends Type {
    returnType: Type;
    parameters: Parameter[];
}

export interface Property {
    isStatic: boolean;
    isReadOnly: boolean;
    name: string;
    type: Type;
    doc: string;
}

export interface TypeLiteralType extends Type {
    properties: Property[];
    callSignatures: FunctionType[];
}

export interface Parameter {
    name: string;
    type: Type;
    optional: boolean;
    doc: string;
}

// TODO parse isStatic
export interface Getter {
    name: string;
    returnType: Type;
    isStatic: boolean;
    doc: string;
}

// TODO parse isStatic
export interface Setter {
    name: string;
    parameter: Parameter;
    isStatic: boolean;
    doc: string;
}

// TODO type parameters
export interface Method {
    name: string;
    modifiers: string[];
    returnType: Type;
    parameters: Parameter[];
    doc: string;
}

export interface Constructor {
    parameters: Parameter[];
    doc: string;
}

export interface ClassOrInterface {
    name: string;
    typeParams: string[];
    constructors: Constructor[];
    properties: Property[];
    methods: Method[];
    getters: Getter[];
    setters: Setter[];
}

export interface Class extends ClassOrInterface {
    isAbstract: boolean;
    superType: TypeType;
    interfaces: TypeType[];
}

export interface Interface extends ClassOrInterface {
    isExported: boolean;
    superTypes: TypeType[];
}

export interface Library {
    classes: Class[];
    interfaces: Interface[];
}

export enum ScopeKind {
    clazz,
    function,
    parameter,
    typeLiteral,
    property,
    getter,
    setter
}

export interface Scope {
    parent?: Scope;
    kind: ScopeKind;
    name: string;
}

export interface SecondLevelConfig {
    treatAsTypeLiteral?: boolean;
    include?: string[];
    exclude?: string[];
}

export interface Config {
    fileName: string;
    libraryName: string;
    outFolder: string;
    typeReplacements: { [key: string]: string };
    secondLevelConfigs: { [key: string]: SecondLevelConfig }
}

