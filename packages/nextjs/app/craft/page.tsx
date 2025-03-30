"use client";

import { CraftCurve } from "./_components/CraftCurve";
import type { NextPage } from "next";

const CraftCurvePage: NextPage = () => {
  return (
    <>
      <CraftCurve />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Craft Your Curve</h1>
        <p className="text-neutral">
          Create custom mathematical curves that define how your DeFi protocol prices and swaps tokens.
          <br />
          Draw, adjust parameters, and simulate your curve&apos;s behavior before deployment.
        </p>
      </div>
    </>
  );
};

export default CraftCurvePage;
