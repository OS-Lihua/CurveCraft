# 曲线求解服务器

这是一个基于 Flask 的服务器，用于处理曲线拟合和求解任务。

## 功能

- 接受函数表达式和取值范围
- 检查函数在第一象限内是否单调
- 进行多项式拟合
- 检查拟合后的函数是否单调递减
- 返回拟合系数和表达式

## 环境设置

1. 确保已安装 Python 3.8+
2. 安装依赖：

```bash
pip install -r requirements.txt
```

## 运行服务器

```bash
# 开发环境
python app.py

# 生产环境
gunicorn -w 4 app:app -b 0.0.0.0:5000
```

服务器将在 http://localhost:5000 上运行。

## API 接口

### 求解曲线

- URL: `/api/solve-curve`
- 方法: `POST`
- 请求体:

```json
{
  "expression": "x*y-1",
  "range": [0.1, 10]
}
```

- 成功响应:

```json
{
  "success": true,
  "data": {
    "length": 11,
    "f_coefficients": [...],
    "g_coefficients": [...],
    "range": [0.1, 10],
    "expressions": {
      "f_expr": "y = ...",
      "g_expr": "x = ..."
    }
  }
}
```

- 失败响应:

```json
{
  "success": false,
  "message": "错误信息"
}
```

## 运行健康检查

可以通过访问 `/health` 端点来检查服务器是否正常运行。

## 注意事项

- 服务器默认监听所有接口 (0.0.0.0)，端口为 5000
- 为安全起见，生产环境应该设置适当的防火墙规则
- 支持处理的表达式格式包括：显式函数 (y=f(x))、隐函数 (F(x,y)=0) 等 