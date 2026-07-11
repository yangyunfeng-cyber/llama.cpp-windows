# 🦙 Llama.cpp Windows Desktop

一个 Windows 桌面端控制面板，用于运行和管理本地 [llama.cpp](https://github.com/ggml-ai/llama.cpp) 推理服务。内置聊天界面，支持 OpenAI 兼容 API、多模态附件、MCP 工具协议和自定义助手系统。

> 基于 [Qiao-920/llama-cpp-desktop](https://github.com/Qiao-920/llama-cpp-desktop) 进行了功能增强和体验优化。

---

## 📋 环境要求

### 直接下载使用（便携版）
- **操作系统**：Windows 10 / 11（64 位）
- **llama.cpp**：需自行准备 `llama-server.exe` 和 GGUF 模型文件

### 开发运行
- **Node.js**：18.x 或更高版本（推荐 20 LTS）
- **npm**：9.x 或更高版本
- **Windows**：10 / 11（64 位）

---

## ✨ 功能亮点

| 功能 | 说明 |
|---|---|
| 🏠 **本地直连** | 直接启动 `llama-server.exe`，无需额外启动器或命令行操作 |
| 💬 **桌面聊天** | 流式回复、Markdown 渲染、代码块一键复制/预览、历史对话管理 |
| 🧠 **助手系统** | 创建命名助手，为每个助手配置独立系统提示词，一键切换角色 |
| 🔧 **MCP 工具调用** | 模型可在对话中自动调用外部工具，支持文件操作、数据库查询等 |
| 🔌 **OpenAI 兼容 API** | 默认提供 `http://127.0.0.1:8080/v1`，可接入任何兼容 OpenAI 的客户端 |
| 📎 **附件支持** | 支持上传图片、文本文件、PDF，图片可在聊天中直接预览 |
| 📦 **系统托盘** | 关闭窗口后最小化至托盘，服务后台持续运行 |

---

## 🚀 快速开始

### 方式一：直接使用便携版（推荐）

1. 从 [Releases](https://github.com/yangyunfeng-cyber/llama.cpp-windows/releases) 页面下载 `Llama.cpp-Desktop.exe`
2. 双击运行，首次启动在 **设置 → 进出口** 中指定：
   - `llama-server.exe` 所在路径
   - GGUF 模型文件路径
3. 点击底部 **保存并启动**，等待服务就绪
4. 在内置聊天界面中开始对话 🎉

### 方式二：源码运行

```powershell
# 克隆仓库
git clone https://github.com/yangyunfeng-cyber/llama.cpp-windows.git
cd llama.cpp-windows

# 安装依赖
npm install

# 启动
npm start
```

> 💡 如果你还没有 llama.cpp，可以从 [llama.cpp 官方仓库](https://github.com/ggml-ai/llama.cpp/releases) 下载 Windows 版本。

---

## 📖 使用指南

### 聊天与对话管理

- **左侧边栏** 显示所有对话历史，点击即可切换会话
- 输入框上方搜索栏可快速查找历史对话
- 每条 AI 回复下方提供 **复制、重新生成、删除** 操作按钮
- 点击 **清除上下文** 可重置当前会话，**删除所有消息** 清空全部对话

### 助手管理

- 聊天界面顶部显示助手标签页，点击标签即可切换
- 点击 **+** 按钮新建助手，可自定义名称和系统提示词
- 再次点击已选中的标签可取消选择（回到默认角色）
- 切换助手时自动注入对应的系统提示词

### 附件使用

- 点击输入框旁的 **📎** 按钮选择附件
- 支持图片（PNG / JPG / WebP / GIF）、文本文件（TXT / MD / JSON / 代码文件）、PDF
- 图片附件在聊天中显示缩略图预览，自动编码为多模态请求

### MCP 工具调用

> MCP（Model Context Protocol）让模型在对话中调用外部工具，实现文件读写、数据库查询、网页抓取等能力。

**添加 MCP 服务器：**

1. 进入 **设置 → MCP** 标签页
2. 点击 **添加 MCP 服务器**
3. 填写名称和启动命令，例如：

| 工具 | 启动命令 |
|---|---|
| 文件系统 | `npx -y @modelcontextprotocol/server-filesystem C:\Users\你的用户名\Desktop` |
| 时间查询 | `npx -y @anthropic/mcp-server-time` |
| 知识记忆 | `npx -y @modelcontextprotocol/server-memory` |
| SQLite 数据库 | `npx -y @anthropic/mcp-server-sqlite db.sqlite` |

4. 点击连接，状态变为绿色即可使用
5. 聊天时模型会自动识别需要调用的工具并执行

> ⚠️ 使用 MCP 功能需要模型支持 Function Calling。推荐使用支持工具调用的模型（如 Qwen 系列、Llama 3 系列等）。

---

## 🛠️ 开发

```powershell
# 安装依赖
npm install

# 开发模式启动
npm start

# 打包为便携式 .exe
npm run dist
```

### 技术栈

| 层级 | 技术 |
|---|---|
| 桌面框架 | Electron 41 |
| 主进程 | Node.js ESM（约 1,750 行，单文件） |
| 渲染进程 | 原生 HTML / CSS / JavaScript（无框架） |
| MCP 客户端 | 自研 JSON-RPC over stdio |
| 构建工具 | electron-builder |

---

## 📁 项目结构

```
assets/      图标和托盘图标
desktop/     Electron 主进程和预加载脚本
renderer/    桌面端界面 (HTML / CSS / JS)
scripts/     图标生成脚本
docs/        文档资源
```

---

## 📝 更新日志

### v0.7.2（2026-07-11）

- 🔧 **MCP 工具调用完整实现** — 流式响应中正确解析 tool_calls，支持多轮工具执行循环，工具结果自动回传模型
- 🐛 **MCP 连接稳定性修复** — Windows 下 spawn 兼容性、断开/停止按钮行为修正、预加载参数传递修复
- 🎨 **UI 体验优化** — Toast 通知居中显示、设置面板布局修复、模型名与发送按钮分离
- 💡 **工具调用状态显示** — 聊天消息中展示工具调用标签（⏳ 调用中 / ✅ 完成 / ❌ 失败）
- 📝 **文档完善** — 新增环境要求章节，MCP 使用指南以验证可用的示例为准

### v0.7.1（2026-07-10）

- ✨ **全新 UI 设计** — 视觉体验全面升级，布局更清晰、配色更舒适
- 🎯 **助手管理系统重构** — 新建/编辑/删除操作更直观流畅，切换助手实时生效
- 💬 **对话管理增强** — 支持历史对话搜索、快速切换会话、一键清除上下文
- 🦙 **兼容最新 llama.cpp** — 支持至 2026 年 7 月 10 日的 llama.cpp 版本
- 🐛 **修复多项显示问题** — 滚动位置保持、模型名遮挡按钮、设置面板等多个已知问题

---

## 相比原项目的改进

### 新增功能
- **助手系统** — 创建/切换/管理命名助手，每个助手可配置独立的系统提示词，对话中一键切换角色
- **Markdown 渲染** — 自研轻量渲染器，支持标题、粗体、斜体、链接、列表、表格、块引用、代码高亮
- **LaTeX 自动转换** — `\rightarrow` → `→`、`\times` → `×`，下标和括号自动清理
- **对话管理** — 历史搜索、会话切换、清除上下文、删除所有消息
- **重新生成** — 每条 AI 回复可基于同一问题重新生成答案
- **附件支持** — 图片预览、文本文件内容提取、PDF 上传

### 安全性修复
- 移除硬编码本机路径，改为空默认值 + 用户配置
- `shell.openExternal` 协议白名单，仅允许 `http(s):` 协议
- CSP 内容安全策略，限制脚本和连接来源
- 关键路径添加错误日志记录

### 进程管理优化
- 优雅退出：先关闭 stdin，3 秒超时后 `taskkill /F` 强杀
- `before-quit` 超时保护：`Promise.race` 限制最多等待 5 秒

---

## 许可

[MIT](LICENSE)
