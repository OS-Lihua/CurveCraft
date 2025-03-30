"use client";

import { useState } from "react";

export const CraftCurve = () => {
  const [curveParams, setCurveParams] = useState({
    initialPrice: "1.0",
    reserveRatio: "0.5",
    amplifier: "1",
  });

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">自定义曲线 Swap</span>
          <span className="block text-2xl mb-2">超越 Uniswap 的 x*y=k 限制</span>
        </h1>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-col bg-base-100 px-10 py-8 text-center items-center max-w-5xl rounded-2xl w-full">
        {/* 曲线绘制/预览区 */}
        <div className="w-full h-96 bg-base-200 rounded-xl mb-6 p-4">
          <div className="h-full flex items-center justify-center">
            <p className="text-lg">交互式曲线绘制区域即将推出...</p>
          </div>
        </div>

        {/* 参数配置和公式预览区 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 参数配置区 */}
          <div className="bg-base-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">曲线参数</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">初始价格</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="1.0"
                  value={curveParams.initialPrice}
                  onChange={e => setCurveParams({ ...curveParams, initialPrice: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">储备比率</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="0.5"
                  value={curveParams.reserveRatio}
                  onChange={e => setCurveParams({ ...curveParams, reserveRatio: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">曲线增益</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="1"
                  value={curveParams.amplifier}
                  onChange={e => setCurveParams({ ...curveParams, amplifier: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* 公式预览区 */}
          <div className="bg-base-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">公式预览</h3>
            <div className="space-y-4">
              <div className="bg-base-300 rounded-lg p-6">
                <p className="font-mono text-lg">y = k * x^(1/r)</p>
                <div className="mt-4 text-left">
                  <p className="mb-2">其中:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>k: 曲线增益 ({curveParams.amplifier})</li>
                    <li>r: 储备比率 ({curveParams.reserveRatio})</li>
                    <li>初始价格: {curveParams.initialPrice}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮区 */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="btn btn-primary">保存曲线</button>
          <button className="btn btn-secondary">模拟交易</button>
          <button className="btn btn-accent">部署合约</button>
        </div>
      </div>
    </div>
  );
};
