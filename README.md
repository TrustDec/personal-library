# Personal Library

值得反复读的演讲、想法与笔记。英文一行，中文一行，关键画面穿插在对应位置。

站点：[trustdec.github.io/personal-library](https://trustdec.github.io/personal-library/)

推送到 `main` 后，GitHub Actions 会构建 React 应用并发布到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

## 结构

```
src/
  main.tsx              入口：createRoot + RouterProvider
  router.tsx            React Router 数据路由
  routes/               页面，loader 与页面放在一起
  components/           跨页面复用的 UI
  articles/             馆藏数据、校验、资源路径
  styles.css            talks 纸色排版
public/articles/        幻灯片
```

新增一篇：在 `src/articles/` 加 JSON，写入 `catalog.ts` 的列表，图片放到 `public/articles/<slug>/slides/`。阅读页只放讲稿和图；不要 `note` 字段，页脚只保留来源。

## 接手说明

当前 `main` 与 `origin/main` 对齐，最新提交是 `1aafd7c`（优化翻译），上一笔是 `14e6cce`（紧凑版式和暗黑模式）。推到 `main` 会走 GitHub Pages。改 `.github/workflows/` 时，本机 `gh` 的 HTTPS token 没有 `workflow` scope，要用 TrustDec 的 SSH key 推。

版式按用户定过的来，不要再改回去：

- 首页不要大标题、产品示意窗、并排大卡片，也不要解释「英文一行、中文一行」。顶栏是站名、首页、馆藏；右侧是暗黑开关和 GitHub（`https://github.com/TrustDec`）。文章是窄列表：小图加标题。
- 文章页保留双语正文。顶栏之下，左侧馆藏、右侧目录。
- 英文大标题不要用很负的字距。
- 继续用现在的 Vite SPA，不要迁到 GitBook 或 Next.js。

暗黑模式：`index.html` 里的脚本在首屏前读 `localStorage.theme`，没有记录就跟系统。顶栏按钮写入 `light` 或 `dark`，样式在 `src/styles.css` 的 `[data-theme]`。

中文按下面的翻译规范写。`1aafd7c` 已经改过一轮，例如「数据股权」改成了「数据资产」，「主约束」改成了「核心瓶颈」。新译文仍要逐段对照英文，不要再做字面硬贴。

## 转写与第二语言（中文）翻译规范

将英文演讲或视频转写为中英双语 JSON 时，中文（`zh`）部分以**「像母语者在做同场分享」**为目标，避免字面机翻和电报体：

1. **以意译为主，拒绝字面硬译**
   - 商业、技术或口语中的隐喻与习惯表达，按真实含义转成中文读者一眼就懂的说法（例如 `Data Equity` 译为「数据资产」而非「数据股权」，`primary constraint` 译为「核心瓶颈」而非「主约束」，`escape hatches` 译为「偷懒的后门」而非「逃生舱」）。
   - 遇到英文押韵或双关（如 `leaders, or the lids`），把隐含意思自然补全（如「既是领路人，也是天花板」），不要生硬直译字面。
2. **保留完整的中文语序和逻辑连接，杜绝「电报体」**
   - 重排英文口语里的破折号插叙与倒装，补齐中文必需的主语、宾语和因果/转折/递进连接词。
   - 不要为了追求短句把句子砍得支离破碎；译完后默读一遍，确保脱离英文原文也能一口气读懂。
3. **术语前后统一，克制中英混杂**
   - 同一篇内同一概念只用一种叫法（如统一用 `PR`，不要在 PR / pull request / merge request 之间来回切换；统一用「垃圾代码」，不要忽中忽英）。
   - 仅保留高频通用英文词（如 `AI`、`Agent`、`PR`、`API`、`CI`、`lint`、`token`、`SaaS`）；其余业务/口语词一律译成中文（如 `intake form` → 初筛表、`onboarding` → 客户接入、`workaround` → 临时补丁、`meta` → 核心玩法）。
   - 专业或小众术语首次出现时用「中文（英文）」标注（如「模糊测试（fuzzing）」「基于性质的测试（property-based testing）」），后文统一使用中文。
4. **补齐脱离画面后的指代上下文**
   - 演讲者指着白板或 PPT 说的模糊指代（如 `stuck here`、`this`），在不改变原意的前提下点明所指对象（如「还停留在写提示词的阶段」），保证脱离视频画面依然语义自洽。
5. **忠实分段、严守原意**
   - 每个 `pair`、`heading`、`slide` 块保持与 `en` 一一对应，不增删观点、不篡改数据、不脑补原文没有的结论。
