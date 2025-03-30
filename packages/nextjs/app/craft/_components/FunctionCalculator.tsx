"use client";

import React, { useEffect, useRef, useState } from "react";

// 为Desmos添加类型定义
declare global {
  interface Window {
    Desmos: any;
  }
}

export const FunctionCalculator = () => {
  const [functionExpression, setFunctionExpression] = useState("y=");
  const [calculatorInstance, setCalculatorInstance] = useState<any>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 加载Desmos脚本
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Desmos && !isScriptLoaded) {
      const script = document.createElement("script");
      script.src = "https://www.desmos.com/api/v1.7/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isScriptLoaded]);

  // 初始化计算器
  useEffect(() => {
    if (calculatorRef.current && !calculatorInstance && window.Desmos) {
      try {
        const calculator = window.Desmos.GraphingCalculator(calculatorRef.current, {
          expressions: false,
          settingsMenu: false,
          zoomButtons: true,
          lockViewport: false,
          border: false,
          expressionsCollapsed: true,
        });
        setCalculatorInstance(calculator);

        // 设置初始函数
        calculator.setExpression({ id: "function", latex: "y=x^2" });
      } catch (error) {
        console.error("初始化Desmos计算器时出错:", error);
      }
    }
  }, [calculatorInstance, isScriptLoaded]);

  // 处理按键输入
  const handleKeyClick = (value: string) => {
    if (value === "clear") {
      setFunctionExpression("");
      return;
    }

    let newExpression = functionExpression;

    // 处理各种数学函数和符号
    switch (value) {
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
        newExpression += `${value}(`;
        break;
      case "sqrt":
        newExpression += "√(";
        break;
      case "pi":
        newExpression += "pi";
        break;
      case "e":
        newExpression += "e";
        break;
      default:
        newExpression += value;
    }

    setFunctionExpression(newExpression);
  };

  // 更新函数图像
  const updateGraph = () => {
    if (!calculatorInstance) return;

    // 移除旧的表达式
    calculatorInstance.removeExpression({ id: "function" });

    // 添加新的表达式
    try {
      // 将表达式转换为Desmos可接受的格式
      let latex = functionExpression;

      // 替换常见的数学符号和函数
      latex = latex.replace(/×/g, "*");
      latex = latex.replace(/÷/g, "/");
      latex = latex.replace(/√\(([^)]+)\)/g, "\\sqrt{$1}");
      latex = latex.replace(/√([a-zA-Z0-9]+)/g, "\\sqrt{$1}");

      // 替换常量
      latex = latex.replace(/pi/g, "\\pi");
      latex = latex.replace(/e/g, "\\e");

      // 处理指数运算
      latex = latex.replace(/(\^)([^\s+\-*/()]+)/g, "^{$2}");

      // 替换三角函数
      latex = latex.replace(/sin\(/g, "\\sin(");
      latex = latex.replace(/cos\(/g, "\\cos(");
      latex = latex.replace(/tan\(/g, "\\tan(");

      // 替换对数函数
      latex = latex.replace(/ln\(/g, "\\ln(");
      latex = latex.replace(/log\(/g, "\\log(");

      // 检查是否为隐函数
      if (!latex.includes("=")) {
        // 如果不包含等号，假设它是右侧表达式，添加y=
        latex = "y=" + latex;
      }

      // 设置表达式
      calculatorInstance.setExpression({ id: "function", latex: latex });
    } catch (error) {
      console.error("无法解析表达式:", error);
    }
  };

  // 处理API提交
  const handleSubmit = async () => {
    // 更新图形
    updateGraph();

    try {
      // 发送函数表达式到API
      const response = await fetch("/api/submit-function", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ functionExpression }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`函数已提交成功: ${functionExpression}`);
      } else {
        alert(`提交失败: ${data.message}`);
      }
    } catch (error) {
      console.error("提交函数时出错:", error);
      alert("提交函数时发生错误，请稍后再试");
    }
  };

  // 键盘按钮配置
  const keypadConfig = [
    ["7", "8", "9", "(", ")"],
    ["4", "5", "6", "*", "/"],
    ["1", "2", "3", "+", "-"],
    ["0", ".", "^", "x", "y"],
    ["sin", "cos", "tan", "sqrt", "clear"],
    ["=", "log", "ln", "pi", "e"],
  ];

  return (
    <div className="flex flex-col bg-base-100 px-6 md:px-10 py-8 text-center items-center max-w-6xl rounded-2xl w-full">
      <h2 className="text-2xl font-bold mb-6">函数图形计算器</h2>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 左侧面板：函数输入和小键盘 */}
        <div className="bg-base-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">函数输入</h3>

          {/* 函数输入框 */}
          <div className="mb-4">
            <input
              type="text"
              className="input input-bordered w-full text-lg font-mono"
              placeholder="输入函数，例如: y=x^2"
              value={functionExpression}
              onChange={e => setFunctionExpression(e.target.value)}
              onKeyDown={e => e.key === "Enter" && updateGraph()}
            />
          </div>

          {/* 函数显示 */}
          <div className="bg-base-300 rounded-lg p-3 mb-4">
            <p className="text-left">
              当前函数：<span className="font-mono font-bold text-primary">{functionExpression || "请输入函数"}</span>
            </p>
          </div>

          {/* 小键盘 */}
          <div className="grid grid-cols-5 gap-2">
            {keypadConfig.map((row, rowIndex) => (
              <React.Fragment key={`row-${rowIndex}`}>
                {row.map(key => (
                  <button
                    key={key}
                    className="btn btn-sm btn-secondary hover:btn-primary"
                    onClick={() => handleKeyClick(key)}
                  >
                    {key === "*" ? "×" : key === "/" ? "÷" : key === "sqrt" ? "√" : key}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 右侧面板：图形计算器 */}
        <div className="bg-base-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">图形预览</h3>
          <div
            ref={calculatorRef}
            className="w-full h-[400px] md:h-[500px] border-2 border-base-300 rounded-lg bg-white"
            style={{ minHeight: "400px" }}
          ></div>
        </div>
      </div>

      {/* 确认按钮 */}
      <div className="flex gap-4">
        <button className="btn btn-primary btn-wide" onClick={updateGraph}>
          预览图形
        </button>
        <button className="btn btn-accent btn-wide" onClick={handleSubmit}>
          确认提交
        </button>
      </div>
    </div>
  );
};
