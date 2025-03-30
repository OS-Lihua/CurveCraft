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
    <div className="flex flex-col items-center min-h-screen bg-base-200/30">
      <div className="w-full max-w-6xl px-6 py-16 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">部署自定义曲线合约</h1>
          <p className="text-lg text-base-content/90">一键将您的自定义曲线合约部署到区块链</p>
        </div>

        <div className="card bg-base-100 shadow-xl w-full max-w-3xl mx-auto">
          <div className="card-body p-8">
            <div className="space-y-8">
              {/* Contract Code */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-base-content">合约代码</span>
                </label>
                <textarea
                  className="textarea textarea-bordered font-mono h-64 bg-base-200/50 hover:bg-base-200/70 focus:bg-base-100 rounded-md"
                  placeholder="在此粘贴您的 Solidity 合约代码..."
                  value={contractCode}
                  onChange={e => setContractCode(e.target.value)}
                  disabled={isDeploying}
                />
              </div>

              {/* Token Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-base-content">Token X 地址</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered font-mono bg-base-200/50 hover:bg-base-200/70 focus:bg-base-100"
                    placeholder="0x..."
                    value={tokenXAddress}
                    onChange={e => setTokenXAddress(e.target.value)}
                    disabled={isDeploying}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-base-content">Token Y 地址</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered font-mono bg-base-200/50 hover:bg-base-200/70 focus:bg-base-100"
                    placeholder="0x..."
                    value={tokenYAddress}
                    onChange={e => setTokenYAddress(e.target.value)}
                    disabled={isDeploying}
                  />
                </div>
              </div>

              {/* Network */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-base-content">网络</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-base-200/50"
                  value={publicClient?.chain?.name || "未连接"}
                  disabled
                />
              </div>

              {/* Deploy Button */}
              <button
                className="btn btn-primary w-full text-lg h-auto py-4 normal-case font-semibold shadow-lg hover:shadow-primary/50 transition-all duration-200"
                onClick={handleDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner"></span>
                    <span>部署中...</span>
                  </div>
                ) : (
                  "部署合约"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
