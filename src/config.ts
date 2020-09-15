import { Config, Type, TypeKind, TypeType } from "./model";

export const config = <Config>{
    fileName: "babylon.d.ts",
    libraryName: "babylon",
    outFolder: "../babylon_dart/lib/src",
    typeReplacements: {
        "any": "dynamic",
        "string": "String",
        "boolean": "bool",
        "number": "num",
        "float": "num",
        "Float32Array": "Float32List",
        "FloatArray": "Float32List",
        "Uint8Array": "Uint8List",
        "DataArray": "ByteBuffer",
        "IndicesArray": "Int32List",
        "DeepImmutableObject<#1>": "#1",
        "DeepImmutable<#1>": "#1",
        "ArrayLike<#1>": "List<#1>",
        "Nullable<#1>": "#1",
        "Array<#1>": "List<#1>",
        "HTMLElement": "HtmlElement"
    },
    include: {
        AbstractScene: {
            exclude: [
                "morphTargetManagers",
                "actionManagers",
                "AddParser",
                "GetParser",
                "AddIndividualParser",
                "GetIndividualParser"
            ]
        },
        ArcRotateCamera: {
            exclude: [
                "focusOn",
                "setTarget",
                "onMeshTargetChangedObservable",
                "inputs"]
        },
        AutoRotationBehavior: {},
        BackEase: {},
        BouncingBehavior: {},
        BoundingBox: {},
        BoundingSphere: {},
        Camera: {
            exclude: [
                "constructor",
                "toString",
                "dispose",
                "getActiveMeshes",
                "inputs",
                "attachControl",
                "onViewMatrixChangedObservable",
                "onProjectionMatrixChangedObservable",
                "onAfterCheckInputsObservable",
                "onRestoreStateObservable",
                "isInFrustum",
                "isCompletelyInFrustum"]
        },
        Color3: {
            exclude: ['clampToRef']
        },
        Color4: {
            exclude: ['clampToRef']
        },
        ColorCurves: {},
        DataBuffer: {},
        DetailMapConfiguration: {
            include: []
        },
        EasingFunction: {},
        Effect: {
            include: []
        },
        ExponentialEase: {},
        FramingBehavior: {
            exclude: [
                "zoomOnMesh",
                "zoomOnMeshHierarchy",
                "zoomOnMeshesHierarchy",
                "zoomOnBoundingInfo"]
        },
        FreeCamera: {
            exclude: ["inputs"]
        },
        FresnelParameters: {
            include: []
        },
        Geometry: {
            exclude: [
                "extend",
                "getVertexBuffers"
            ]
        },
        HemisphericLight: {
            exclude: ["getShadowGenerator"]
        },
        ImageProcessingConfiguration: {
            exclude: [
                "onUpdateParameters",
                "PrepareUniforms",
                "PrepareSamplers",
                "prepareDefines"]
        },
        IntersectionInfo: {},
        Light: {
            exclude: [
                "constructor",
                "getShadowGenerator",
                "toString",
                "transferToEffect",
                "transferToNodeMaterialEffect",
                "GetConstructorFromName",
                "prepareLightSpecificDefines"]
        },
        Matrix: {
            exclude: [
                "Reflection",
                "ReflectionToRef"]
        },
        MultiMaterial: {
            exclude: [
                "subMaterials",
                "value",
                "getChildren"]
        },
        PickingInfo: {},
        Plane: {},
        PointLight: {},
        PostProcess: {
            include: []
        },
        PushMaterial: {
            exclude: ["constructor"]
        },
        Quaternion: {},
        Ray: {},
        ShadowLight: {
            include: []
        },
        Sprite: {
            include: []
        },
        StandardMaterial: {
            exclude: ["getAnimatables"]
        },
        SubMesh: {
            include: []
        },
        TargetCamera: {
            exclude: ["constructor"]
        },
        Vector2: {},
        Vector3: {},
        Vector4: {},
        VertexBuffer: {
            exclude: ["constructor"]
        },
        VertexData: {},
        Viewport: {}
    },
};
