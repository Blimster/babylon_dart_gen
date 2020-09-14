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
    name: string;
    type: Type;
}

export interface TypeLiteralType extends Type {
    properties: Property[];
}

export interface Parameter {
    name: string;
    type: Type;
    doc: string;
}

export interface Getter {
    name: string;
    returnType: Type;
    doc: string;
}

export interface Setter {
    name: string;
    parameter: Parameter;
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

export interface Class {
    name: string;
    superType: TypeType;
    constructors: Constructor[];
    getters: Getter[];
    setters: Setter[];
    methods: Method[];
}

export interface Library {
    classes: Class[];
}

export enum ScopeKind {
    clazz,
    function,
    parameter,
    typeLiteral,
    property
}

export interface Scope {
    parent?: Scope;
    kind: ScopeKind;
    name: string;
}

export interface SecondLevelFilter {
    include?: string[];
    exclude?: string[];
}

export interface Config {
    fileName: string;
    libraryName: string;
    typeReplacements: { [key: string]: string };
    include: { [key: string]: SecondLevelFilter }
}

