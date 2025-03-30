"use client";

import { SwapContracts } from "./_components/SwapContracts";
import type { NextPage } from "next";

const Swap: NextPage = () => {
  return (
    <>
      <SwapContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Swap Tokens</h1>
        <p className="text-neutral">Swap tokens using your custom curve contracts here.</p>
      </div>
    </>
  );
};

export default Swap;
