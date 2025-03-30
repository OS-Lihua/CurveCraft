import { NextResponse } from "next/server";
import solc from "solc";

export async function POST(request: Request) {
  try {
    const { sourceCode } = await request.json();

    // Prepare input for solc compiler
    const input = {
      language: "Solidity",
      sources: {
        "Contract.sol": {
          content: sourceCode,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    // Compile the contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // Check for errors
    if (output.errors?.some((error: any) => error.severity === "error")) {
      return NextResponse.json({ error: "Compilation failed", details: output.errors }, { status: 400 });
    }

    // Get the contract
    const contractName = Object.keys(output.contracts["Contract.sol"])[0];
    const contract = output.contracts["Contract.sol"][contractName];

    return NextResponse.json({
      abi: contract.abi,
      bytecode: contract.evm.bytecode.object,
    });
  } catch (error) {
    console.error("Compilation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
