# Community Wiki Framework

从社区百科的使用场景中整理出的独立前端框架。提供检索、收藏、分章课程、自动跳题、错题解析、固定核心的小队替补，以及本地投稿草稿。

这不是完整网站备份。通用交互经过独立整理，演示文字和条目全部重新编写为虚构资料。项目不提供任何现有游戏的数据、图片、音视频、模型、技能公式或服务端资料，也不依赖这些内容运行。

## 运行

使用 Node.js 22.12 或以上版本、pnpm 11.25.0：

项目配置使用目录内的依赖缓存和 hoisted 布局，便于在没有创建符号链接权限的 Windows 环境安装。缓存不会提交到仓库。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm test
pnpm check:public
pnpm build
pnpm preview
```

构建结果位于 `dist/`，可以部署到静态服务器。相对资源路径和 hash 导航支持部署到子目录，不需要服务器配置页面重写。

## 已有功能

| 模块 | 演示功能 |
| --- | --- |
| 资料馆 | 名称与关键词检索、分类、详情页、收藏 |
| 课程 | 篇章切换、阅读进度、选答案自动跳题、手动提交、错题解析默认收起 |
| 小队 | 固定核心、替换队员、禁止重复选择、恢复示例 |
| 共创 | 保存本地草稿、导出 JSON、保存失败提示 |

收藏、阅读、答题和已保存草稿使用当前浏览器的 localStorage，不跨设备同步。课程内容修订后，维护者应更新存储键的版本，避免旧答案被用于新题目。

共创页没有远程投稿功能，也没有站长后台。账号登录、审核、通知和数据库需要项目使用者自行接入；本地草稿不会被显示为已提交审核。页面不加载第三方字体、图片或统计脚本。

## 替换为自己的内容

- 修改 `src/data.ts` 中的资料、章节、题目与小队成员。
- 修改 `src/style.css` 调整样式。当前演示没有任何图片文件，卡片完全由文字和 CSS 组成。
- 在 `src/storage.ts` 替换本地存储适配。正式接入服务时，身份校验、审核权限和数据校验必须放在服务端实现。
- 数据标识应保持唯一；修改题目的选项顺序或答案后应更换记录版本。

详细说明见 [架构与边界](docs/ARCHITECTURE.md)。

## 授权与贡献

本项目新编写的框架代码、样式和虚构示例文本采用 [MIT License](LICENSE)。依赖包遵循各自许可证，见 [第三方说明](THIRD_PARTY_NOTICES.md)。这一许可不覆盖他人另外添加的资料和素材。

贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。不要向本仓库提交游戏素材、客户端文件、真实账号信息或无授权的内容。

This is a standalone, media-free community wiki frontend with fictional sample content. It includes search, local favorites, a course reader and quiz, replaceable roster slots, and local contribution drafts. No game assets, game datasets, production backend, or combat calculations are included.
