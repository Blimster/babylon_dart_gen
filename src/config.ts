import { Config } from "./model";

export const config = <Config>{
    fileNames: [
        "node_modules/babylonjs/babylon.module.d.ts",
        "node_modules/babylonjs-serializers/babylonjs.serializers.module.d.ts"
    ],
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
                "attachControl", // invalid override
                "detachControl", // invalid override
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
                {
                    name: "attachControl",
                    paramNames: ["ignored", "noPreventDefault"]
                }, // method override
                {
                    name: "detachControl",
                    paramNames: ["ignored"],
                }, // method override
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
        CSG: {},
        CubeTexture: {},
        DataBuffer: {},
        DebugLayer: {},
        DebugLayerTab: {},
        DepthRenderer: {},
        DepthSortedParticle: {},
        DetailMapConfiguration: {
            include: []
        },
        DirectionalLight: {},
        EasingFunction: {},
        Effect: {
            include: [
                "dispose"
            ]
        },
        EffectFallbacks: {},
        EffectLayer: {},
        EnvironmentHelper: {
            include: [] // not yet generated
        },
        EventState: {},
        ExponentialEase: {},
        FramingBehavior: {},
        FreeCamera: {
            exclude: [
                "inputs", // type not yet generated
                "attachControl", // invalid override
                "detachControl", // invalid override
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
        GLTFData: {},
        GLTF2Export: {},
        GroundMesh: {},
        HemisphericLight: {},
        HighlightLayer: {},
        IAction: {},
        IActionEvent: {},
        IAnimatable: {},
        IBehaviorAware: {},
        IClipPlanesHolder: {},
        ICollisionCoordinator: {},
        IColor4Like: {},
        ICreateCapsuleOptions: {},
        ICullable: {},
        ICustomShaderNameResolveOptions: {},
        IDisposable: {},
        IEasingFunction: {},
        IEdgesRendererOptions: {},
        IEffectFallbacks: {},
        IEnvironmentHelperOptions: {},
        IExplorerExtensibilityGroup: {},
        IExplorerExtensibilityOption: {},
        IExportOptions: {},
        IGetSetVerticesData: {},
        IGlowLayerOptions: {},
        IHighlightLayerOptions: {},
        IImageProcessingConfigurationDefines: {},
        IInspectable: {},
        IInspectorOptions: {
            treatAsTypeLiteral: true,
        },
        IIOptionShadowDepthMaterial: {},
        IMaterialAnisotropicDefines: {},
        IMaterialBRDFDefines: {},
        IMaterialClearCoatDefines: {},
        IMaterialCompilationOptions: {},
        IMaterialSheenDefines: {},
        IMaterialSubSurfaceDefines: {},
        IMotorEnabledJoint: {},
        ImageProcessingConfiguration: {},
        ImageProcessingPostProcess: {},
        IMaterialDetailMapDefines: {},
        IMultiRenderTargetOptions: {},
        InspectableType: {},
        InstancedMesh: {},
        InternalTextureSource: {},
        IntersectionInfo: {},
        InternalTexture: {},
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
        Light: {},
        LinesMesh: {
            exclude: [
                "useVertexColor", // union type
                "useVertexAlpha", // union type
                "createInstance", // not yet generated
                "clone", // invalid override
                "enableEdgesRendering", // invalid override
            ]
        },
        Material: {
            exclude: [
                "inspectableCustomProperties", // not yet implemented
                "meshMap", // nullable function
                "bindSceneUniformBuffer", // not yet generated
                "forceCompilation", // not yet generated
                "forceCompilationAsync", // not yet generated
                "onEffectCreatedObservable", // object literal
            ]
        },
        MaterialDefines: {},
        MaterialOnEffectCreatedObservable: {},
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
                "cloneMeshMap", // unsupported type
            ]
        },
        MeshBuilder: {},
        ModelShape: {},
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
                "animationPropertiesOverride", // not yet generated
                "AddNodeConstructor", // not yet generated
                "getAnimationRange", // not yet generated
                "getAnimationRanges", // not yet generated
                "beginAnimation", // not yet generated
                "getHierarchyBoundingVectors", // not yet generated
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
        PassPostProcess: {},
        PBRAnisotropicConfiguration: {},
        PBRBaseMaterial: {},
        PBRBaseSimpleMaterial: {},
        PBRBRDFConfiguration: {},
        PBRClearCoatConfiguration: {},
        PBRCustomMaterial: {},
        PBRMaterial: {},
        PBRMetallicRoughnessMaterial: {},
        PBRSheenConfiguration: {},
        PBRSpecularGlossinessMaterial: {},
        PBRSubSurfaceConfiguration: {},
        PerfCounter: {},
        PhysicsImpostor: {
            exclude: [
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
        PrePassConfiguration: {
            exclude: [
                "previousWorldMatrices", // unsupported type
                "previousBones", // unsupported type
            ]
        },
        PrePassEffectConfiguration: {
            convertFunctionPropertiesToFunctions: true,
        },
        PrePassRenderer: {},
        PushMaterial: {},
        Quaternion: {},
        Ray: {},
        ReflectionProbe: {},
        RenderingGroupInfo: {},
        RenderTargetCreationOptions: {},
        RenderTargetTexture: {
            exclude: [
                "unbindFrameBuffer", // unhandled modifier protected
                "getCustomRenderList", // not yet generated
            ]
        },
        RuntimeAnimation: {},
        Scalar: {},
        Scene: {
            exclude: [
                "getWorldExtends", // bug in type literal naming for a return type
                "pick", // function type
                "pickWithRay", // function type
                "multiPick", // function type
                "multiPickWithRay", // function type
                "addExternalData", // function with type parameters
                "getExternalData", // function with type parameters
                "getOrAddExternalDataWithFactory", // function with type parameters
            ]
        },
        SceneOptions: {},
        ShadowDepthWrapper: {},
        ShadowLight: {},
        SimplificationQueue: {},
        SmartArray: {},
        SmartArrayNoDuplicate: {},
        SolidParticle: {},
        SolidParticleSystem: {
            exclude: [
                "pickedParticles", // array of type literals
                "pickedBySubMesh", // array of type literals
                "pickedParticle", // nullable type literal
            ]
        },
        SolidParticleVertex: {},
        Sound: {},
        SoundTrack: {},
        Space: {},
        SphericalHarmonics: {},
        SphericalPolynomial: {},
        Sprite: {
            exclude: [
                "Parse", // not yet generated
                "position", // invalid override
                "color", // invalid override
            ]
        },
        StandardMaterial: {},
        StandardMaterialDefines: {},
        SubMesh: {
            exclude: [
                "intersects", // function type 
            ]
        },
        SubSurfaceConfiguration: {
            overrides: {
                "postProcess": {
                    getter: "external PostProcess get postProcess;",
                    setter: "external set postProcess(PostProcess postProcess);",
                }
            }
        },
        SubSurfaceScatteringPostProcess: {},
        TargetCamera: {},
        Texture: {},
        ThinEngine: {
            include: [], // not yet generated
        },
        ThinSprite: {},
        ThinTexture: {},
        TransformNode: {},
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
