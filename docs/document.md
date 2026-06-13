# 文档索引与更新记录

本项目定制相关文档均位于 `docs/` 目录。

## 文档清单

| 文档 | 用途 | 状态 |
|------|------|------|
| [plan.md](./plan.md) | 需求、计划、变更记录、待办 | ✅ 2026-06-12 更新 |
| [readme.md](./readme.md) | 开发说明、模块、音频与视频策略 | ✅ 2026-06-12 更新 |
| [standard.md](./standard.md) | 内容、资源、代码规范 | 稳定 |
| [我的一生-故事文案.md](./我的一生-故事文案.md) | 18 章故事正文 | 已定稿 |
| [角色卡片.md](./角色卡片.md) | 18 章角色卡人物与文案 | 已定稿，已写入 config |
| [AI人物设定-插画绘本.md](./AI人物设定-插画绘本.md) | AI 画风与角色基准 | 参考用 |
| [AI分镜提示词-插画绘本.md](./AI分镜提示词-插画绘本.md) | 18 章分镜提示词 | 参考用 |
| [可灵AI制作指南-插画绘本.md](./可灵AI制作指南-插画绘本.md) | 可灵实操 | 参考用 |
| [真人参考照片对照表.md](./真人参考照片对照表.md) | 参考照说明 | 参考用 |
| [talk.md](./talk.md) | 对话与技术记录 | ✅ 2026-06-12 更新 |
| [summary.md](./summary.md) | 项目阶段总结 | ✅ 2026-06-12 更新 |
| [review.md](./review.md) | 代码审查 | ✅ 2026-06-12 更新 |
| [document.md](./document.md) | 本索引 | 本文件 |

## 根目录其他文档

| 文档 | 说明 |
|------|------|
| [../README.md](../README.md) | Dreamways 原框架说明 |
| [../使用说明.md](../使用说明.md) | 原框架中文使用说明 |

## 更新日志

| 日期 | 更新内容 | 涉及文件 |
|------|----------|----------|
| 2026-06-10 | 初版故事文案与 docs 体系 | 多份 |
| 2026-06-10 | 写入 config.ts；AI 素材指南 | config.ts, AI*.md |
| 2026-06-12 | 真人参考照整理 | ref/, 对照表 |
| 2026-06-12 | 项目重命名 A Life in Songs；18 章媒体入库 | config, public/ |
| 2026-06-12 | 性能回溯、黑底策略、角色卡分页、小图肖像 | Seasons, Companions, VideoBackground |
| 2026-06-12 | 音频互斥 + 氛围 BGM 恢复 | audioManager, AmbientMusic*, AudioPlayer |
| 2026-06-12 | 推送 GitHub；全面更新项目管理文档 | plan, readme, summary, talk, review, document |

## 当前进度一览

```
[✅] 故事文案 18 章
[✅] 角色卡片文案 + config 写入
[✅] siteConfig / 区块标题 / 主题色
[✅] 18 章 BGM + 章节插画
[✅] 氛围 BGM + 音频互斥
[✅] 角色卡分页 + 章节小图肖像
[✅] 第 1 章背景视频 + intro
[✅] GitHub 同步
[⏳] 第 2–18 章背景视频（可选）
[⏳] About 区块
[⏳] 角色语音
[⏳] 公开部署
```

## 代码与文档对应关系

| 功能 | 代码位置 | 文档说明 |
|------|----------|----------|
| 站点与章节内容 | `src/content/config.ts` | readme.md §配置字段 |
| 音频互斥 | `src/lib/audioManager.ts` | readme.md §音频系统 |
| 氛围音乐 | `context/AmbientMusicContext.tsx` | plan.md §站点基本信息 |
| 章节故事 UI | `sections/Seasons.tsx` | talk.md 会话六 |
| 角色卡分页 | `sections/Companions.tsx` | talk.md 会话五 |
| 背景视频 | `sections/VideoBackground.tsx` + `resolveChapterVideo` | readme.md §背景视频策略 |
