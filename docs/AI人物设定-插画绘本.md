# AI 人物设定 · 插画绘本风格

> 配合《我的一生》网站素材制作。画风：**偏插画绘本**（柔和水彩 / 淡彩铅 / 绘本叙事感）。  
> 所有章节提示词请复用本文「全局风格锚点」与「角色基准描述」。

---

## 全局风格锚点（每条提示词末尾必贴）

### 中文
```
插画绘本风格，柔和水彩晕染，淡彩铅笔线稿，温暖叙事感，
中国九十年代至当代青春回忆录美学，非动漫，非写实照片，
画面干净留白，情绪细腻克制，轻微纸张纹理
```

### 英文（Midjourney / Flux / 即梦通用）
```
illustrated picture book style, soft gouache watercolor, gentle colored pencil lines,
warm nostalgic Chinese coming-of-age memoir, 1990s-2010s atmosphere,
not anime, not photorealistic, clean composition with breathing space,
subtle paper texture, emotional and restrained
```

### 角色卡专用后缀
```
portrait card illustration, 3:4 vertical, soft background bokeh, character centered,
storybook character design sheet
```

### 背景视频关键帧后缀
```
cinematic storybook scene, 16:9 widescreen, no text, no watermark,
soft ambient light, suitable for slow loop animation
```

---

## 色彩原则（对齐 config 章节色）

| 时期 | 色调倾向 |
|------|----------|
| 小学 1–2 | 暖杏、天蓝、阳光高饱和 |
| 初中 3–4 | 淡紫、粉红、少女心 |
| 初三夏–高一 5–6 | 橙黄、靛蓝夜 |
| 高三 7–8 | 青白明亮 → 灰蓝低沉 |
| 复读夏 9 | 金黄灯火 |
| 大学 10–14 | 紫粉、草绿、雨蓝、暖橙图书馆 |
| 研究生–职场 15–17 | 珊瑚、冷灰、棕褐 |
| 移植仓 18 | 深紫柔光，克制不惨烈 |

---

## 角色基准设定（Character Bible）

> **一致性规则**：同一角色跨章节只改年龄、服装、场景；脸型、发型主线、气质不变。  
> 生成满意基准图后，后续全部用 **角色参考 / 垫图** 延续（可灵：文生图上传 `public/images/ref/` 照片）。  
> **真人参考明细**：见 `真人参考照片对照表.md` · 可灵逐章提示词见 `真人参考-可灵提示词增补.md`。

---

### 东方波（主角 · 男）

| 项 | 设定 |
|----|------|
| 真人参考 | 初中 `ref/初中东方波.jpg`（**中间**）、高三 `ref/高三东风波.jpg`（**左侧**）、大学 `ref/大一东方波c.jpg`、青年 `ref/大四东方波.jpg` |
| 基准年龄脸 | **方框眼镜**，黑色短发，温和笑容，偏斯文 |
| 发型 | 黑色短发，大学略蓬松，职场整齐 |
| 气质 | 内向、认真；大学时期笑得更开朗 |
| 服装线索 | 格纹衬衫+马甲 → 蓝白棒球夹克 → 正装地铁 → 工位耳机 |

**基准提示词（青年·大学，对齐大一参考照）**
```
东方波，中国男生，大学年纪，黑色短发，方框眼镜，笑容开朗温和，
红蓝格纹衬衫与米色针织马甲（可场景化简），
插画绘本水彩风格，保持参考图同一人五官
```

**英文**
```
Dongfang Bo, young Chinese man, college age, short black hair, gentle quiet eyes,
introverted and sincere, casual white tee, headphones around neck,
illustrated picture book watercolor style
```

#### 初中参考 · `ref/初中东方波.jpg`（**中间**）

蹲姿男生，白黑拼色运动外套，牛仔裤，托腮笑容。可灵垫图时提示词写明「只取中间人物」。用于 **ch03**。

#### 高三参考 · `ref/高三东风波.jpg`（**左侧**）

浅灰外套、酒红内搭、方框眼镜、温和微笑。可灵垫图时提示词写明「只取左侧男生」。用于 **ch07、ch08**。

---

### 小梦（青梅 · 女）— 第 1、2、4 章

| 项 | 设定 |
|----|------|
| 真人参考 | `ref/小梦.jpg`（长直发齐刘海、鹅蛋脸、温柔笑、米色毛衣） |
| 绘本调整 | 小学章改为**黑色马尾**，保留眉眼与温柔气质；ch4 更娇俏 |
| 气质 | 温暖开朗 → ch4 古灵精怪大小姐 |
| 服装 | 红领巾演出服 → 运动服 → 明亮连衣裙 |

**基准提示词（小学·领舞，垫图 小梦.jpg）**
```
参考图同一女生五官，改为小学生，黑色马尾，活泼自信，
红领巾白衬衫或舞台演出服，编舞领舞，笑容明亮温暖
```

**英文**
```
Xiao Meng, Chinese girl, elementary school age, black ponytail, bright lively eyes,
confident smile, red scarf and white shirt or stage dance costume,
picture book illustration, leading a dance
```

---

### 阿驰（好友 · 男）— 第 5、6 章

| 项 | 设定 |
|----|------|
| 真人参考 | `ref/阿驰.jpg`（户外白T）、`ref/阿驰2.jpg`（**KTV 持麦**） |
| 脸型 | 瘦长脸，**方框眼镜**，短碎黑发 |
| 气质 | 爽朗、哥们感 |
| 服装 | 白色印花 T（绘本可简化图案） |

**基准提示词（ch06 垫图 阿驰2.jpg）**
```
参考图同一男生，方框眼镜，短碎黑发，KTV持话筒，
白色T恤，蓝紫霓虹包厢，唱月亮惹的祸的真诚笑容
```

**英文**
```
A Chi, Chinese teenage boy, short cropped hair, thick eyebrows, easy grin,
brotherly vibe, loose summer tee, gaming or holding karaoke mic,
storybook watercolor illustration
```

---

### 瑶瑶（女）— 第 9 章

| 项 | 设定 |
|----|------|
| 真人参考 | `ref/瑶瑶.jpg`（侧分长发、白毛绒珍珠领毛衣） |
| 标志 | 珍珠滚边圆领毛衣 → 绘本可保留「白色柔软毛衣」识别点 |
| 气质 | 安静温柔，聚会唱歌时认真 |

**基准提示词（垫图 瑶瑶.jpg）**
```
参考图同一女生，黑色长发侧分微卷，白色毛绒珍珠领毛衣气质，
夏夜聚会持话筒，暖黄灯光，眼神认真
```

---

### 小晴（女）— 第 13、14 章

| 项 | 设定 |
|----|------|
| 真人参考 | `ref/小晴.jpg`（黑框眼镜、灰蓝针织帽、淡紫围巾、深棕长发） |
| 气质 | 烂漫（13）→ 坚毅疲惫（14） |
| 绘本 | ch13 可保留冬装或改为秋装；ch14 去帽围，加图书馆书堆 |

**基准提示词（大学·烂漫）**
```
小晴，中国女生，大学生，黑色长发，笑容干净烂漫，
电影院或校园夜色，青春文艺感
```

**基准提示词（考研·坚毅）**
```
小晴，同一中国女生大学生，黑色长发，略显疲惫但眼神坚定，
图书馆台灯下复习，书堆在旁边，暖橙灯光
```

---

### 小洁（女友 · 女）— 第 15 章

| 项 | 设定 |
|----|------|
| 真人参考 | `ref/小洁.jpg`（**圆形金框眼镜**、深发挽起、白高领+灰开衫） |
| 气质 | 平和温柔，略带心事 |

**基准提示词（垫图 小洁.jpg）**
```
参考图同一女生，圆形金框眼镜，深发挽起，白高领灰开衫，
研究生年纪，窗边秋雨，手捧小说，情绪细腻克制
```

---

### 娣总（护士 · 女）— 第 18 章

| 项 | 设定 |
|----|------|
| 气质 | 温暖、专业、沉稳，不冷冰冰 |
| 服装 | 护士服或浅蓝工作服，柔和微笑 |
| **注意** | 不做成医疗纪录片；绘本式温暖陪伴 |

**基准提示词**
```
娣总，中国女性护士，三十岁上下，温和专业微笑，
浅蓝护士服，柔和病房灯光，陪伴者的温暖气质，克制治愈
```

---

## 推荐制作顺序

1. 用本文基准提示词 + 全局风格锚点，各出 **7 张基准肖像**（满意为止）
2. 小梦 ch01 垫图 → 生成 ch02、ch04
3. 小晴 ch13 垫图 → 生成 ch14
4. 东方波 ch07 垫图 → 批量扩展 ch03、08、10–12、16、17
5. 再进入《AI分镜提示词-插画绘本.md》按章出场景与视频关键帧

---

## 负面提示词（建议每条都加）

```
photorealistic, 3D render, anime, manga, chibi, ugly, deformed hands,
extra fingers, text, watermark, logo, harsh lighting, blood, horror,
overly dramatic medical scene, low quality, blurry face
```

---

*文档版本：2026-06-10 · 画风：插画绘本*
