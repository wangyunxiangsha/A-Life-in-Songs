# 需求与项目计划 · A Life in Songs

## 项目概述

基于 Dreamways 沉浸式网站框架，定制为个人人生回忆录网站 **A Life in Songs（一首歌一种心情）**：**十八首歌，十八段人生经历**。访客通过滚动浏览章节，配合背景视频、氛围音乐、章节 BGM 与角色卡片，沉浸式回顾从童年到当下的成长轨迹。

**GitHub 仓库**：[wangyunxiangsha/A-Life-in-Songs](https://github.com/wangyunxiangsha/A-Life-in-Songs)

**Zeabur 预览站**：[https://a-life-in-songs.preview.aliyun-zeabur.cn/](https://a-life-in-songs.preview.aliyun-zeabur.cn/)

## 需求对齐（已确认）

| 项 | 结论 |
|----|------|
| 内容主题 | 个人一生，每章一首歌 + 一段真实经历 |
| 章节数量 | 18 章 |
| 故事文案 | ✅ 已完成，见 `我的一生-故事文案.md` |
| 技术方案 | 沿用框架，主要改 `config.ts` + `public/` 资源 |
| 站点名称 | **A Life in Songs** / 副标题「一首歌一种心情」 |
| 区块标题 | ✅ 一路歌行 / 故事里的人们 / 浅唱·留声·沉醉 |
| About 区块 | 暂缓（`protagonist.show: false`） |
| 背景视频策略 | 第 1、7 章有专属视频；其余章节黑底，不用首屏视频占位 |
| 音频策略 | 氛围 BGM + 章节点击播放，全局互斥 |

## 章节清单（当前版本）

| 章 | id | 歌曲 | 时期 |
|----|-----|------|------|
| 1 | childhood-61 | 大地飞歌 | 小学六一，青梅编舞领舞 |
| 2 | primary-run | 奔跑 | 小学，陪练舞蹈 |
| 3 | junior-moon | 月桂女神 | 初中，通宵游戏 |
| 4 | junior-lady | 大小姐 | 初中，心动 |
| 5 | junior-summer | 花容瘦 | 初中毕业，大话西游3 |
| 6 | senior1-moon | 月亮惹的祸 | 高一，KTV |
| 7 | senior2-plain | 素颜 | 高二高三，骑车补课 |
| 8 | gaokao-fail | 忘记时间 | 高考失利 |
| 9 | summer-wish | 一千零一个愿望 | 复读结束夏天 |
| 10 | college-duet | 只对你有感觉 | 大学第一章 |
| 11 | college-imagine | 想象之中 | 大学第二章 |
| 12 | college-dance | 飘摇 | 大学第三章，交谊舞 |
| 13 | college-rain | 时间煮雨 | 大学，看电影 |
| 14 | college-kaoyan | 之子于归 | 大四考研 |
| 15 | grad-hurry | 匆匆那年 | 研究生感情 |
| 16 | grad-job | 起风了 | 研究生求职 |
| 17 | work-return | 浪子回头 | 初入职场 |
| 18 | transplant | 惊鸿醉 | 移植仓 |

## 实施计划

### 阶段一：内容与文档 ✅ 已完成

- [x] 梳理项目技术栈与定制方式
- [x] 撰写 18 章故事文案
- [x] 多轮需求修订
- [x] 建立 docs 项目管理文档体系
- [x] 撰写 18 章角色卡片文案
- [x] 确定网站标题、页脚引用语等 siteConfig
- [x] AI 素材提示词（插画绘本 + 可灵指南）
- [x] 真人参考照整理

### 阶段二：资源准备 ✅ 大部分完成

- [x] 18 首章节歌曲 mp3 → `public/audio/`
- [x] 18 张章节插画 png → `public/images/ch01–ch18.png`
- [x] 18 张角色卡正式图 → `public/images/ch01–ch18.png`；真人参考照 → `public/images/ref/`
- [x] 氛围 BGM → `Adam Young - The Deep South.mp3`
- [x] 首屏视频 `首屏.mp4`
- [x] 第 1 章背景视频 `ch01.mp4`
- [x] 第 7 章背景视频 `ch07.mp4`
- [ ] 第 2–6、8–18 章专属背景视频（当前黑底，可选后续补充）
- [ ] About 个人照片 `me.png`（区块未开启）
- [ ] 角色语音（`character.audio` 均为空）

### 阶段三：配置与代码 ✅ 已完成

- [x] 故事与配置写入 `src/content/config.ts`
- [x] 区块标题迁入 `siteConfig`（Seasons / Companions / TimeSlider）
- [x] 18 章主题色 `color` / `glassBg`
- [x] 角色卡分页（每页 6 张，共 3 页）
- [x] 章节故事区小图肖像（标题下角色缩略图 + 简介）
- [x] 章节间距优化
- [x] 全局音频互斥 `audioManager.ts`
- [x] 氛围背景音乐 + 导航栏开关
- [x] 背景视频策略：`resolveChapterVideo()`，无视频章节黑底
- [x] 移除全站氛围音乐自动加载导致的性能降级逻辑（回溯后保持轻量）
- [x] 本地构建通过 `npm run build`

### 阶段四：验收与发布 ⏳ 进行中

- [x] 全站浏览与音频互斥联调
- [x] 代码推送 GitHub（2026-06-12，用户确认成功）
- [x] Zeabur 预览部署：[a-life-in-songs.preview.aliyun-zeabur.cn](https://a-life-in-songs.preview.aliyun-zeabur.cn/)
- [ ] 全 18 章背景视频补全（可选）
- [ ] About 区块开启（待用户提供素材）
- [ ] 角色语音录制（可选）

## 需求变更记录

| 日期 | 变更内容 |
|------|----------|
| 2026-06-10 | 项目启动：从默认「梦途」定制为「我的一生」 |
| 2026-06-10 | 完成初版 16 章故事文案，后扩至 18 章 |
| 2026-06-10 | 多轮章节修订（青梅、奔跑、之子于归、飘摇顺序等） |
| 2026-06-10 | 建立 docs 文档体系；角色卡人物分配确认 |
| 2026-06-10 | AI 插画绘本画风 + 可灵制作指南 |
| 2026-06-12 | 真人参考照整理至 `images/ref/` |
| 2026-06-12 | 项目重命名 **A Life in Songs**；写入 18 章 config + 媒体 |
| 2026-06-12 | 性能回溯：移除氛围音乐自动加载等导致 Chrome 卡死的逻辑 |
| 2026-06-12 | 第 2–18 章背景改为纯黑底（不加载 intro 占位） |
| 2026-06-12 | 角色卡恢复分页；章节故事区恢复小图肖像 |
| 2026-06-12 | 恢复音频互斥 + 氛围 BGM（`audioManager` + `AmbientMusicContext`） |
| 2026-06-12 | 推送至 GitHub `wangyunxiangsha/A-Life-in-Songs` |
| 2026-06-15 | 清理重复/未引用旧资源；文档路径同步为 `首屏.mp4`、`ch01/ch07` 与 `chXX.png` |
| 2026-06-18 | Zeabur 预览站已部署：`https://a-life-in-songs.preview.aliyun-zeabur.cn/` |

## 站点基本信息（当前）

| 字段 | 内容 |
|------|------|
| title | A Life in Songs |
| titleSub | 一首歌一种心情 |
| heroSubtitle | 一首歌一种心情 |
| seasonsSectionTitle | 一路歌行 |
| companionsSectionTitle | 故事里的人们 |
| timeSliderTicks | 浅唱 / 留声 / 沉醉 |
| footerQuote | 「每一段路，都有一首歌」 |
| copyright | 2026 @dongfangbo |
| ambientMusic | Adam Young - The Deep South.mp3 |
| protagonist.show | **false**（关于我暂缓） |

## 待用户补充（非阻塞）

1. **About 区块**：照片 + 自我介绍 + 可选语音
2. **第 2–6、8–18 章背景视频**：当前黑底可接受，补全后更新 `chapterVideoIds`
3. **角色语音**：18 段短音频（可选）

## 改进计划

- [ ] 将 `chapterVideoIds` 扩展为全部 18 章就绪后批量开启
- [ ] 考虑章节进度指示或快速跳转（18 章滚动较长）
- [ ] 对外分享 Zeabur 预览站前评估 BGM 版权（章节歌 + 氛围曲）
- [ ] About 开启后补充 `protagonist` 配置与 polaroid 展示
- [ ] 根目录 `README.md` 可增加「A Life in Songs 定制版」说明链接至 `docs/readme.md`

## 2026-06-16 近期变更补充

- 已补入 `ch03.mp4`、`ch12.mp4`，并将第 7 章视频路径统一为 `public/videos/ch07.mp4`。
- 已采用移动端媒体加载方案 B：桌面端与移动端分别维护视频白名单，移动端只加载关键章节视频。
- 背景视频组件改为轻量 poster 先显示，视频仅预取 metadata，并在加载完成后淡入。
- 手机端角色卡翻面改为平面切换，避免内置浏览器对 3D transform 支持不稳定导致文字不可见。
- 角色语音音频改为点击后再挂载，避免页面初始阶段加载过多音频资源。
- 轻量背景 poster 统一使用 `public/images/thumbs/chXX.webp`，用于页面背景兜底；原始 `chXX.png` 保持作为高清插图资源。
