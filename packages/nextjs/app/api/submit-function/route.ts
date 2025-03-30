import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { functionExpression } = body;

    if (!functionExpression) {
      return NextResponse.json({ success: false, message: "缺少函数表达式" }, { status: 400 });
    }

    console.log("接收到函数表达式:", functionExpression);

    // 此处可以添加实际处理函数表达式的逻辑
    // 例如：保存到数据库、生成合约代码等

    return NextResponse.json({
      success: true,
      message: "函数表达式已接收",
      data: {
        functionExpression,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("处理函数表达式时出错:", error);
    return NextResponse.json({ success: false, message: "处理函数表达式时出错" }, { status: 500 });
  }
}
