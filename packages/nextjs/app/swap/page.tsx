"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

export default function SwapPage() {
  const { address: connectedAddress } = useAccount();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState({
    address: "",
    symbol: "选择代币",
    balance: "0.00",
  });
  const [toToken, setToToken] = useState({
    address: "",
    symbol: "选择代币",
    balance: "0.00",
  });

  const handleSwap = async () => {
    // TODO: Implement swap functionality
    console.log("Swap", { fromToken, toToken, fromAmount, toAmount });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200/30">
      <div className="w-full max-w-6xl px-6 py-16 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">Token 互换</h1>
          <p className="text-lg text-base-content/90">在自定义曲线上进行代币互换</p>
        </div>

        <div className="card bg-base-100 shadow-xl w-full max-w-lg mx-auto">
          <div className="card-body p-8">
            <div className="space-y-6">
              {/* From Token */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-base-content">从</span>
                  <span className="label-text-alt">余额: {fromToken.balance}</span>
                </label>
                <div className="join w-full">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered join-item w-2/3"
                    value={fromAmount}
                    onChange={e => setFromAmount(e.target.value)}
                  />
                  <button className="btn join-item w-1/3 bg-base-200 hover:bg-base-300">{fromToken.symbol}</button>
                </div>
              </div>

              {/* Swap Direction Button */}
              <div className="flex justify-center -my-2">
                <button className="btn btn-circle btn-sm btn-ghost">
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
              </div>

              {/* To Token */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-base-content">到</span>
                  <span className="label-text-alt">余额: {toToken.balance}</span>
                </label>
                <div className="join w-full">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered join-item w-2/3"
                    value={toAmount}
                    onChange={e => setToAmount(e.target.value)}
                  />
                  <button className="btn join-item w-1/3 bg-base-200 hover:bg-base-300">{toToken.symbol}</button>
                </div>
              </div>

              {/* Price Info */}
              <div className="bg-base-200 rounded-box p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>兑换率</span>
                  <span>
                    1 {fromToken.symbol} = 0.00 {toToken.symbol}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>最小接收</span>
                  <span>0.00 {toToken.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>价格影响</span>
                  <span>0.00%</span>
                </div>
              </div>

              {/* Connect Wallet / Swap Button */}
              {connectedAddress ? (
                <button
                  className="btn btn-primary w-full text-lg h-auto py-4 normal-case font-semibold shadow-lg hover:shadow-primary/50 transition-all duration-200"
                  onClick={handleSwap}
                >
                  互换
                </button>
              ) : (
                <button className="btn btn-primary w-full text-lg h-auto py-4 normal-case font-semibold">
                  连接钱包
                </button>
              )}

              {/* Connected Address */}
              {connectedAddress && (
                <div className="text-center text-sm text-base-content/70">
                  <span>连接地址：</span>
                  <Address address={connectedAddress} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
