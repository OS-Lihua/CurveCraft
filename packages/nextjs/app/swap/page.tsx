"use client";

import { SwapContracts } from "./_components/SwapContracts";
import type { NextPage } from "next";

const Swap: NextPage = () => {
  return (
    <>
      <SwapContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Token 互换</h1>
        <p className="text-neutral">使用您的自定义曲线合约进行 Token 互换</p>
      </div>
    </>
  );
};

export default Swap;
