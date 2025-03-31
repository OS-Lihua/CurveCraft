"use client";

import { useState } from "react";
import { FunctionCalculator } from "./_components/FunctionCalculator";
import { LoadingModal } from "./_components/LoadingModal";
import type { NextPage } from "next";

// Python服务器的API地址
const API_URL = "http://localhost:5000/api/solve-curve";

const CraftCurvePage: NextPage = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    status: "loading" | "success" | "error";
    message?: string;
  }>({
    isOpen: false,
    status: "loading",
  });

  const handleCalculate = async (expression: string, range: [number, number]) => {
    setModalState({ isOpen: true, status: "loading" });

    try {
      console.log("发送数据到Python服务器:", { expression, range });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression,
          range,
        }),
      });

      const data = await response.json();
      console.log("Python服务器返回数据:", data);

      if (data.success) {
        setModalState({ isOpen: true, status: "success" });

        // 存储结果，用于后续使用
        localStorage.setItem("curveResult", JSON.stringify(data.data));
      } else {
        setModalState({
          isOpen: true,
          status: "error",
          message: data.message || "计算失败",
        });
      }
    } catch (error) {
      console.error("调用Python API出错:", error);
      setModalState({
        isOpen: true,
        status: "error",
        message: "无法连接到计算服务器，请检查服务器是否运行",
      });
    }
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, status: "loading" });
  };

  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">自定义曲线</h1>
        <p className="text-neutral">
          创建、部署并使用您自己定义的 Swap 曲线公式，突破传统 AMM 的限制。
          <br />
          绘制、调整参数，并在部署前模拟您的曲线行为。
        </p>
      </div>
      <div className="p-8">
        <FunctionCalculator onCalculate={handleCalculate} />
      </div>

      <LoadingModal
        isOpen={modalState.isOpen}
        status={modalState.status}
        message={modalState.message}
        onClose={handleModalClose}
      />
    </>
  );
};

export default CraftCurvePage;
