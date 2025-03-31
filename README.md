# CurveCraft 📊

## **自定义 swap / bonding curve 曲线** 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org/)

去中心化 DeFi 工具。

## 理解Token 🪙

Token 不等于 Currency/Coin。"以太坊中的ERC-20通证几乎可以代表网络中的任何事物。"

### 参考资料 📚
- [通证的含义](https://dictionary.cambridge.org/zhs/%E8%AF%8D%E5%85%B8/%E8%8B%B1%E8%AF%AD-%E6%B1%89%E8%AF%AD-%E7%AE%80%E4%BD%93/token)
- [ERC-20 token标准](https://eips.ethereum.org/EIPS/eip-20)

### 相关项目 🔗
- [Grassroot Economics](https://github.com/grassrootseconomics/erc20-pool)
- [Honour](https://honour-money.vercel.app/)
- [CirclesUBI](https://handbook.joincircles.net/docs/developers/architecture/tech-overview)

## 问题 ❓

1. 链上资产发行对普通人来说过于复杂，而将Finance与Fun结合在一起的尝试实际上会让人倾家荡产，并不能让这个世界变得更好。

2. 发行链上Token对于草根社区来说仍然是区块链技术具有吸引力的应用，但缺乏专业知识和全球性的金融工具互动（Bonding Curve, AMM 等）。如：
   - 南塘豆
   - SB
   - 乡建积分
   - SeeDAO积分
   - LXP

3. 社区token通常在社区内流通，彼此间的具体债务。社区通证如何与这种全球性的金融玩法（DeFi）互动，同时不被殖民？

## Fun 与 Fi 🎮💰

### 学习沙盒 (Fun) 🎓
探索链上资产发行、定价、交易的可能性。

### 去中心化交易所工具箱 (Fi) 🛠️
设计自己的曲线，发行自己的资产。

## 开发路线 🗺️

提供一个创新的DeFi工具，让用户轻松学习通证交易和发行的价格逻辑（Fun），进一步设计自己的资产发行，并逐步打造一个灵活、可扩展的生态系统（Fi）。

### Beta ⚡
实现多项式自定义 swap 曲线，为比赛验证基础。

### V0 🌱
支持任意函数定义 swap 曲线，释放更多可能。

### V1 🚀
引入 bonding curve 自定义功能，扩展代币发行。

### V2 💫
整合 swap 和 bonding 曲线，提供一键部署。

### V3 🔮
集成预言机，让曲线适应市场变化。

### V4 ⚙️
添加 hook，支持用户扩展自定义逻辑。

## 技术架构 🏗️

### 智能合约 📝
- 模块化设计
- ERC20 实现
- 曲线计算
- 安全机制

### 前端界面 🖥️
- React/Next.js
- Web3 接口
- 曲线设计器
- 数据可视化

### 后端服务 🔧
- Graph Protocol
- 预言机服务
- API 接口
- 数据分析

## 开发指南 💻

```bash
git clone https://github.com/yourusername/CurveCraft.git
npm install
npm run dev
npm test
```

## 参与贡献 🤝

欢迎提交 Issue 和 Pull Request。

## 开源协议 📄

MIT

## 相关资源 📚

- [文档](docs/) 📖
- [演示](https://demo.curvecraft.io) 🎮
- [讨论](https://forum.curvecraft.io) 💬

## 安全 🔒

发现安全问题请提交 Issue 或发送邮件。

---

CurveCraft 团队 👥



---
# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Foundry, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Foundry. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/foundry/foundry.toml`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/foundry/script` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn foundry:test`

- Edit your smart contracts in `packages/foundry/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/foundry/script`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.