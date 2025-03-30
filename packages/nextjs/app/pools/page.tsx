"use client";

import { PoolContracts } from "./_components/PoolContracts";
import type { NextPage } from "next";

const Pools: NextPage = () => {
  return (
    <>
      <PoolContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">流动性池</h1>
        <p className="text-neutral">查看和管理您的流动性仓位</p>
      </div>
    </>
  );
};

export default Pools;
