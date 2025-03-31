from flask import Flask, request, jsonify
from curve_solver.solver import solve_curve
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route('/api/solve-curve', methods=['POST'])
def api_solve_curve():
    try:
        # 获取请求数据
        data = request.json
        logger.info(f"收到请求: {data}")
        
        if not data or 'expression' not in data:
            return jsonify({'success': False, 'message': '请提供函数表达式'}), 400
        
        # 处理请求数据
        expression = data.get('expression', '')
        range_data = data.get('range', [0.1, 10])
        
        # 调用求解函数
        result = solve_curve(expression, range_data)
        
        # 返回结果
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"处理请求时出错: {str(e)}", exc_info=True)
        return jsonify({'success': False, 'message': f"服务器错误: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

# 允许跨域请求的设置
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return response

if __name__ == '__main__':
    logger.info("启动曲线求解服务器...")
    app.run(host='0.0.0.0', port=5000, debug=True) 