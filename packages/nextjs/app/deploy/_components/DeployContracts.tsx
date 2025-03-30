"use client";

import { useState } from "react";
import { BrowserProvider, Contract, ContractFactory } from "ethers";
import { usePublicClient, useWalletClient } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

export const DeployContracts = () => {
  const [contractCode, setContractCode] = useState("");
  const [tokenXAddress, setTokenXAddress] = useState("");
  const [tokenYAddress, setTokenYAddress] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const validateInputs = () => {
    if (!contractCode.trim()) {
      notification.error("请输入合约代码");
      return false;
    }
    if (!tokenXAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      notification.error("Token X 地址格式不正确");
      return false;
    }
    if (!tokenYAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      notification.error("Token Y 地址格式不正确");
      return false;
    }
    if (!walletClient) {
      notification.error("请先连接钱包");
      return false;
    }
    return true;
  };

  const handleDeploy = async () => {
    if (!validateInputs() || !walletClient) return;

    try {
      setIsDeploying(true);

      // Compile the contract
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCode: contractCode }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "合约编译失败");
      }

      const { abi, bytecode } = await response.json();

      // Create ethers provider from wallet client
      const provider = new BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();

      // Create contract instance
      const factory = new ContractFactory(abi, bytecode, signer);

      // Deploy the contract with constructor arguments
      const contract = await factory.deploy(tokenXAddress, tokenYAddress);
      await contract.waitForDeployment();

      const deployedAddress = await contract.getAddress();

      notification.success(`合约部署成功，地址：${deployedAddress}`);

      // Reset form
      setContractCode("");
      setTokenXAddress("");
      setTokenYAddress("");
    } catch (error) {
      console.error("Deployment error:", error);
      notification.error(error instanceof Error ? error.message : "发生未知错误");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="px-5">
        <h1 className="text-center mb-8">
          <span className="block text-4xl font-bold">部署自定义曲线合约</span>
          <span className="block text-2xl mb-2">一键将您的自定义曲线合约部署到区块链</span>
        </h1>
      </div>
      <div className="flex flex-col bg-base-100 px-10 py-8 text-center items-center max-w-3xl rounded-2xl w-full">
        <div className="w-full space-y-6">
          {/* Contract Code */}
          <div className="flex flex-col items-start w-full">
            <label className="text-lg font-medium mb-2">合约代码</label>
            <textarea
              className="textarea textarea-bordered w-full h-48 font-mono"
              placeholder="在此粘贴您的 Solidity 合约代码..."
              value={contractCode}
              onChange={e => setContractCode(e.target.value)}
              disabled={isDeploying}
            />
          </div>

          {/* Token Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start">
              <label className="text-lg font-medium mb-2">Token X 地址</label>
              <input
                type="text"
                className="input input-bordered w-full font-mono"
                placeholder="0x..."
                value={tokenXAddress}
                onChange={e => setTokenXAddress(e.target.value)}
                disabled={isDeploying}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-lg font-medium mb-2">Token Y 地址</label>
              <input
                type="text"
                className="input input-bordered w-full font-mono"
                placeholder="0x..."
                value={tokenYAddress}
                onChange={e => setTokenYAddress(e.target.value)}
                disabled={isDeploying}
              />
            </div>
          </div>

          {/* Network */}
          <div className="flex flex-col items-start w-full">
            <label className="text-lg font-medium mb-2">网络</label>
            <div className="w-full">
              <input
                type="text"
                className="input input-bordered w-full"
                value={publicClient?.chain?.name || "未连接"}
                disabled
              />
            </div>
          </div>

          {/* Deploy Button */}
          <button
            className="btn btn-primary w-full text-lg py-3 mt-4 bg-gradient-to-r from-purple-400 to-blue-400 border-none hover:from-purple-500 hover:to-blue-500 disabled:opacity-50"
            onClick={handleDeploy}
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <span className="loading loading-spinner"></span>
                部署中...
              </>
            ) : (
              "部署合约"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
