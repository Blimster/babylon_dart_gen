import { Config, Type, TypeKind, TypeType } from "./model";

export const config = <Config>{
    fileName: "node_modules/babylonjs/babylon.module.d.ts",
    libraryName: "babylon",
    outFolder: "../babylon_dart/lib/src",
    typeReplacements: {
        "any": "dynamic",
        "string": "String",
        "boolean": "bool",
        "Boolean": "bool",
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
        "Partial<#1>": "#1",
        "HTMLElement": "HtmlElement"
    },
    include: {
        AbstractActionManager: {
            exclude: [
                "Triggerts", // type literal not generated
            ]
        },
        AbstractMesh: {
            exclude: [
                "collider", // not yet generated
                "getIndices", // invalid override
                "getVerticesData", // invalid override
                "setIndices", // invalid override
                "normalizeToUnitCube", // nullable function type
                "intersects", // not yet generatedd
                "intersectsMesh", // union type
            ]
        },
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
        ActionManager: {},
        ArcRotateCamera: {
            exclude: [
                "focusOn", // union type
                "setTarget", // union type
                "inputs", // type not yet generated
                "dispose", // invalid override
            ]
        },
        AutoRotationBehavior: {},
        Bone: {
            exclude: []
        },
        BackEase: {},
        BaseSubMesh: {},
        Behavior: {},
        BouncingBehavior: {},
        BoundingBox: {},
        BoundingInfo: {},
        BoundingSphere: {},
        Camera: {
            exclude: [
                "constructor", // invalid super ctor call in subclass
                "dispose", // invalid override in subclass
                "getActiveMeshes", // type not yet generated
                "inputs", // type not yet generated
                "computeWorldMatrix", // invalid override
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
            include: [
                "dispose"
            ]
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
                "inputs", // type not yet generated
                "dispose" // invalid override
            ]
        },
        FresnelParameters: {
            include: []
        },
        Geometry: {
            exclude: [
                "extend", // type not yet generated
                "getVertexBuffers", // Nullable<> on return type
                "updateVerticesData" // invalid override
            ]
        },
        GroundMesh: {
            exclude: [
                "serialize", // invlalid override
            ]
        },
        HemisphericLight: {
            exclude: [
                "computeWorldMatrix", // invalid override
            ]
        },
        IAction: {},
        IActionEvent: {},
        IAnimatable: {},
        IBehaviorAware: {},
        ICullable: {},
        IDisposable: {},
        IEasingFunction: {},
        IGetSetVerticesData: {},
        IImageProcessingConfigurationDefines: {},
        ImageProcessingConfiguration: {},
        InstancedMesh: {
            exclude: [
                "getVerticesData", // invalid override
                "setIndices", // invalid override
                "getIndices", // invalid override
            ]
        },
        IntersectionInfo: {},
        IPlaneLike: {},
        IShadowGenerator: {
            exclude: [
                "forceCompilation", // Partial<> not replaced
                "forceCompilationAsync", // Partial<> not replaced
            ]
        },
        IShadowLight: {},
        IVector3Like: {},
        Light: {
            exclude: [
                "constructor", // invalid ctor override in subclass
                "GetConstructorFromName", // Nullable<> on function type
            ]
        },
        LinesMesh: {
            exclude: [
                "useVertexColor", // union type
                "useVertexAlpha", // union type
                "isReady", // isReady
                "dispose", // dispose
                "createInstance", // not yet generated
            ]
        },
        MaterialDefines: {},
        Matrix: {},
        MultiMaterial: {
            exclude: [
                "subMaterials", // List of Nullable<>
                "value", // List of Nullable<>
                "getChildren" // List of Nullable<>
            ]
        },
        Mesh: {
            exclude: [
                "morphTargetManager", // not yet generated
                "instantiateHierarchy", // invalid override
                "getLODLevels", // not yet generated
                "validateSkinning", // not yet generated
                "serialize", // invalid override
                "MinMax", // not yet generated
                "Center", // union type
            ]
        },
        MeshBuilder: {},
        Node: {
            exclude: [
                "inspectableCustomProperties", // not yet generated
                "onReady", //  nullable function
                "animationPropertiesOverride", // not yet generated
                "AddNodeConstructor", // not yet generated
                "Construct", // nullable function
                "getAnimationRange", // nullable function
                "getAnimationRanges", // nullable return type
                "beginAnimation", // not yet generated
                "getHierarchyBoundingVectors", // not yet generated, nullable function
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
        ShadowLight: {},
        Sprite: {
            exclude: [
                "constructor",
                "playAnimation",
                "manager",
                "actionManager",
                "Parse"
            ]
        },
        StandardMaterial: {},
        StandardMaterialDefines: {},
        SubMesh: {
            exclude: [
                "intersects" // function type 
            ]
        },
        TargetCamera: {
            exclude: [
                "constructor" // invalid ctor override
            ]
        },
        TransformNode: {
            exclude: [
                "normalizeToUnitCube", // nullable on function
                "lookAt", // enum param
                "setPivotPoint", // enum param
                "rotate", // enum param
                "translate" // enum param
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
