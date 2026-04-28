# Node Data 类型审计（当前实现）

## 背景

当前项目的节点运行时数据统一使用 `src/types/nodeTypes.tsx` 中的 `NodeDataType`。  
该类型在一个全局结构中混合了输入节点、任务节点、工具节点、静态节点的所有字段，导致：

- 类型提示噪声高（大量字段对当前节点不适用）
- `model_options` 通过宽泛索引签名承载，缺乏节点级约束
- 迁移 agent 场景时很难建立严格的数据契约

## 全局 `NodeDataType` 字段总览

`NodeDataType` 当前包含这些主要字段：

- 公共：`label`、`description`、`themeColor`、`status`、`workflowId`、`inputHint`
- 输入：`inputText`、`imageBase64`、`inputAudio`、`inputVideo`、`inputVideoPoster`、`inputVideoDuration`
- 模型：`selectedModels`、`modelConfigs`、`model_options`
- UI/流程：`modelCardColor`、`isSelectMode`、`userStatus`、`hideResults`
- 节点专有：`lensStyle`、`lensStyleEnabled`、`assembleAssets`、`assemblePayload`
- 便签专有：`stickyMode`、`stickyArrow`、`stickyRotation`、`stickyWidth`、`stickyHeight`、`local_file`
- 图生视频专有：`imageInputMode`、`inputImageOrder`、`hasInitializedDefaultModel`
- 疑似历史字段：`toolbarVisible`、`layoutOrder`、`iconName`、`isImageInput`、`isTextInput`、`isTextPinConnected`、`isImagePinConnected`、`type`

## 按节点类型的实际 data 使用

### 输入节点

- `textInput`: `inputHint`、`status`、`inputText`
- `imageInput`: `inputHint`、`status`、`imageBase64`
- `audioInput`: `inputHint`、`status`、`inputAudio`
- `videoInput`: `inputHint`、`status`、`inputVideo`、`inputVideoPoster`、`inputVideoDuration`

### 文本节点

- `textGenerator`: `inputText`、`selectedModels`、`modelConfigs`、`model_options.attachments`、`modelCardColor`、`isSelectMode`、`hideResults`、`userStatus`
- `scriptSplit`: `selectedModels`、`model_options.attachments`、`themeColor`、`hideResults`、`userStatus`

### 图像节点

- `imageMaker`: `inputText`、`selectedModels`、`modelConfigs`、`lensStyle`、`lensStyleEnabled`、`modelCardColor`
- `imageToImage`: `inputText`、`selectedModels`、`modelConfigs`、`lensStyle`、`lensStyleEnabled`、`modelCardColor`
- `oneClickStyle`: `selectedModels`、`isSelectMode`、`themeColor`、`modelCardColor`
- `imageUpscaler`: `model_options.upscale_factor`、`modelCardColor`
- `describeImage`: `selectedModels`、`modelConfigs`、`modelCardColor`
- `backgroundEditor`: `inputText`、`model_options.model_mode`、`modelCardColor`
- `relight`: `selectedModels`、`modelConfigs`、`modelCardColor`
- `imageAngleControl`: `selectedModels`、`modelConfigs`、`modelCardColor`

### 视频节点

- `videoMaker`: `inputText`、`imageBase64`、`selectedModels`、`modelConfigs`、`isSelectMode`、`imageInputMode`、`inputImageOrder`、`hasInitializedDefaultModel`、`modelCardColor`
- `textToVideo`: `inputText`、`selectedModels`、`modelConfigs`、`modelCardColor`
- `videoToVideo`: `selectedModels`、`modelConfigs`、`model_options.duration`、`model_options.node_mode`、`model_options.keep_audio`、`modelCardColor`
- `syncVideoAudio`: `inputText`、`modelCardColor`
- `videoLipSync`: `selectedModels`、`model_options.loop_mode`、`modelCardColor`
- `videoUpscaler`: `model_options.upscale_factor`、`model_options.frames_per_second`、`modelCardColor`
- `klingMotionControl`: `selectedModels`、`modelConfigs`、`model_options.motion_control_batch_mode`、`modelCardColor`
- `imageAudioToVideo`: `selectedModels`、`modelCardColor`

### 音频节点

- `textToSpeech`: `inputText`、`selectedModels`、`modelConfigs`、`model_options`、`modelCardColor`
- `musicGenerator`: `inputText`、`model_options.make_instrumental`、`modelCardColor`
- `voiceCloner`: `selectedModels`、`modelCardColor`

### 工具节点

- `assembleNow`: `inputHint`、`status`、`assembleAssets`、`assemblePayload`

### 静态节点

- `stickyNodesNode`: `inputText`、`backgroundColor`、`stickyMode`、`stickyArrow`、`stickyRotation`、`stickyWidth`、`stickyHeight`、`imageBase64`、`inputVideo`、`inputAudio`、`local_file`
- `imageAnnotationNode`: `imageBase64`
- `videoAnnotationNode`: `inputVideo`
- `groupNode`: `label`、`inputHint`、`backgroundColor`

## 模型相关字段审计

### `selectedModels`

- 任务节点主要模型入口字段，绝大多数任务节点会读取或写入。
- 还被用于 UI 初始化、默认模型补全、执行前规范化。

### `modelConfigs`

- 类型是 `{ [modelId: string]: ModelConfigItem }`。
- 覆盖 common/lens/angle/motion/relight 等多类参数：
  - 通用：`aspect_ratio`、`duration`、`resolution`、`quality` 等
  - 语音：`voice_ids`、`voice_setting` 等
  - 特定能力：`horizontal_angle`、`character_orientation`、`light_x` 等

### `model_options`

当前是混合结构，常见子字段：

- `attachments`（textGenerator/scriptSplit）
- `model_mode`（backgroundEditor）
- `loop_mode`（videoLipSync）
- `upscale_factor`（imageUpscaler/videoUpscaler）
- `frames_per_second`（videoUpscaler）
- `make_instrumental`（musicGenerator）
- `node_mode`、`duration`、`keep_audio`（videoToVideo）
- `motion_control_batch_mode`（klingMotionControl）
- provider 透传字段（如语音供应商下的 `selected_voices`）

## 结论

`NodeDataType` 已经承担了“全节点通用 DTO”的角色，但它不再适合承载强类型约束。  
为支持后续 agent 能力建设，应迁移到：

- 分层基础类型（Base / Input / Task / Tool / Static）
- 按 `nodeType` 判别联合
- 按节点拆分 `model_options` 类型定义
- Store 的 `updateNodeData` 使用节点类型约束而不是 `Record<string, unknown>`
