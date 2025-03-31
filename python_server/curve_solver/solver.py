import numpy as np
import sympy as sp
from sympy import symbols, sympify, solve, diff
import logging

# 配置日志
logger = logging.getLogger(__name__)

def parse_expression(expr_str):
    """将 Desmos 格式的函数表达式转换为 SymPy 可处理的表达式"""
    # 替换基本运算符
    expr_str = expr_str.replace('×', '*')
    expr_str = expr_str.replace('÷', '/')
    expr_str = expr_str.replace('^', '**')
    
    # 处理根号
    expr_str = expr_str.replace('√', 'sqrt')
    
    # 如果表达式包含等号，转换为标准形式 F(x,y)=0
    if '=' in expr_str:
        left, right = expr_str.split('=')
        expr_str = f"({left})-({right})"
    
    logger.info(f"转换后的表达式: {expr_str}")
    return expr_str

def is_monotonic(expr_str, x_range):
    """检查函数在给定范围内是否单调"""
    x, y = symbols('x y')
    
    try:
        # 解析表达式
        parsed_expr = parse_expression(expr_str)
        expr = sympify(parsed_expr)
        
        # 尝试解出y关于x的表达式
        y_expr_list = solve(expr, y)
        
        if not y_expr_list:
            return False, "无法解出y关于x的表达式"
        
        # 取第一个解（假设是我们需要的那个解）
        y_expr = y_expr_list[0]
        
        # 计算导数
        dy_dx = diff(y_expr, x)
        
        # 在范围内采样点检查导数符号
        xl, xr = x_range
        test_points = np.linspace(xl, xr, 20)
        
        # 检查第一象限的条件
        y_values = [float(y_expr.subs(x, x_val)) for x_val in test_points if x_val > 0]
        if any(y_val <= 0 for y_val in y_values):
            return False, "函数在指定范围内不完全位于第一象限"
        
        # 检查单调性
        derivatives = []
        for x_val in test_points:
            try:
                dy_dx_val = float(dy_dx.subs(x, x_val))
                derivatives.append(dy_dx_val)
            except:
                return False, f"在x={x_val}处无法计算导数"
        
        # 检查导数符号一致性
        if all(d < 0 for d in derivatives):
            return True, "函数在区间内单调递减"
        elif all(d > 0 for d in derivatives):
            return True, "函数在区间内单调递增"
        else:
            return False, "函数在区间内不是单调函数"
            
    except Exception as e:
        logger.error(f"检查单调性时出错: {str(e)}", exc_info=True)
        return False, f"检查单调性时出错: {str(e)}"

def polynomial_to_string(coeffs, var='x'):
    """将多项式系数转换为可读的表达式字符串"""
    terms = []
    for i, coef in enumerate(coeffs[::-1]):  # 从高次项到低次项
        if abs(coef) < 1e-10:  # 忽略接近零的系数
            continue
        
        power = len(coeffs) - 1 - i
        
        if power == 0:  # 常数项
            terms.append(f"{coef:.6f}")
        elif power == 1:  # 一次项
            if abs(coef - 1) < 1e-10:
                terms.append(f"{var}")
            elif abs(coef + 1) < 1e-10:
                terms.append(f"-{var}")
            else:
                terms.append(f"{coef:.6f}·{var}")
        else:  # 高次项
            if abs(coef - 1) < 1e-10:
                terms.append(f"{var}^{power}")
            elif abs(coef + 1) < 1e-10:
                terms.append(f"-{var}^{power}")
            else:
                terms.append(f"{coef:.6f}·{var}^{power}")
    
    if not terms:
        return "0"
    
    result = " + ".join(terms)
    # 替换加负数为减正数
    result = result.replace("+ -", "- ")
    return result

def interpolate_curve(expr_str, x_range, n_points=100, degree=10):
    """对曲线进行多项式拟合"""
    x, y = symbols('x y')
    
    try:
        # 解析表达式
        parsed_expr = parse_expression(expr_str)
        expr = sympify(parsed_expr)
        
        xl, xr = x_range
        
        # 尝试解出y关于x的表达式
        y_expr_list = solve(expr, y)
        if not y_expr_list:
            return None, None, "无法解出y关于x的表达式"
        
        # 取第一个解
        y_expr = y_expr_list[0]
        
        # 生成数据点
        x_vals = np.linspace(xl, xr, n_points)
        y_vals = []
        
        for x_val in x_vals:
            try:
                y_val = float(y_expr.subs(x, x_val))
                if y_val > 0:  # 只考虑第一象限的点
                    y_vals.append(y_val)
            except:
                continue
        
        if len(y_vals) < degree + 1:
            return None, None, "有效数据点不足，无法进行拟合"
        
        x_vals = x_vals[:len(y_vals)]  # 确保x和y长度一致
        
        # 多项式拟合 y = f(x)
        f_coeffs = np.polyfit(x_vals, y_vals, degree)
        
        # 多项式拟合 x = g(y)
        g_coeffs = np.polyfit(y_vals, x_vals, degree)
        
        # 生成可读的多项式表达式
        f_expr = polynomial_to_string(f_coeffs, 'x')
        g_expr = polynomial_to_string(g_coeffs, 'y')
        
        return f_coeffs, g_coeffs, None, {
            'f_expr': f'y = {f_expr}',
            'g_expr': f'x = {g_expr}'
        }
        
    except Exception as e:
        logger.error(f"拟合曲线时出错: {str(e)}", exc_info=True)
        return None, None, f"拟合曲线时出错: {str(e)}", None

def check_fitted_monotonicity(coeffs, x_range):
    """检查拟合后的多项式在区间内是否单调递减"""
    # 计算多项式的导数系数
    deriv_coeffs = np.polyder(coeffs)
    
    # 在区间内采样检查导数符号
    xl, xr = x_range
    test_points = np.linspace(xl, xr, 20)
    
    # 计算各点的导数值
    derivatives = [np.polyval(deriv_coeffs, x) for x in test_points]
    
    # 检查是否都是负的（递减）
    return all(d < 0 for d in derivatives)

def solve_curve(expression, x_range):
    """处理输入数据并返回结果"""
    try:
        # 默认拟合度数
        degree = 10
        
        logger.info(f"处理表达式: {expression}, 范围: {x_range}")
        
        # 检查单调性
        is_mono, mono_msg = is_monotonic(expression, x_range)
        if not is_mono:
            logger.warning(f"函数不单调: {mono_msg}")
            return {
                'success': False,
                'message': mono_msg
            }
        
        # 进行插值拟合
        f_coeffs, g_coeffs, error_msg, expressions = interpolate_curve(expression, x_range, degree=degree)
        if error_msg:
            logger.warning(f"拟合失败: {error_msg}")
            return {
                'success': False,
                'message': error_msg
            }
        
        # 检查拟合函数是否单调递减
        if not check_fitted_monotonicity(f_coeffs, x_range):
            logger.warning("拟合后的函数不是单调递减的")
            return {
                'success': False,
                'message': "拟合后的函数在区间内不是单调递减函数"
            }
        
        # 返回结果
        result = {
            'success': True,
            'data': {
                'length': len(f_coeffs),
                'f_coefficients': f_coeffs.tolist(),
                'g_coefficients': g_coeffs.tolist(),
                'range': x_range,
                'expressions': expressions
            }
        }
        
        logger.info("拟合成功")
        return result
        
    except Exception as e:
        logger.error(f"求解曲线时出错: {str(e)}", exc_info=True)
        return {
            'success': False,
            'message': str(e)
        } 