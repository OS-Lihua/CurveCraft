"use client";

import { useRouter } from "next/navigation";

interface LoadingModalProps {
  isOpen: boolean;
  status: "loading" | "success" | "error";
  message?: string;
  onClose: () => void;
}

export const LoadingModal = ({ isOpen, status, message, onClose }: LoadingModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSuccess = () => {
    router.push("/deploy"); // 跳转到部署页面
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        {status === "loading" && (
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4 text-lg">正在计算中...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="text-error text-5xl mb-4">✕</div>
            <p className="text-lg mb-6">{message || "函数不符合规则"}</p>
            <button className="btn btn-primary" onClick={onClose}>
              确认
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="text-success text-5xl mb-4">✓</div>
            <p className="text-lg mb-6">计算成功！</p>
            <button className="btn btn-primary" onClick={handleSuccess}>
              前往部署
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
