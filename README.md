# 转写档案 · Transcripts

用于整理个人转写内容的静态网站仓库。每篇内容放在 `transcripts/<slug>/`，文章使用独立的 `index.html`，配图放在该文章目录内的 `slides/`。仓库根目录的 `index.html` 是网站目录页。

## 本地预览

直接打开 `index.html`，或在仓库根目录运行：

```sh
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。

## 发布

GitHub Actions 会在推送到 `main` 后自动发布到 GitHub Pages。首次发布时，在仓库 **Settings → Pages** 将 **Build and deployment** 的来源设为 **GitHub Actions**。
