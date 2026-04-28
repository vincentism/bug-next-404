# ImageKit 使用指南

> OpenCreator 账号 ID：`opencreator`
>
> 基础 URL：`https://ik.imagekit.io/opencreator/`
>
> 存储方式：Amazon S3（bucket: `open-creator-2`，region: `us-east-1`）
>
> S3 中的文件路径直接作为 ImageKit URL 路径使用，如 S3 key `web/xm/avatar/test.png` 对应 URL `https://ik.imagekit.io/opencreator/web/xm/avatar/test.png`

---

## 一、URL 格式

两种传参方式：

```
# 方式一：路径参数（推荐，适用于图片变换）
https://ik.imagekit.io/opencreator/tr:w-600,h-400,f-auto/web/xm/avatar/test.png

# 方式二：查询参数（视频变换必须使用此方式）
https://ik.imagekit.io/opencreator/web/xm/avatar/test.png?tr=w-600,h-400,f-auto
```

多组变换用 `:` 分隔（链式处理）：

```
tr:w-600,f-auto:l-image,i-watermark.png,w-200,l-end
```

> ⚠️ **视频变换注意**：视频变换建议使用**查询参数方式**（`?tr=xxx`），更稳定可靠。

---

## 二、图片压缩与格式转换

### 质量压缩


| 参数          | 说明   | 取值范围        |
| ----------- | ---- | ----------- |
| `q-{value}` | 压缩质量 | 1-100，默认 80 |


```
# 质量 85
tr:q-85

# 低质量预览（用于懒加载占位图）
tr:q-10,bl-30
```

### 格式转换


| 参数       | 说明                          |
| -------- | --------------------------- |
| `f-auto` | 自动选择最优格式（WebP/AVIF），根据浏览器支持 |
| `f-webp` | 强制转 WebP                    |
| `f-avif` | 强制转 AVIF                    |
| `f-jpg`  | 强制转 JPEG                    |
| `f-png`  | 强制转 PNG                     |


```
# 自动格式 + 质量 85（推荐组合）
tr:f-auto,q-85

# 强制转 WebP
tr:f-webp,q-80
```

### 示例

原图 24MB PNG → 自动压缩：

```
https://ik.imagekit.io/opencreator/tr:f-auto,q-85/web/xm/agent-rag-20260401/Avatar/rec8ol7056_2.png
```

---

## 三、自定义尺寸（裁剪与缩放）

### 基础参数


| 参数                 | 说明                    |
| ------------------ | --------------------- |
| `w-{value}`        | 宽度（像素）                |
| `h-{value}`        | 高度（像素）                |
| `ar-{w}-{h}`       | 宽高比，如 `ar-16-9`       |
| `c-maintain_ratio` | 保持比例裁剪（默认）            |
| `c-force`          | 强制拉伸到指定尺寸             |
| `c-at_max`         | 不超过指定尺寸，保持比例          |
| `c-at_least`       | 至少达到指定尺寸，保持比例         |
| `cm-pad_resize`    | 填充模式，不足部分用背景色填充       |
| `bg-{color}`       | 背景色（配合 pad_resize 使用） |


### 裁剪焦点


| 参数          | 说明             |
| ----------- | -------------- |
| `fo-face`   | 人脸居中裁剪         |
| `fo-center` | 居中裁剪（默认）       |
| `fo-top`    | 顶部裁剪           |
| `fo-bottom` | 底部裁剪           |
| `fo-left`   | 左侧裁剪           |
| `fo-right`  | 右侧裁剪           |
| `fo-auto`   | 智能裁剪（自动识别重要区域） |


### 示例

```
# 缩放到 600x400，保持比例裁剪
tr:w-600,h-400

# 缩放到 600x400，人脸居中
tr:w-600,h-400,fo-face

# 限制最大宽度 800，高度自适应
tr:w-800

# 强制 1:1 正方形，智能裁剪
tr:w-400,h-400,fo-auto

# 16:9 比例裁剪
tr:ar-16-9,w-800

# 填充模式，白色背景
tr:w-600,h-600,cm-pad_resize,bg-FFFFFF
```

完整 URL 示例：

```
https://ik.imagekit.io/opencreator/tr:w-600,h-400,f-auto,q-85/web/xm/avatar/test.png
```

---

## 四、图片水印（图层叠加）

### 语法

水印使用图层语法，以 `l-image` 开始，`l-end` 结束：

```
tr:l-image,i-{水印图片路径},{其他参数},l-end
```

### 图片水印参数


| 参数               | 说明                                  |
| ---------------- | ----------------------------------- |
| `l-image`        | 开始图片图层                              |
| `i-{path}`       | 水印图片路径（ImageKit Media Library 中的路径） |
| `w-{value}`      | 水印宽度                                |
| `h-{value}`      | 水印高度                                |
| `lx-{value}`     | X 轴偏移（正值=从左，`N`前缀=从右）               |
| `ly-{value}`     | Y 轴偏移（正值=从上，`N`前缀=从下）               |
| `lfo-{position}` | 图层锚点位置                              |
| `l-end`          | 结束图层                                |


### 位置定位

`lx` 和 `ly` 的 `N` 前缀表示从反方向计算：


| 位置  | 参数              |
| --- | --------------- |
| 左上角 | `lx-20,ly-20`   |
| 右上角 | `lx-N20,ly-20`  |
| 左下角 | `lx-20,ly-N20`  |
| 右下角 | `lx-N20,ly-N20` |
| 居中  | `lfo-center`    |


### 透明度

在图层内使用 `al-` 参数控制透明度：


| 参数           | 说明                   |
| ------------ | -------------------- |
| `al-{value}` | 透明度，1-100（100=完全不透明） |


### 示例

```
# 左下角水印，宽 400px，距边缘 20px
tr:l-image,i-watermark.png,w-400,lx-20,ly-N20,l-end

# 右下角水印，50% 透明度
tr:l-image,i-watermark.png,w-300,lx-N20,ly-N20,al-50,l-end

# 居中水印
tr:l-image,i-watermark.png,w-500,lfo-center,l-end

# 子目录下的水印图片（/ 用 @@ 替代）
tr:l-image,i-brand@@watermark.png,w-400,lx-20,ly-N20,l-end
```

完整 URL 示例（压缩 + 左下角水印）：

```
https://ik.imagekit.io/opencreator/tr:f-auto,q-85:l-image,i-watermark.png,w-400,lx-20,ly-N20,l-end/web/xm/agent-rag-20260401/Avatar/recvf77AltE7Ov_80.png
```

### 文字水印

以 `l-text` 开始：


| 参数           | 说明                           |
| ------------ | ---------------------------- |
| `l-text`     | 开始文字图层                       |
| `i-{text}`   | 水印文字内容（空格用 `%20`）            |
| `fs-{value}` | 字号                           |
| `co-{color}` | 文字颜色（十六进制，如 `FFFFFF`）        |
| `bg-{color}` | 文字背景色                        |
| `pa-{value}` | 内边距（如 `pa-5_15` 表示上下5 左右15）  |
| `ff-{font}`  | 字体文件路径                       |
| `ia-{align}` | 文字对齐：`left`/`center`/`right` |
| `tg-b`       | 加粗                           |
| `r-{value}`  | 背景圆角                         |


```
# 白色文字水印，左下角
tr:l-text,i-OpenCreator,fs-50,co-FFFFFF,lx-20,ly-N20,l-end

# 半透明白色文字（颜色后两位为透明度）
tr:l-text,i-OpenCreator,fs-50,co-FFFFFF80,lx-20,ly-N20,l-end

# 带背景的文字水印
tr:l-text,i-OpenCreator,fs-40,co-FFFFFF,bg-00000080,pa-5_15,r-4,lx-20,ly-N20,l-end
```

---

## 五、视频首帧提取

ImageKit 支持从视频中提取指定时间的帧作为缩略图。

> ⚠️ 视频首帧提取属于视频变换，会消耗视频变换配额。

### 关键：需要 `/ik-thumbnail.jpg` 后缀

提取视频帧时，必须在视频路径后追加 `/ik-thumbnail.jpg`，否则 ImageKit 会返回处理后的视频而不是图片。

### 参数


| 参数             | 说明                                 |
| -------------- | ---------------------------------- |
| `so-{seconds}` | 截取指定秒数的帧（如 `so-0` 为首帧，`so-5` 为第5秒） |
| `w-{value}`    | 缩略图宽度                              |
| `h-{value}`    | 缩略图高度                              |


> 注意：`so` 参数**不能与 `f-jpg`/`f-png` 一起使用**，否则会返回 400 "Invalid Transformation"。`/ik-thumbnail.jpg` 后缀已经指定了输出格式。

### 示例

```
# 获取视频首帧（第0秒）
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4/ik-thumbnail.jpg?tr=so-0

# 获取第3秒的帧
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4/ik-thumbnail.jpg?tr=so-3

# 首帧 + 指定尺寸
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4/ik-thumbnail.jpg?tr=so-0,w-600,h-400
```

---

## 六、视频水印

ImageKit 支持给视频添加图片水印和文字水印。

### ⚠️ 重要：视频变换与图片变换的区别

视频变换和图片变换有几个关键差异，使用前务必了解：

1. **必须使用查询参数格式**：视频变换建议使用**查询参数方式**（`?tr=xxx`），更稳定可靠。
2. **异步处理**：视频变换是异步的，首次请求时 ImageKit 会在后台处理视频。如果处理未在 Video Polling Duration（当前设置为 15 秒）内完成，ImageKit 会返回 302 重定向到原始视频（无水印）。处理完成后再次请求才会返回带水印的视频。
3. **需要预热**：为确保用户首次访问就能获取带水印的视频，需要在视频生成后提前触发 ImageKit 处理（预热）。

### 水印图片要求

水印图片需上传到 ImageKit Media Library，且需注意：

- **使用白色/亮色**水印图片，确保在各种视频画面上都能看清
- **不透明度要高**（alpha 值建议 200+），半透明水印在视频上几乎不可见
- 当前使用的水印图片：`watermark_video_badge.png`（白色 Logo + "OpenCreator" 文字，带半透明黑色圆角背景）

### 图片水印语法

```
?tr=l-image,i-{水印图片路径},{参数},l-end
```

### 文字水印语法

```
?tr=l-text,i-{文字内容},{参数},l-end
```

### 示例

```
# 图片水印 - 左下角（推荐）
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4?tr=l-image,i-watermark_video_badge.png,w-280,lx-25,ly-N25,l-end

# 图片水印 - 右下角
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4?tr=l-image,i-watermark_video_badge.png,w-280,lx-N25,ly-N25,l-end

# 图片水印 - 居中
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4?tr=l-image,i-watermark_video_badge.png,w-400,lfo-center,l-end

# 文字水印 - 左下角白色文字
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4?tr=l-text,i-OpenCreator,fs-40,co-FFFFFFCC,lx-30,ly-N30,l-end

# 文字水印 - 带半透明黑色背景 + 圆角
https://ik.imagekit.io/opencreator/web/xm/video/sample.mp4?tr=l-text,i-OpenCreator,fs-40,co-FFFFFF,bg-00000060,pa-8_16,r-8,lx-30,ly-N30,l-end
```

### 预热机制

视频变换是异步处理的，首次请求可能返回原始视频（302 重定向，content-type 为 `binary/octet-stream`）。为保证用户首次访问就能获取带水印的视频，需要预热。

**判断是否处理完成**：请求带水印的 URL，如果响应 content-type 为 `video/mp4` 则处理完成；如果为 `binary/octet-stream` 则仍在处理中（302 重定向到了原始视频）。

#### 方式一：后端预热（推荐）

在视频生成完成后立即发起一次请求，触发 ImageKit 开始处理。不需要等待结果，用户稍后访问时视频已处理完毕。

```python
import requests

def warmup_video_watermark(video_url: str, timeout: int = 3):
    """
    预热视频水印 URL。
    在视频生成完成后调用，触发 ImageKit 开始处理。
    用户访问时视频已处理完毕，直接返回带水印版本。

    Args:
        video_url: S3 中的视频路径，如 web/xm/video/sample.mp4
    """
    imagekit_url = (
        f"https://ik.imagekit.io/opencreator/{video_url}"
        f"?tr=l-image,i-watermark_video_badge.png,w-280,lx-25,ly-N25,l-end"
    )
    try:
        requests.head(imagekit_url, timeout=timeout)
    except requests.RequestException:
        pass  # 预热失败不影响业务，用户访问时会重新触发处理
```

适用场景：视频生成到用户访问之间有一定时间间隔（>15 秒），预热请求触发处理即可。

#### 方式二：前端轮询预热

在前端展示视频前，轮询检测水印视频是否处理完成，完成后再展示给用户。

```typescript
const IMAGEKIT_BASE = 'https://ik.imagekit.io/opencreator'
const WATERMARK_TR = 'l-image,i-watermark_video_badge.png,w-280,lx-25,ly-N25,l-end'

/**
 * 预热 ImageKit 视频水印 URL
 * 轮询直到处理完成，返回带水印的视频 URL
 *
 * @param videoPath - S3 中的视频路径，如 web/xm/video/sample.mp4
 * @param maxRetries - 最大重试次数，默认 10 次
 * @param interval - 轮询间隔（毫秒），默认 3000ms
 * @returns 带水印的视频 URL，超时则返回原始 URL 兜底
 */
async function warmupVideoWatermark(
  videoPath: string,
  maxRetries = 10,
  interval = 3000,
): Promise<string> {
  const watermarkUrl = `${IMAGEKIT_BASE}/${videoPath}?tr=${WATERMARK_TR}`
  const originalUrl = `${IMAGEKIT_BASE}/${videoPath}`

  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(watermarkUrl, { method: 'HEAD' })
      const contentType = res.headers.get('content-type') || ''

      // content-type 为 video/mp4 表示处理完成
      // 为 binary/octet-stream 表示 302 重定向到了原始视频（未处理完）
      if (res.ok && contentType.includes('video/')) {
        return watermarkUrl
      }
    } catch {
      // 网络错误，继续重试
    }

    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  // 超时兜底，返回原始视频 URL
  return originalUrl
}
```

使用示例：

```typescript
// 视频生成完成后，获取带水印的 URL
const watermarkedUrl = await warmupVideoWatermark('web/xm/video/sample.mp4')

// 用于播放
videoElement.src = watermarkedUrl

// 用于下载
downloadLink.href = watermarkedUrl
```

适用场景：视频生成后用户可能立即访问，需要前端等待处理完成后再展示。最多等待约 30 秒（10 次 × 3 秒），超时返回原始视频兜底。

### Dashboard 配置

在 ImageKit Dashboard → Settings → Video 中：


| 配置项                                    | 推荐值             | 说明                                     |
| -------------------------------------- | --------------- | -------------------------------------- |
| Optimize video quality before delivery | ON              | 自动压缩视频                                 |
| Default quality                        | 50              | 视频压缩质量                                 |
| Video Polling Duration                 | 15 seconds（最大值） | 首次请求时 ImageKit 等待处理完成的时间，超时则 302 到原始视频 |


---

## 七、其他常用参数


| 参数            | 说明              | 示例                |
| ------------- | --------------- | ----------------- |
| `bl-{value}`  | 高斯模糊            | `bl-10`           |
| `e-sharpen`   | 锐化              | `e-sharpen`       |
| `e-grayscale` | 灰度              | `e-grayscale`     |
| `r-{value}`   | 圆角              | `r-20`（20px 圆角）   |
| `r-max`       | 圆形              | `r-max`           |
| `rt-{value}`  | 旋转角度            | `rt-90`           |
| `pr-true`     | 渐进式加载（GIF 保持动画） | `pr-true`         |
| `di-{path}`   | 默认图片（原图不存在时显示）  | `di-default.png`  |
| `dpr-{value}` | 设备像素比           | `dpr-2`（Retina 屏） |


---

## 八、OpenCreator 常用组合

### 标准图片（压缩 + 自动格式）

```
https://ik.imagekit.io/opencreator/tr:f-auto,q-85/{图片路径}
```

### GIF 图片（保持动画）

```
https://ik.imagekit.io/opencreator/tr:f-auto,q-85,pr-true/{图片路径}
```

### 自定义尺寸

```
https://ik.imagekit.io/opencreator/tr:f-auto,q-85,w-600,h-800/{图片路径}
```

### 图片 + 左下角水印

```
https://ik.imagekit.io/opencreator/tr:f-auto,q-85:l-image,i-watermark.png,w-400,lx-20,ly-N20,l-end/{图片路径}
```

### 视频首帧

```
https://ik.imagekit.io/opencreator/{视频路径}/ik-thumbnail.jpg?tr=so-0
```

### 视频 + 图片水印（查询参数格式）

```
https://ik.imagekit.io/opencreator/{视频路径}?tr=l-image,i-watermark_video_badge.png,w-280,lx-25,ly-N25,l-end
```

### 视频 + 文字水印（查询参数格式）

```
https://ik.imagekit.io/opencreator/{视频路径}?tr=l-text,i-OpenCreator,fs-40,co-FFFFFF,bg-00000060,pa-8_16,r-8,lx-30,ly-N30,l-end
```

---

## 九、注意事项

1. 文件路径使用 S3 中的实际 key（如 `web/xm/avatar/test.png`）
2. 水印图片需要先上传到 ImageKit Media Library
3. 路径中的 `/` 在图层参数 `i-` 中用 `@@` 替代（如 `i-brand@@watermark.png`）
4. `lx`/`ly` 使用 `N` 前缀表示从右/从下计算偏移
5. 颜色值使用十六进制，不带 `#`（如 `co-FFFFFF`）
6. 颜色后两位可加透明度（如 `co-FFFFFF80` = 50% 透明白色）
7. **视频变换建议使用查询参数格式**（`?tr=xxx`）
8. **视频首帧提取必须在路径后追加 `/ik-thumbnail.jpg`**，否则返回的是视频而不是图片
9. **视频变换是异步处理的**，首次请求可能返回 302 重定向到原始视频，需要预热机制保证用户体验
10. 首次请求会触发处理和缓存，后续请求直接从 CDN 返回
11. 视频水印图片建议使用白色/亮色、高不透明度（alpha 200+），避免在视频上不可见

