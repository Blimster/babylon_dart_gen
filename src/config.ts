import { Config } from "./model";

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
    secondLevelConfigs: {
        AbstractActionManager: {
            exclude: [
                "Triggers", // type literal not generated
            ]
        },
        AbstractMesh: {
            exclude: [
                "collider", // not yet generated
                "normalizeToUnitCube", // nullable function type
                "intersects", // not yet generatedd
                "intersectsMesh", // union type
                "instancedBuffers", // unsupported
                "edgesRenderer", // not yet generated
                "createOrUpdateSubmeshesOctree", // not yet generated
            ]
        },
        AbstractScene: {
            exclude: [
                "morphTargetManagers", // type not yet generated
                "actionManagers", // type not yet generated
                "AddParser", // type not yet generated
                "GetParser", // type not yet generated
                "AddIndividualParser", // type not yet generated
                "GetIndividualParser", // type not yet generated
                "proceduralTextures", // not yet generated
                "sounds", // not yet generated
            ]
        },
        ActionManager: {},
        ArcRotateCamera: {
            exclude: [
                "focusOn", // union type
                "setTarget", // union type
                "inputs", // type not yet generated
            ]
        },
        AutoRotationBehavior: {},
        Bone: {
            include: [
                "constructor"
            ]
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
                "getActiveMeshes", // type not yet generated
                "inputs", // type not yet generated
                "computeWorldMatrix", // invalid override
            ]
        },
        CannonJSPlugin: {},
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
        EffectLayer: {},
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
            ]
        },
        FresnelParameters: {
            include: []
        },
        Geometry: {
            exclude: [
                "extend", // type not yet generated
                "getVertexBuffers", // Nullable<> on return type
            ]
        },
        GlowLayer: {},
        GroundMesh: {},
        HemisphericLight: {},
        HighlightLayer: {},
        IAction: {},
        IActionEvent: {},
        IAnimatable: {},
        IBehaviorAware: {},
        ICullable: {},
        IDisposable: {},
        IEasingFunction: {},
        IGetSetVerticesData: {},
        IGlowLayerOptions: {},
        IHighlightLayerOptions: {},
        IImageProcessingConfigurationDefines: {},
        IMotorEnabledJoint: {},
        ImageProcessingConfiguration: {},
        InstancedMesh: {},
        IntersectionInfo: {},
        IPhysicsEnabledObject: {
            exclude: [
                "rotate", // not yet generatd
                "translate", // not yet generatd
            ]
        },
        IPhysicsEnginePlugin: {
            include: [] // CannonJSPlugin does not implement many methods
        },
        IPlaneLike: {},
        IShadowGenerator: {
            exclude: [
                "forceCompilation", // mix of replaceType() and type literal
                "forceCompilationAsync", // mix of replaceType() and type literal
            ]
        },
        IShadowLight: {},
        IVector3Like: {},
        Layer: {},
        LensFlare: {},
        LensFlareSystem: {},
        Light: {
            exclude: [
                "GetConstructorFromName", // Nullable<> on function type
            ]
        },
        LinesMesh: {
            exclude: [
                "useVertexColor", // union type
                "useVertexAlpha", // union type
                "createInstance", // not yet generated
                "clone", // invalid override
            ]
        },
        Material: {
            exclude: [
                "inspectableCustomProperties", // not yet implemented
                "onCompiled", // nullable function
                "onError", // nullable function
                "getRenderTargetTextures", // nullable function
                "meshMap", // nullable function
                "bindSceneUniformBuffer", // not yet generated
                "forceCompilation", // not yet generated
                "forceCompilationAsync", // not yet generated
            ]
        },
        MaterialDefines: {},
        Matrix: {},
        MultiMaterial: {},
        Mesh: {
            exclude: [
                "morphTargetManager", // not yet generated
                "instantiateHierarchy", // invalid override
                "getLODLevels", // not yet generated
                "validateSkinning", // not yet generated
                "MinMax", // not yet generated
                "Center", // union type
                "simplify", // not yet implemented
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
                "getAnimationRanges", // net yet generated
                "beginAnimation", // not yet generated
                "getHierarchyBoundingVectors", // not yet generated, nullable function
            ]
        },
        Observable: {},
        Observer: {},
        PhysicsImpostor: {
            exclude: [
                "onCollideEvent", // nullable function type
                "onCollide", // not yet generated
            ]
        },
        PhysicsImpostorJoint: {},
        PhysicsImpostorParameters: {
            treatAsTypeLiteral: true
        },
        PhysicsJoint: {},
        PhysicsJointData: {},
        PhysicsRaycastResult: {
            exclude: [
                "setHitData", // not yet generated
            ]
        },
        PickingInfo: {},
        Plane: {},
        PointLight: {},
        PostProcess: {
            include: []
        },
        PushMaterial: {},
        Quaternion: {},
        Ray: {},
        ReflectionProbe: {},
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
        TargetCamera: {},
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
