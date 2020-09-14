import { Config, Type, TypeKind, TypeType } from "./model";

export const config = <Config>{
    fileName: "babylon.d.ts",
    libraryName: "babylon",
    typeReplacements: {
        "any": "dynamic",
        "string": "String",
        "boolean": "bool",
        "number": "num",
        "float": "num",
        "DeepImmutableObject<#1>": "#1",
        "DeepImmutable<#1>": "#1",
        "ArrayLike<#1>": "List<#1>",
        "Nullable<#1>": "#1",
    },
    include: {
        Quaternion: {
            include: [],
            exclude: [],
        },
        Vector3: {
            include: [],
            exclude: [],
        },
        Scene: {
            include: [],
            exclude: [],
        },
        MeshBuilder: {
            include: [],
            exclude: [],
        }
    },
};
