# create-scaffold

一个构建脚手架的脚手架

## 开始使用

依赖 `git`

### 新建一个项目

`$projectName`指项目目录，如果已经在项目根目录，可以留空

```bash
npm init @hillgor/scaffold $projectName
cd $projectName
npm i
```

### 本地调试

```bash
node cli.js demo
```

### 常见问题

**husky - .git can't be found**

项目依赖 `git`, 需要执行以下初始化

```bash
git init
```

**发布时某些文件没有包含**

检查 `package.json` 内的 `files` 属性，看是否包含需要的文件

特别注意，如果模板 `templates` 内有 `package.json` 也会被处理，为了忽略这个问题，可以通过加些模板变量解决 `npm pack` 的打包问题

```json
"files<%= %>": [
    "lib",
    "cli.js",
    "index.js"
],
```

### 发布到 npm

```bash
npm publish
```