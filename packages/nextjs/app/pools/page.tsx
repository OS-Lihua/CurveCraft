"use client";

import { PoolContracts } from "./_components/PoolContracts";
import type { NextPage } from "next";

const Pools: NextPage = () => {
  return (
    <>
      <PoolContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Liquidity Pools</h1>
        <p className="text-neutral">View and manage your liquidity positions here.</p>
      </div>
    </>
  );
};

export default Pools;
