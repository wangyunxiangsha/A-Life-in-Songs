# 开发文档 · A Life in Songs

## 项目说明

本项目在 [Dreamways](../README.md) 框架基础上，定制为个人人生回忆录沉浸式单页网站 **A Life in Songs**。内容以 **18 首歌对应 18 段人生经历** 为主线，通过滚动叙事、背景视频、氛围音乐、章节 BGM 与角色卡片呈现。

**仓库**：[github.com/wangyunxiangsha/A-Life-in-Songs](https://github.com/wangyunxiangsha/A-Life-in-Songs)

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS 3 |
| 动画 | GSAP + ScrollTrigger |
| 滚动 | Lenis 平滑滚动 |
| UI | shadcn/ui + Radix UI |

## 目录结构（定制相关）

```
Dreamways/
├── public/
│   ├── videos/          # 首屏.mp4、ch01.mp4、ch07.mp4（其余章节暂无，黑底）
│   ├── audio/           # 18 章 BGM + 氛围音乐 The Deep South
│   └── images/          # ch01–ch18.png、thumbs/、ref/
├── src/
│   ├── content/
│   │   └── config.ts    # ★ 核心配置（18 章 + 站点信息）
│   ├── lib/
│   │   └── audioManager.ts   # 全局音频互斥
│   ├── context/
│   │   ├── AppContext.tsx
│   │   └── AmbientMusicContext.tsx  # 氛围 BGM
│   ├── components/
│   │   └── AmbientMusicToggle.tsx   # 导航栏音乐开关
│   └── sections/        # Hero、Seasons、Companions 等
└── docs/                # 项目管理文档
```

## 页面模块（当前实现）

| 模块 | 文件 | 说明 |
|------|------|------|
| 首屏 Hero | `Hero.tsx` | 读 `siteConfig` |
| 关于我 About | `About.tsx` | `protagonist.show: false` 时隐藏 |
| 角色卡片 Companions | `Companions.tsx` | 每页 6 张、共 3 页；翻转卡 + 角色图 |
| 章节故事 Seasons | `Seasons.tsx` | 标题 + **小图肖像** + 正文 + 聆听故事 |
| 时间滑块 TimeSlider | `TimeSlider.tsx` | 浅唱 / 留声 / 沉醉 画面滤镜 |
| 背景视频 | `VideoBackground.tsx` | 有视频则播放，无则黑底 |
| 导航 | `Navbar.tsx` | 标题 + **氛围音乐开关** |
| 页脚 | `Footer.tsx` | 引用语、版权 |

## 音频系统

### 全局互斥（`audioManager.ts`）

同一时间只播放一条音频。播放新歌时自动停止上一首。

| 来源 | key 前缀 | 触发方式 |
|------|----------|----------|
| 章节 BGM | `chapter:` | 点击「聆听故事」 |
| 角色语音 | `voice:` | 角色卡语音按钮（有 `audio` 时） |
| 氛围音乐 | `ambient` | 导航栏开关，默认开启 |

### 氛围背景音乐

- 配置：`siteConfig.ambientMusic`
- 当前曲目：`/audio/Adam Young - The Deep South.mp3`
- 播放章节歌时自动暂停；章节结束或暂停后恢复
- 偏好保存在 `localStorage`（`ambient-music-enabled`）

### 路径编码

中文/空格文件名在播放器中使用 `encodeURI`，避免加载失败。

## 背景视频策略

```ts
// config.ts
chapterVideoIds: ['childhood-61', 'senior2-plain']  // 第 1、7 章有专属视频
resolveChapterVideo(id, video)      // 无视频 → 空字符串 → 黑底
```

其余章节不加载首屏视频占位，滚动时为纯黑背景。

## 配置字段说明

### siteConfig

| 字段 | 当前值 |
|------|--------|
| title | A Life in Songs |
| titleSub | 一首歌一种心情 |
| seasonsSectionTitle | 一路歌行 |
| companionsSectionTitle | 故事里的人们 |
| ambientMusic | src / volume / labelOn / labelOff |
| chapterVideoIds | 有专属视频的章节 id 列表 |

### chapters[]（18 项）

每章：`id`、`title`、`story`、`audio`、`color`、`glassBg`、`character`（含 `image` 等）。  
第 1、7 章另有 `video` 字段，并通过 `chapterVideoIds` 启用背景视频。

## 资源现状

| 资源 | 状态 |
|------|------|
| 18 章 BGM | ✅ `public/audio/` |
| 18 章插画 | ✅ `ch01.png` … `ch18.png` |
| 氛围 BGM | ✅ The Deep South |
| 首屏.mp4 | ✅ |
| ch01.mp4 | ✅ |
| ch07.mp4 | ✅ |
| ch02–ch06、ch08–ch18.mp4 | ❌ 未提供（黑底） |
| 角色语音 | ❌ 未配置 |
| About 照片 | ❌ 区块未开 |

## 本地开发

```bash
npm install
npm run dev
```

Windows 可双击 `启动-Windows.bat`（窗口标题：A Life in Songs · 启动中...）。

构建：

```bash
npm run build
```

## 定制工作流

1. 改故事/角色 → `docs/我的一生-故事文案.md`、`角色卡片.md`
2. 同步 → `src/content/config.ts`
3. 媒体 → `public/` 对应目录
4. 新章节视频就绪 → 更新 `chapterVideoIds` 与 `video` 字段
5. 更新 `plan.md`、`document.md`、`talk.md`

## 相关文档

- 故事正文：`我的一生-故事文案.md`
- 角色卡：`角色卡片.md`
- 需求计划：`plan.md`
- 规范：`standard.md`
- 阶段总结：`summary.md`
- 文档索引：`document.md`
