import numpy as np
from scipy.optimize import fsolve
import sympy as sp
import json

# 判断序列是否单调
def is_monotonic(arr):
    diff = np.diff(arr)
    return np.all(diff > 0) or np.all(diff < 0)

# 拟合 n 次多项式
def fit_polynomial(x, y, n):
    coeffs = np.polyfit(x, y, n)
    return coeffs

# 判断多项式的导数是否恒负（单调减）
def check_derivative_negative(coeffs, x_range):
    poly = np.poly1d(coeffs)
    deriv = poly.deriv()
    x_test = np.linspace(x_range[0], x_range[1], 100)
    deriv_values = deriv(x_test)
    return np.all(deriv_values < 0)

# 主函数
def process_function(F_str, xl, xr, n=3):
    """
    参数:
    F_str: 字符串形式的函数表达式，例如 "x**2 + y**2 - 1"
    xl, xr: 区间 [xl, xr]
    n: 多项式插值的次数，默认值为 3
    返回: JSON 格式的字典
    """
    # 检查输入区间是否在第一象限
    if xl < 0 or xr < 0:
        return json.dumps({"error": "区间不在第一象限"})

    # 解析 F(x, y) = 0
    x, y = sp.symbols('x y')
    try:
        F = sp.sympify(F_str)
    except Exception:
        return json.dumps({"error": "函数表达式无效"})

    # 在 [xl, xr] 内均匀取点并求解 y
    x_points = np.linspace(xl, xr, 100)
    y_points = []

    for x_val in x_points:
        # 定义方程 F(x_val, y) = 0
        func = lambda y_val: F.subs(x, x_val).subs(y, y_val).evalf()
        # 使用 fsolve 求解 y，初始猜测为 0.5
        y_val = fsolve(func, 0.5)[0]
        # 确保 y 在第一象限
        if y_val < 0:
            return json.dumps({"error": "函数值不在第一象限"})
        y_points.append(y_val)

    y_points = np.array(y_points)

    # 步骤 1: 判断单调性
    if not is_monotonic(y_points):
        return json.dumps({"error": "函数不单调"})

    # 步骤 2: 拟合 y = f(x)
    a_n = fit_polynomial(x_points, y_points, n)

    # 拟合 x = g(y)，需要确保 y 是单调的
    if not is_monotonic(y_points):
        return json.dumps({"error": "反函数不单调"})
    b_n = fit_polynomial(y_points, x_points, n)

    # 步骤 3: 判断 y = f(x) 是否单调减
    if not check_derivative_negative(a_n, [xl, xr]):
        return json.dumps({"error": "函数非单调减"})

    # 返回结果
    result = {
        "length": n + 1,
        "a_n": a_n.tolist(),  # 转换为列表以便 JSON 序列化
        "b_n": b_n.tolist()
    }
    return json.dumps(result)

# 示例：模拟 API 输入
if __name__ == "__main__":
    # 示例输入
    F_str = "x**2 + y**2 - 1"  # 单位圆的上半部分
    xl, xr = 0, 1
    n = 3  # 多项式次数

    # 调用主函数
    result = process_function(F_str, xl, xr, n)
    print(result)