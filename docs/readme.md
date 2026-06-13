# 开发文档 · 我的一生（Dreamways 定制）

## 项目说明

本项目在 [Dreamways](../README.md) 框架基础上，定制为个人人生回忆录沉浸式单页网站。内容以 **18 首歌对应 18 段人生经历** 为主线，通过滚动叙事、背景视频切换、章节 BGM 与角色卡片呈现。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS 3 |
| 动画 | GSAP + ScrollTrigger |
| 滚动 | Lenis 平滑滚动 |
| UI | shadcn/ui + Radix UI |

## 目录结构（与本定制相关）

```
Dreamways/
├── public/
│   ├── videos/          # 背景视频（intro + 每章）
│   ├── audio/           # BGM + 可选角色语音
│   └── images/          # 个人照 + 每章角色图
├── src/
│   ├── content/
│   │   └── config.ts    # ★ 核心配置（待写入定制内容）
│   ├── sections/        # 页面区块（部分标题待改）
│   ├── context/         # 章节、视频、滑块全局状态
│   └── hooks/           # Lenis 等
└── docs/                # 本项目文档
    ├── plan.md          # 需求与计划
    ├── readme.md        # 本文件
    ├── standard.md      # 规范
    ├── 我的一生-故事文案.md
    ├── talk.md
    ├── summary.md
    ├── review.md
    └── document.md
```

## 页面模块

| 模块 | 文件 | 定制说明 |
|------|------|----------|
| 首屏 Hero | `sections/Hero.tsx` | 读 `siteConfig` |
| 关于我 About | `sections/About.tsx` | 读 `protagonist`，可 `show: false` 隐藏 |
| 角色卡片 Companions | `sections/Companions.tsx` | 读 `chapters[].character`；标题读 `siteConfig.companionsSectionTitle` |
| 章节故事 Seasons | `sections/Seasons.tsx` | 读 `chapters`；标题读 `siteConfig.seasonsSectionTitle` |
| 时间滑块 TimeSlider | `sections/TimeSlider.tsx` | 画面色调滤镜；刻度读 `siteConfig.timeSliderTicks` |
| 背景视频 | `sections/VideoBackground.tsx` | 随滚动切换 `chapters[].video` |
| 导航 / 页脚 | `Navbar.tsx` / `Footer.tsx` | 读 `siteConfig` |

## 配置字段说明

### siteConfig

网站标题、副标题、首屏文案、页脚、首屏视频路径。

### protagonist

关于我区块：照片、介绍、可选语音；`show` 控制显隐。

### chapters[]（18 项）

每章包含：

| 字段 | 用途 |
|------|------|
| `id` | 唯一标识，英文+连字符 |
| `video` | 章节背景视频 |
| `title` | 章节标题 |
| `story` | 故事正文（见故事文案文档） |
| `audio` | 章节 BGM |
| `color` / `glassBg` | 主题色与玻璃面板色 |
| `character` | 角色卡片：name, role, emoji, image, visualGradient, desc, detail, intro, audio |

## 资源命名建议

为便于维护，建议统一编号：

```
public/videos/intro.mp4
public/videos/ch01.mp4 … ch18.mp4
public/audio/ch01.mp3 … ch18.mp3
public/images/me.jpg
public/images/ch01.jpg … ch18.jpg
```

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 Vite 配置端口（默认 `http://localhost:3000`）。

Windows 也可双击 `启动-Windows.bat`。

## 定制工作流

1. 在 `docs/我的一生-故事文案.md` 确认故事终稿
2. 补充角色卡片、siteConfig、protagonist（见 `plan.md` 待办）
3. 资源放入 `public/` 对应目录
4. 写入 `src/content/config.ts`
5. 按需修改 `sections/` 硬编码标题
6. 预览联调 → 更新 `summary.md` / `talk.md`

## 相关文档

- 故事正文：`我的一生-故事文案.md`
- 需求计划：`plan.md`
- 编写规范：`standard.md`
- 文档索引：`document.md`
