"use client";

import { CraftCurve } from "./_components/CraftCurve";
import type { NextPage } from "next";

const CraftCurvePage: NextPage = () => {
  return (
    <>
      <CraftCurve />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">自定义曲线</h1>
        <p className="text-neutral">
          创建、部署并使用您自己定义的 Swap 曲线公式，突破传统 AMM 的限制。
          <br />
          绘制、调整参数，并在部署前模拟您的曲线行为。
        </p>
      </div>
    </>
  );
};

export default CraftCurvePage;
