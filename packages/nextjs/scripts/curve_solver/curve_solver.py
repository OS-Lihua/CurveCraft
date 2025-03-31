import json
import sys

def parse_expression(expr_str: str) -> str:
    """将 Desmos 格式的表达式转换为 Python 可处理的表达式"""
    # 替换基本运算符
    expr_str = expr_str.replace('×', '*')
    expr_str = expr_str.replace('÷', '/')
    expr_str = expr_str.replace('^', '**')
    
    # 处理根号
    expr_str = expr_str.replace('√', 'sqrt')
    
    # 替换三角函数
    expr_str = expr_str.replace('sin', 'math.sin')
    expr_str = expr_str.replace('cos', 'math.cos')
    expr_str = expr_str.replace('tan', 'math.tan')
    
    # 替换对数函数
    expr_str = expr_str.replace('ln', 'math.log')
    expr_str = expr_str.replace('log', 'math.log10')
    
    # 替换常数
    expr_str = expr_str.replace('pi', 'math.pi')
    expr_str = expr_str.replace('e', 'math.e')
    
    # 处理等式
    if '=' in expr_str:
        left, right = expr_str.split('=')
        expr_str = f"({left})-({right})"
    
    return expr_str

if __name__ == "__main__":
    try:
        # 从标准输入读取JSON数据
        input_str = sys.stdin.read()
        print(input_str)
        input_data = json.loads(input_str)
        print(input_data)
        
        # 获取表达式和范围
        expression = input_data.get('expression', '')
        range_data = input_data.get('range', [0.1, 10])
        
        # 转换表达式
        python_expr = parse_expression(expression)
        
        # 返回结果
        result = {
            'success': True,
            'data': {
                'original': expression,
                'converted': python_expr,
                'range': range_data
            }
        }
        
        print(json.dumps(result))
        
    except json.JSONDecodeError:
        print(json.dumps({
            'success': False,
            'message': '无效的JSON输入'
        }))
    except Exception as e:
        print(json.dumps({
            'success': False,
            'message': f'处理出错: {str(e)}'
        }))
