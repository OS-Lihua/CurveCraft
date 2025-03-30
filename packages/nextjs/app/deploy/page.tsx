import { DeployContracts } from "./_components/DeployContracts";
import type { NextPage } from "next";

const Deploy: NextPage = () => {
  return (
    <>
      <DeployContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Deploy Contracts</h1>
        <p className="text-neutral">Deploy and manage your curve contracts here.</p>
      </div>
    </>
  );
};

export default Deploy;
