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
        "ArrayBufferView": "List",
        "DataArray": "ByteBuffer",
        "IndicesArray": "Int32List",
        "DeepImmutableObject<#1>": "#1",
        "DeepImmutable<#1>": "#1",
        "ArrayLike<#1>": "List<#1>",
        "Nullable<#1>": "#1",
        "Array<#1>": "List<#1>",
        "Partial<#1>": "#1",
        "HTMLElement": "HtmlElement",
        "HTMLImageElement": "ImageElement",
        "HTMLButtonElement": "ButtonElement",
        "PointerEventInit": "dynamic", // interface for type literal defined by typescript dom lib
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
        Analyser: {
            include: [] // not yet generated 
        },
        Animatable: {},
        AnimationPropertiesOverride: {},
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
        BaseTexture: {},
        Behavior: {},
        BouncingBehavior: {},
        BoundingBox: {},
        BoundingBoxRenderer: {},
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
        Collider: {},
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
        DebugLayer: {},
        DebugLayerTab: {},
        DepthRenderer: {},
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
        EnvironmentHelper: {
            include: [] // not yet generated
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
            ]
        },
        FresnelParameters: {
            include: []
        },
        GamepadManager: {},
        Geometry: {
            exclude: [
                "extend", // type not yet generated
                "getVertexBuffers", // Nullable<> on return type
            ]
        },
        GeometryBufferRenderer: {},
        GlowLayer: {},
        GroundMesh: {},
        HemisphericLight: {},
        HighlightLayer: {},
        IAction: {},
        IActionEvent: {},
        IAnimatable: {},
        IBehaviorAware: {},
        ICollisionCoordinator: {},
        ICullable: {},
        IDisposable: {},
        IEasingFunction: {},
        IEnvironmentHelperOptions: {},
        IExplorerExtensibilityGroup: {},
        IExplorerExtensibilityOption: {},
        IGetSetVerticesData: {},
        IGlowLayerOptions: {},
        IHighlightLayerOptions: {},
        IImageProcessingConfigurationDefines: {},
        IInspectable: {
            exclude: [
                "type", // enum type
            ]
        },
        IInspectorOptions: {
            exclude: [
                "initialTab", // enum type
            ]
        },
        IMotorEnabledJoint: {},
        ImageProcessingConfiguration: {},
        IMultiRenderTargetOptions: {},
        InstancedMesh: {},
        IntersectionInfo: {},
        InternalTexture: {
            exclude: [
                "constructor", // enum
                "source", // enum
            ]
        },
        IOfflineProvider: {},
        IPhysicsEnabledObject: {
            exclude: [
                "rotate", // not yet generatd
                "translate", // not yet generatd
            ]
        },
        IPhysicsEngine: {},
        IPhysicsEnginePlugin: {
            include: [] // CannonJSPlugin does not implement many methods
        },
        IPlaneLike: {},
        IRenderingManagerAutoClearSetup: {},
        ISceneComponent: {},
        IShadowGenerator: {
            exclude: [
                "forceCompilation", // mix of replaceType() and type literal
                "forceCompilationAsync", // mix of replaceType() and type literal
            ]
        },
        IShadowLight: {},
        ISimplificationSettings: {},
        ISimplificationTask: {
            include: [] // not yet generated
        },
        ISize: {},
        ISmartArrayLike: {},
        ISoundOptions: {},
        ISoundTrackOptions: {},
        ISpriteManager: {},
        IVector3Like: {},
        KeyboardInfo: {},
        KeyboardInfoPre: {},
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
        MorphTarget: {},
        MorphTargetManager: {},
        MultiRenderTarget: {
            exclude: [
                "unbindFrameBuffer", // unsupported protected modifier
            ]
        },
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
        Octree: {},
        OctreeBlock: {},
        OutlineRenderer: {
            exclude: [
                "render", // parameter with type starting with an underscore
            ]
        },
        PerfCounter: {},
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
        PointerEventTypes: {},
        PointerInfo: {},
        PointerInfoBase: {},
        PointerInfoPre: {},
        PointLight: {},
        PostProcess: {
            include: []
        },
        PostProcessManager: {},
        PostProcessRenderEffect: {},
        PostProcessRenderPipeline: {},
        PostProcessRenderPipelineManager: {},
        PushMaterial: {},
        Quaternion: {},
        Ray: {},
        ReflectionProbe: {},
        RenderingGroupInfo: {},
        RenderTargetCreationOptions: {},
        RenderTargetTexture: {
            exclude: [
                "unbindFrameBuffer", // unhandled modifier protected
                "setRenderingOrder", // nullable function
                "getCustomRenderList", // not yet generated
            ]
        },
        RuntimeAnimation: {},
        Scene: {
            exclude: [
                "beforeRender", // nullable function
                "afterRender", // nullable function
                "getWorldExtends", // bug in type literal naming for a return type
                "pick", // function type
                "pickWithRay", // function type
                "multiPick", // function type
                "multiPickWithRay", // function type
                "setRenderingOrder", // nullable function
                "addExternalData", // function with type parameters
                "getExternalData", // function with type parameters
                "getOrAddExternalDataWithFactory", // function with type parameters
                "audioListenerPositionProvider", // nullable function
            ]
        },
        SceneOptions: {},
        ShadowLight: {},
        SimplificationQueue: {},
        SmartArray: {},
        SmartArrayNoDuplicate: {},
        Sound: {
            exclude: [
                "constructor", // nullable function
            ]
        },
        SoundTrack: {},
        SphericalHarmonics: {},
        SphericalPolynomial: {},
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
        Texture: {
            exclude: [
                "CreateFromBase64String", // nullable function
                "LoadFromDataString", // nullable function
            ]
        },
        ThinEngine: {
            include: [], // not yet generated
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
        UniformBuffer: {},
        Vector2: {},
        Vector3: {},
        Vector4: {},
        VertexBuffer: {
            exclude: [
                "constructor" // union type
            ]
        },
        VertexData: {},
        Viewport: {},
        VRCameraMetrics: {},
        VRExperienceHelper: {
            include: [] // not yet generated
        },
        VRExperienceHelperOptions: {},
        WebVROptions: {},
        WebXRDefaultExperience: {
            include: [] // not yet generated
        },
        WebXRDefaultExperienceOptions: {
            include: [] // not yet generated
        },
    },
};
