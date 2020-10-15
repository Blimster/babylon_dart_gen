import { classByName, implementedInterfaces, interfaceByName, isTypeType, mapToObject, missingGettersAndSetters, replaceType } from "./helper";
import { Class, Library, Parameter, TypeType } from "./model";

const convertClassPropertiesToGettersAndSetters = (library: Library): void => {
    for (const clazz of library.classes) {
        for (const property of clazz.properties) {
            clazz.getters.push({
                name: property.name,
                returnType: property.type,
                isStatic: property.isStatic,
                doc: property.doc
            });
            if (!property.isReadOnly) {
                clazz.setters.push({
                    name: property.name,
                    parameter: {
                        name: property.name,
                        type: property.type,
                        optional: false,
                        doc: property.doc
                    },
                    isStatic: property.isStatic,
                    doc: property.doc
                });
            }
        }
        clazz.properties = [];
    }
}

const addMissingGettersAndSetters = (library: Library): void => {
    for (const clazz of library.classes) {
        const missing = missingGettersAndSetters(library, clazz, implementedInterfaces(library, clazz, new Map()), new Map());
        missing.forEach(entry => {
            const property = entry.property;
            if (entry.getter) {
                clazz.getters.push({
                    name: property.name,
                    returnType: property.type,
                    isStatic: property.isStatic,
                    doc: property.doc
                });
            }
            if (entry.setter) {
                if (!property.isReadOnly) {
                    clazz.setters.push({
                        name: property.name,
                        parameter: {
                            name: property.name,
                            type: property.type,
                            optional: false,
                            doc: property.doc
                        },
                        isStatic: property.isStatic,
                        doc: property.doc
                    });
                }
            }
        });
    }
}

const fixParamTypesOfFixedInvalidOverrides = (parameters: Parameter[], clazz: Class, library: Library): void => {
    const typeReplaceMap = new Map<string, string>();
    for (const interfaze of clazz.interfaces) {
        const originalInterfaze = interfaceByName(interfaze.name, library);
        for (let i = 0; i < originalInterfaze.typeParams.length; i++) {
            typeReplaceMap.set(originalInterfaze.typeParams[i], (interfaze.typeParameters[i] as TypeType).name);
        }
    }
    if (typeReplaceMap.size > 0) {
        for (const param of parameters) {
            const type = param.type;
            if (isTypeType(type)) {
                const newType = replaceType(type, null, mapToObject(typeReplaceMap, true)) as TypeType;
                if (newType) {
                    type.name = newType.name;
                    type.typeParameters = newType.typeParameters;
                }
            }
        }
    }
}

const addMissingConstructors = (library: Library): void => {
    for (const clazz of library.classes) {
        if (clazz.superType) {
            const superClazz = classByName(clazz.superType.name, library);
            if (superClazz.constructors.length === 1 && superClazz.constructors[0].parameters.length > 0 && clazz.constructors.length === 0) {
                clazz.constructors = [Object.assign({}, superClazz.constructors[0])];
            }
        }
    }
    for (const interfaze of library.interfaces) {
        for (const superType of interfaze.superTypes) {
            const superClazz = classByName(superType.name, library);
            if (superClazz) {
                if (superClazz.constructors.length === 1 && superClazz.constructors[0].parameters.length > 0 && interfaze.constructors.length === 0) {
                    interfaze.constructors = [Object.assign({}, superClazz.constructors[0])];
                }
            }
        }
    }
};

const fixInvalidOverrides = (library: Library): void => {
    for (const clazz of library.classes) {
        const interfaces = implementedInterfaces(library, clazz, new Map());
        for (const clazzMethod of clazz.methods) {
            for (const interfaze of interfaces) {
                for (const interfazeMethod of interfaze.methods) {
                    if (clazzMethod.name === interfazeMethod.name) {
                        clazzMethod.parameters = [];
                        for (const param of interfazeMethod.parameters) {
                            clazzMethod.parameters.push(Object.assign({}, param));
                        }
                        for (const param of clazzMethod.parameters) {
                            fixParamTypesOfFixedInvalidOverrides(clazzMethod.parameters, clazz, library);
                        }
                    }
                }
            }
        }
        let superClazz = clazz.superType ? classByName(clazz.superType.name, library) : null;
        while (superClazz) {
            for (const clazzMethod of clazz.methods) {
                for (const superClazzMethod of superClazz.methods) {
                    if (clazzMethod.name === superClazzMethod.name) {
                        clazzMethod.parameters = [];
                        for (const param of superClazzMethod.parameters) {
                            clazzMethod.parameters.push(Object.assign({}, param));
                        }
                    }
                }
            }
            superClazz = superClazz.superType ? classByName(superClazz.superType.name, library) : null;
        }
    }
}

export const sanitizeLibrary = (library: Library): Library => {
    convertClassPropertiesToGettersAndSetters(library);
    addMissingGettersAndSetters(library);
    addMissingConstructors(library);
    fixInvalidOverrides(library);
    return library;
}