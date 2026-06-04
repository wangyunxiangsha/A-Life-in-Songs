# 沉浸式多章节故事网站 · 通用构建提示词

帮我创建一个沉浸式、多章节的故事型单页网站框架。这是一个纯前端单页应用，无后端，所有内容通过一个配置文件驱动。

---

## 一、技术栈

- **React 19 + TypeScript + Vite**
- **Tailwind CSS 3.x**
- **shadcn/ui** 基础组件（基于 Radix UI）
- **GSAP 3.x + ScrollTrigger**（所有动画与视差效果）
- **Lenis**（平滑滚动，duration: 1.2，指数衰减 easing）
- **lucide-react** 图标库
- 不使用路由，单页滚动

---

## 二、核心设计理念：双轴交互

网站有两个核心交互维度：

1. **章节切换**：多个主题章节（数量由配置决定），每章拥有独立的背景视频、粒子效果和色彩主题，通过导航或滚动触发切换
2. **时间/状态滑块**：固定在页面底部的水平滑块，拖动时实时改变画面的亮度、色调、饱和度，模拟某种状态的连续变化（例如：时间推移、情绪变化等）

---

## 三、全局视觉系统

### 色彩结构
- 背景：深色（接近纯黑）
- 文字：浅色（接近纯白）
- 每个章节有独立的**主题色**，用于：按钮高亮、面板左边框、粒子颜色、发光效果
- 玻璃面板效果：`backdrop-filter: blur(20px) saturate(1.2)`，边框 `rgba(255,255,255,0.15)`
- 暗角遮罩：`radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)` 固定全屏叠加

### 字体系统
通过 Google Fonts 加载，建议使用：
- 展示标题：衬线字体（如 Noto Serif、EB Garamond 或等效字体）
- 正文：无衬线字体
- 标签/数据：等宽字体（如 Space Mono）

---

## 四、页面区块结构

### 4.1 固定背景层（z-index 0~2）

三层全屏固定背景叠加：

**第1层 - 视频背景（z:0）**
- 每个章节各一支循环播放的背景视频
- 章节切换时：opacity 淡出 → 换源 → 淡入（约 500ms）
- CSS filter 受底部滑块实时控制（brightness / saturate / hue-rotate / sepia）

**第2层 - 暗角遮罩（z:1）**
- 径向渐变，`pointer-events: none`

**第3层 - 粒子画布（z:2）**
- 全屏 Canvas，`pointer-events: none`
- 每个章节有各自的粒子类型和行为（粒子形状、数量、运动方式由配置定义）

---

### 4.2 导航栏（fixed, z:50）

- 高度约 80px，水平 padding 约 5vw
- 背景：线性渐变从 `rgba(0,0,0,0.3)` 到透明 + `backdrop-filter: blur(8px)`
- **左侧**：网站 Logo（主标题 + 副标题/slogan）
- **右侧**：章节切换按钮组（圆形按钮，每个章节对应一个，选中时有主题色高亮 + 外发光）
- 章节按钮 hover 时显示章节名称 tooltip

---

### 4.3 Hero 首屏区块

- `min-height: 100dvh`，内容左对齐或居中
- **主标题**：大字号，GSAP 入场动画（y:60→0，约 1.8s，power3.out，delay 0.3s）
- **副标题/slogan**：GSAP 入场（y:30→0，约 1.4s，delay 0.8s）
- **底部滚动提示**：竖排"SCROLL"文字 + 竖线 GSAP 无限 yoyo 动画

---

### 4.4 About 区块（主角/创作者介绍）

- 两栏布局：窄屏单列，宽屏双列（`lg:grid-cols-2`）
- **左栏**：照片/图片展示组件（建议拍立得风格：白色背景、宽底边框、轻微旋转）
  - GSAP 视差：随滚动 y:-80, 轻微旋转（scrub:1）
  - 入场：x:-60, opacity:0 → x:0, opacity:1
- **右栏**：玻璃面板
  - 标题 + 正文介绍
  - 底部附加信息（如工具、标签、日期等）
  - GSAP 视差：y:-40（scrub:1.5）；入场 x:60, opacity:0 → x:0, opacity:1
- 此区块可通过配置整体隐藏（`show: false`）

---

### 4.5 角色/伙伴卡片区块（Companions）

- 标题 + 卡片墙
- 每张卡片支持**翻转效果**（正面：角色图片+名字，背面：详细介绍）
- 支持**播放角色语音**（点击按钮播放对应音频）
- 卡片入场：stagger 0.15s，y:80→0, scale:0.9→1
- 卡片数据全部来自配置文件

---

### 4.6 章节主体区块（Seasons / Chapters）

- 每个章节占 `min-height: 100dvh`
- **ScrollTrigger 触发**：进入视口时自动切换全局章节（背景视频 + 粒子 + 主题色联动）
- 每个章节区块包含：
  - 超大背景水印文字（章节标识符），极低 opacity（约 6%），仅作装饰
  - 玻璃面板（左边框使用章节主题色）
  - 章节标题 + 副标题
  - 故事/描述正文
- 面板入场：y:60→0, opacity:0→1

---

### 4.7 底部时间/状态滑块（TimeSlider）

- **固定在页面底部**（fixed bottom），z-index 高
- 水平滑块，拖动时实时更新：
  - 全局背景视频的 CSS filter（brightness / hue-rotate / saturate / sepia）
  - 滑块轨道两端显示状态标签（如：晨 / 昼 / 暮 / 夜，或自定义标签）
- 状态标签和 filter 映射关系在配置文件中定义

---

### 4.8 Footer

- 背景：`rgba(0,0,0,0.4)` + `backdrop-filter: blur(20px)`
- 网站标题 + 引言/slogan
- 社交/外部链接
- 版权信息

---

## 五、配置文件驱动（核心设计原则）

**所有内容都集中在一个配置文件 `src/content/config.ts` 中**，包括：

```ts
// 网站基本信息
siteConfig: {
  title: string
  subtitle: string
  slogan: string
  heroVideo: string       // 首屏视频路径
  footerText: string
}

// 主角/创作者介绍（可整体隐藏）
aboutConfig: {
  show: boolean
  image: string
  name: string
  bio: string
  tags: string[]
}

// 章节列表（数量不限）
chapters: Array<{
  id: string
  label: string           // 导航按钮显示的短标识
  title: string
  subtitle: string
  color: string           // 主题色 hex
  video: string           // 背景视频路径
  audio?: string          // 背景音乐路径（可选）
  story: string           // 故事正文
  particles: ParticleConfig  // 粒子类型和参数
}>

// 角色/伙伴（可选区块）
companions: Array<{
  name: string
  image: string
  voice?: string          // 语音音频路径（可选）
  description: string
  tags: string[]
}>

// 底部滑块状态映射
sliderStates: Array<{
  label: string
  position: number        // 0~1
  filter: CSSFilterConfig
}>
```

修改内容只需编辑此文件，无需改动任何组件代码。

---

## 六、静态资源目录结构

```
public/
├── videos/          # 背景视频（.mp4，建议每段 3~8MB，横屏，10秒以上循环）
├── audio/           # 背景音乐、角色语音（.mp3）
└── images/          # 角色图片、主角照片（.jpg/.png）
```

---

## 七、关键动效参数参考

| 效果 | 建议参数 |
|------|---------|
| Lenis 平滑滚动 | duration: 1.2 |
| Hero 标题入场 | y:60→0, 1.8s, power3.out, delay 0.3s |
| Hero 副标题入场 | y:30→0, 1.4s, power2.out, delay 0.8s |
| About 图片视差 | y:-80, scrub:1 |
| About 面板视差 | y:-40, scrub:1.5 |
| 章节水印入场 | y:100→0, opacity:0→0.06, 1.2s |
| 卡片入场 | y:80→0, scale:0.9→1, stagger 0.15s |
| 视频章节切换 | opacity 过渡 500ms |
| 滚动提示竖线 | scaleY yoyo infinite, 1.5s |

---

## 八、响应式要求

- 标题字号全部使用 `clamp()` 三值适配
- About 区块：`grid-cols-1 lg:grid-cols-2`
- 卡片墙：`flex-wrap`，窄屏自动换行
- 导航元素按 `sm/md` 断点隐藏非关键内容
- 底部滑块宽度：`min(600px, 80vw)`

---

## 九、交付要求

1. 项目可通过 `npm install && npm run dev` 直接运行
2. 提供 `src/content/config.ts` 配置文件，包含示例内容和详细注释
3. 提供双端启动脚本：`启动-Mac.command`（双击直接运行）和 `启动-Windows.bat`
4. 静态资源使用占位文件（空 mp4/mp3/jpg），不影响框架运行
