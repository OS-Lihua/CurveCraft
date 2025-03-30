"use client";

import Link from "next/link";
import type { NextPage } from "next";
import {
  BeakerIcon,
  ChartBarIcon,
  CircleStackIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-20">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold mb-2">Curve Craft 曲线工匠</span>
            <span className="block text-2xl">创建、部署并使用自己定义的曲线，走向 DeFi 未来</span>
          </h1>
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/craft" className="btn btn-primary">
              开始创建曲线
            </Link>
            <Link href="/about" className="btn btn-outline">
              了解更多
            </Link>
          </div>
        </div>

        <div className="w-full px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-2">突破传统 AMM 限制</h2>
          <p className="text-center text-lg mb-12">我们的平台让您可以用任何数学函数定义交易曲线，创造更高效的市场</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col bg-base-100 p-6 rounded-3xl shadow-lg">
              <BeakerIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">自定义曲线</h3>
              <p className="text-base-content/80">使用任意数学表达式定义交易曲线，摆脱传统的恒定乘积公式</p>
            </div>
            <div className="flex flex-col bg-base-100 p-6 rounded-3xl shadow-lg">
              <CodeBracketIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">自动生成 Solidity</h3>
              <p className="text-base-content/80">系统自动将您定义的数学表达式转换为 Solidity 智能合约代码</p>
            </div>
            <div className="flex flex-col bg-base-100 p-6 rounded-3xl shadow-lg">
              <CursorArrowRaysIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">一键部署</h3>
              <p className="text-base-content/80">在几次点击中，将您定义的 Swap 合约部署到 EVM 兼容链</p>
            </div>
            <div className="flex flex-col bg-base-100 p-6 rounded-3xl shadow-lg">
              <ChartBarIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">曲线可视化</h3>
              <p className="text-base-content/80">实时可视化您定义的交易曲线，直观了解价格变化</p>
            </div>
            <div className="flex flex-col bg-base-100 p-6 rounded-3xl shadow-lg">
              <CircleStackIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">流动性池管理</h3>
              <p className="text-base-content/80">轻松管理您部署的自定义曲线池的流动性资金</p>
            </div>
            <div className="flex flex-col bg-base-100 p-6 rounded-3xl shadow-lg">
              <ComputerDesktopIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">测试工具</h3>
              <p className="text-base-content/80">提供完整的工具集让您在部署前充分测试自定义曲线</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-16 px-8 py-12 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">准备好创建您的自定义曲线了吗？</h2>
            <p className="text-xl mb-8">开始使用我们的平台，几分钟内创建、部署并测试您的自定义 Swap 曲线</p>
            <Link
              href="/craft"
              className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary"
            >
              开始创建 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
