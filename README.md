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

新增一篇：在 `src/articles/` 加 JSON，写入 `catalog.ts` 的列表，图片放到 `public/articles/<slug>/slides/`。
