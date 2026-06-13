# 对话记录 · 我的一生定制

记录与用户关于本定制的需求讨论、修订与技术要点。持续更新。

---

## 2026-06-10 · 会话一：项目认知与故事撰写

### 用户目标

将 Dreamways 框架定制为个人人生回忆录网站，每首歌代表一段真实经历。

### 技术调研结论

- 项目为 React 19 + Vite + Tailwind + GSAP + Lenis 单页沉浸式网站
- 内容驱动：`src/content/config.ts` + `public/{videos,audio,images}/`
- 页面：Hero、About、Companions（角色卡）、Seasons（章节故事）、TimeSlider、VideoBackground
- 硬编码标题：`Seasons`「四季之梦」、`Companions`「卢卡的伙伴们」、`TimeSlider`「浅眠/入梦/深梦」

### 初版 16 章歌曲清单

大地飞歌、奔跑、月桂女神、大小姐、花容瘦、月亮惹的祸、素颜、忘记时间、一千零一个愿望、只对你有感觉、想象之中、时间煮雨、匆匆那年、起风了、浪子回头、惊鸿醉

### 输出

- 创建 `docs/我的一生-故事文案.md`（初版 16 章）

---

## 2026-06-10 · 会话二：故事修订与增章

### 第 1 章 · 大地飞歌（多次修订）

1. 用户补充：表演者是青梅，用户是观众
2. 节目是舞蹈；青梅与用户同班
3. 舞蹈由青梅编排，她是领舞

### 第 2 章 · 奔跑

- 用户补充：排练时在教室把课桌并在一起做仰卧起坐

### 新增 · 之子于归（第 13 章）

- 大四刚开始，与同学考研，图书馆没日没夜
- 早起晚归，回归高中节奏
- 手机丢失，用 200 元话费手机听《之子于归》
- 「匆匆那年」移至本章之后，时期改为研究生

### 第 15 章 · 匆匆那年（原第 13 章后移）

- 时期：研究生（非本科笼统「大学」）
- 与女友从复读相识至研究生
- 感情：分手、复合、再分手、再复合
- 分手阶段女友喜欢九夜茴小说《匆匆那年》

### 新增 · 飘摇

- 大一下半年，第一次交谊舞比赛
- 《飘摇》旋律中于中心广场与舞伴起舞
- 后调整大学顺序为：只对你有感觉（第一章）→ 想象之中（第二章）→ 飘摇（第三章）

### 当前章节总数

**18 章**

---

## 2026-06-10 · 会话三：下一步所需素材

### 已完成

- 18 章故事正文（`我的一生-故事文案.md`）

### 待补充（用户侧）

1. siteConfig：站点标题、副标题、页脚等
2. protagonist：关于我、照片、是否展示
3. 18 章 character 角色卡文案
4. 媒体：19 视频、18 音频、19+ 图片

### 待开发

- 写入 `config.ts`
- 修改硬编码区块标题
- 预览联调

---

## 2026-06-10 · 会话四：建立 docs 文档体系

### 用户要求

按 workflows rules 在 `docs/` 创建相应项目管理文档，之后再进行下一步。

### 本次创建文件

- `plan.md` — 需求、计划、变更记录、待办
- `readme.md` — 开发说明
- `standard.md` — 内容与代码规范
- `talk.md` — 本文件
- `summary.md` — 阶段总结（进行中）
- `review.md` — 代码审查记录
- `document.md` — 文档索引

### 代码变更

- 本阶段仅新增 docs 文档，**未修改** `src/content/config.ts` 及组件代码

---

## 技术备忘

- `chapters.length` 自动驱动 Companions 卡片布局（`buildLayout`）
- ScrollTrigger 在 Seasons 滚动时切换 `videoSrc` 与 `currentChapter`
- 无 `audio` 时填空字符串，播放按钮自动禁用
- Vite `server.port` 为 3000；根 README 写 4000 为启动脚本行为，以实际为准

---

## 2026-06-12 · 会话五：config 写入与 GitHub

### 完成

- 18 章故事、角色卡、音频路径写入 `src/content/config.ts`
- 18 首 BGM、18 张 ch01–ch18.png、角色参考图入库
- 站点信息：我的一生 → **A Life in Songs**
- 区块标题：一路歌行 / 故事里的人们 / 浅唱·留声·沉醉
- 提交 `e3b2271`，推送目标 `wangyunxiangsha/A-Life-in-Songs`

### 音频互斥（首轮）

- 新增 `src/lib/audioManager.ts`
- AudioPlayer、Companions VoiceButton 接入 playExclusive

---

## 2026-06-12 · 会话六：性能与 UI 调整

### Chrome 卡死排查

- 曾加入全站氛围音乐自动加载、滚动自动试听 30 秒、大量 ScrollTrigger 延后逻辑
- 用户反馈卡死后 **git 回溯** 至轻量版本，仅保留 18 章 config
- 删除/未恢复：AmbientMusic（临时）、loadingConfig、useDeferredMount 等重逻辑

### 背景视频策略

- 用户明确：第 2–18 章 **不要 intro 占位**，要 **纯黑底**
- `chapterVideoIds: ['childhood-61']`，`resolveChapterVideo()` 无视频返回空字符串
- VideoBackground 空 src 时淡出视频、显示黑底

### 角色卡

- 恢复 **每页 6 张、共 3 页** 分页（Chevron + 圆点）

### 章节故事区图片

- 用户不要全宽大图；恢复历史 **小图肖像**（72–96px）+ 角色名/身份/简介
- 增加章节间垂直间距，避免上下章贴连

---

## 2026-06-12 · 会话七：音频与氛围音乐恢复

### 恢复内容

- `audioManager.ts` — 章节歌 / 角色语音 / 氛围 BGM 全局互斥
- `AmbientMusicContext.tsx` + `AmbientMusicToggle.tsx` — The Deep South
- 导航栏音乐开关；播章节歌时氛围暂停，结束后恢复
- AudioPlayer `encodeURI` 修复中文路径

### 提交

- `da04c17` Restore exclusive audio playback, ambient music, and chapter portrait UI
- 用户本机 `git push` 成功

---

## 2026-06-12 · 会话八：文档同步

- 更新 plan / readme / summary / document / review / talk
- 反映当前：可预览、已推 GitHub、待补背景视频与 About

