"use client";

import React, { useEffect, useRef, useState } from "react";

// 为Desmos添加类型定义
declare global {
  interface Window {
    Desmos: any;
  }
}

interface FunctionCalculatorProps {
  onCalculate: (expression: string, range: [number, number]) => void;
}

export const FunctionCalculator = ({ onCalculate }: FunctionCalculatorProps) => {
  const [functionExpression, setFunctionExpression] = useState("y=");
  const [range, setRange] = useState({ min: 0.1, max: 10 });
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
      setFunctionExpression("y=");
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

      // 设置表达式
      calculatorInstance.setExpression({ id: "function", latex: latex });
    } catch (error) {
      console.error("无法解析表达式:", error);
    }
  };

  // 处理提交
  const handleSubmit = () => {
    const expr = functionExpression;

    onCalculate(expr, [range.min, range.max]);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 左侧：函数输入和小键盘 */}
      <div className="bg-base-200 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">函数输入</h3>

        {/* 函数输入框 */}
        <div className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full text-lg font-mono"
            value={functionExpression}
            onChange={e => setFunctionExpression(e.target.value)}
            onKeyDown={e => e.key === "Enter" && updateGraph()}
          />
        </div>

        {/* 范围输入 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label">
              <span className="label-text">x 最小值</span>
            </label>
            <input
              type="number"
              step="0.1"
              className="input input-bordered w-full"
              value={range.min}
              onChange={e => setRange(prev => ({ ...prev, min: parseFloat(e.target.value) }))}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">x 最大值</span>
            </label>
            <input
              type="number"
              step="0.1"
              className="input input-bordered w-full"
              value={range.max}
              onChange={e => setRange(prev => ({ ...prev, max: parseFloat(e.target.value) }))}
            />
          </div>
        </div>

        {/* 小键盘 */}
        <div className="grid grid-cols-5 gap-2">
          {keypadConfig.map((row, i) => (
            <React.Fragment key={i}>
              {row.map(key => (
                <button key={key} className="btn btn-sm" onClick={() => handleKeyClick(key)}>
                  {key}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="mt-4 space-x-4">
          <button className="btn btn-primary" onClick={updateGraph}>
            预览
          </button>
          <button className="btn btn-secondary" onClick={handleSubmit}>
            确认
          </button>
        </div>
      </div>

      {/* 右侧：图形显示 */}
      <div className="bg-base-200 rounded-xl p-6">
        <div ref={calculatorRef} className="w-full h-[500px]" />
      </div>
    </div>
  );
};
