# 🔧 DevTools Hub

一个纯前端的开发者工具集合，采用 Ant Design 5 设计风格，部署在 Cloudflare Pages 上。

## 在线访问

👉  http://toolx.dpdns.org

## 功能

### 🆔 UUID 生成器

- 生成 UUID v4（符合 RFC 4122 标准）
- 支持批量生成（1/5/10/20 个）
- 可选大写格式
- 一键复制

### 🔀 JS 混淆器

- 基于 `javascript-obfuscator` 库
- 支持变量名混淆、字符串加密、控制流扁平化
- 显示混淆前后大小对比
- 通过 CDN 按需加载，不影响首屏速度

### 📋 JSON 格式化

- 格式化（2 空格缩进）和压缩（无空格）
- JSON 合法性校验
- 显示数据类型、键数量和大小变化
- 友好的错误提示

### 🔐 密码生成器

- 长度可调（8-64 位）
- 可选字符类型：大写、小写、数字、特殊字符
- 基于 `crypto.getRandomValues()` 的密码学安全随机
- 密码强度指示器（弱/中/强）

## 技术栈

- **框架**: 纯 HTML5 + CSS3 + Vanilla JavaScript
- **样式**: Ant Design 5 Design Token 系统
- **UUID**: 浏览器原生 `crypto.randomUUID()`
- **混淆**: [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) (CDN via esm.sh)
- **密码**: `crypto.getRandomValues()`（密码学安全）

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/H2orange/js-tools.git
cd js-tools

# 启动本地服务器
python -m http.server 8080

# 访问 http://localhost:8080
```

> 注意：由于使用了 ES Module (`type="module"`)，需要通过 HTTP 服务器打开，不能直接使用 `file://` 协议。

## 部署

### Cloudflare Pages

1. 打开 [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. 点击 **Create a project** → **Direct Upload**
3. 上传 `js-tools` 目录下的所有文件
4. 完成！

### 连接 GitHub

1. 在 Cloudflare Pages 中选择 **Connect to Git**
2. 选择此仓库
3. 每次 push 到 `main` 分支自动触发部署

## 项目结构

```
js-tools/
├── index.html          # 主页面（HTML 骨架 + Tab 切换逻辑）
├── README.md           # 项目文档
├── css/
│   └── style.css       # Ant Design 5 风格样式
└── js/
    ├── uuid-tool.js    # UUID 生成器
    ├── obfuscate-tool.js  # JS 混淆器
    ├── json-tool.js    # JSON 格式化工具
    └── password-tool.js   # 密码生成器
```

## License

MIT
