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
                "morphTargetManagers", // type not yet generated
                "actionManagers", // type not yet generated
                "AddParser", // type not yet generated
                "GetParser", // type not yet generated
                "AddIndividualParser", // type not yet generated
                "GetIndividualParser" // type not yet generated
            ]
        },
        ArcRotateCamera: {
            exclude: [
                "focusOn", // union type
                "setTarget", // union type
                "inputs"] // type not yet generated
        },
        AutoRotationBehavior: {},
        BackEase: {},
        BouncingBehavior: {},
        BoundingBox: {},
        BoundingSphere: {},
        Camera: {
            exclude: [
                "constructor", // invalid super ctor call in subclass
                "dispose", // invalid override in subclass
                "getActiveMeshes", // type not yet generated
                "inputs", // type not yet generated
                "isInFrustum", // interface type
                "isCompletelyInFrustum"  // interface type
            ]
        },
        Color3: {
            exclude: [
                'clampToRef' // union type
            ]
        },
        Color4: {
            exclude: [
                'clampToRef' // union type
            ]
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
        EventState: {},
        ExponentialEase: {},
        FramingBehavior: {
            exclude: [
                "zoomOnMesh", // Nullable<> on function type
                "zoomOnMeshHierarchy", // Nullable<> on function type
                "zoomOnMeshesHierarchy", // Nullable<> on function type
                "zoomOnBoundingInfo" // Nullable<> on function type
            ]
        },
        FreeCamera: {
            exclude: [
                "inputs" // type not yet generated
            ]
        },
        FresnelParameters: {
            include: []
        },
        Geometry: {
            exclude: [
                "extend", // type not yet generated
                "getVertexBuffers" // Nullable<> on return type
            ]
        },
        HemisphericLight: {
            exclude: [
                "getShadowGenerator" // interface type
            ]
        },
        ImageProcessingConfiguration: {
            exclude: [
                "PrepareUniforms", // interface type
                "PrepareSamplers", // interface type
                "prepareDefines" // interface type
            ]
        },
        IntersectionInfo: {},
        Light: {
            exclude: [
                "constructor", // invalid ctor override in subclass
                "getShadowGenerator", // interface type
                "GetConstructorFromName", // Nullable<> on function type
            ]
        },
        Matrix: {
            exclude: [
                "Reflection", // interface type
                "ReflectionToRef" // interface type
            ]
        },
        MultiMaterial: {
            exclude: [
                "subMaterials", // List of Nullable<>
                "value", // List of Nullable<>
                "getChildren" // List of Nullable<>
            ]
        },
        Observable: {},
        Observer: {},
        PickingInfo: {},
        Plane: {},
        PointLight: {},
        PostProcess: {
            include: []
        },
        PushMaterial: {
            exclude: [
                "constructor" // invalid ctor override
            ]
        },
        Quaternion: {},
        Ray: {},
        ShadowLight: {
            exclude: [
                "setShadowProjectionMatrix" // interface type
            ]
        },
        Sprite: {
            include: []
        },
        StandardMaterial: {
            exclude: [
                "getAnimatables" // interface type
            ]
        },
        SubMesh: {
            include: []
        },
        TargetCamera: {
            exclude: [
                "constructor" // invalid ctor override
            ]
        },
        Vector2: {},
        Vector3: {},
        Vector4: {},
        VertexBuffer: {
            exclude: [
                "constructor" // union type
            ]
        },
        VertexData: {},
        Viewport: {}
    },
};
