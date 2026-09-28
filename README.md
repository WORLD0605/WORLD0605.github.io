# WORLD. 个人网站

一个用于展示项目、记录想法、收藏网站，以及介绍自己的静态个人网站。无需安装依赖或运行构建命令。

## 更新内容

直接编辑 [`content.js`](./content.js)：

- `name`、`brand`、`role`、`hero`、`about`：个人介绍
- `email`、`github`：联系方式
- `projects`：项目列表；填写 `url` 后会显示“查看项目”链接
- `ideas`：想法列表
- `bookmarks`：网站收藏

目前 CEPB ControlCenter 已作为真实项目展示；想法条目仍标有“示例”，建议之后换成自己的记录。修改文件并推送到 `main` 后，GitHub Pages 会自动更新。

## 本地预览

在本目录运行：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。如果没有 Python，也可以使用其他静态文件服务器。

## 发布到 GitHub Pages

仓库名为 `WORLD0605.github.io` 时，页面地址是 `https://world0605.github.io/`。在仓库 **Settings → Pages** 中，将 **Build and deployment → Source** 设为 **Deploy from a branch**，并选择 `main` 分支和 `/ (root)` 目录。根目录中的 `.nojekyll` 文件让页面按静态文件直接发布。
