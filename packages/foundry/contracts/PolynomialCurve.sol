//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";



contract PolynomialCurve {
    // 定义自定义错误
    error InputOutOfRange();
    error ResultMustBeNonNegative();
    // y = f(x) 系数
    int256[] public factorX;
    // x = g(y) 系数
    int256[] public factorY;
    // x 定价区间
    int256 public mX;
    int256 public nX;
    // y 定价区间
    int256 public mY;
    int256 public nY;
    uint256 public PRECISION = 10 ** 18;

    mapping(address => mapping(int256 => mapping(int256 => int256))) public onwerCurve;


    constructor(){
    }


    function setCurveParams(int256[] memory _factorX, int256[] memory _factorY, 
                int256 _mX, int256 _nX, int256 _mY, int256 _nY) public {
        factorX = _factorX;
        factorY = _factorY;
        mX = _mX;
        nX = _nX;
        mY = _mY;
        nY = _nY;
    }

    // x = g(y)
    function getLiquidityOfX(uint256 _inputY) public view returns (uint256) {
        if(!(_inputY >= uint256(mY) && _inputY <= uint256(nY))) {
            revert InputOutOfRange();
        }
        int256 Lx = 0;
        for (uint256 i = 0; i < factorY.length; i++) {
            if (i == 0) {
                Lx += factorY[i];
            } else {
                if (factorY[i] != 0) {
                    int256 term = factorY[i];
                    for (uint256 j = 0; j < i; j++) {
                        term = term * int256(_inputY) / int256(PRECISION);
                    }
                    Lx += term;
                }
            }
        }
        if(!(Lx >= 0)) {
            revert ResultMustBeNonNegative();
        }
        return uint256(Lx);
    }

    // 计算 y 变化时，x 的变化量
    function getDeltaOfX(uint256 _inputYOrigin, uint256 _inputYTarget) public view returns (uint256) {
        uint256 delta = getLiquidityOfX(_inputYTarget) - getLiquidityOfX(_inputYOrigin);
        if(delta < 0) {
            revert ResultMustBeNonNegative();
        }
        return delta;
    }

    // y = f(x) 
    function getLiquidityOfY(uint256 _inputX) public view returns (uint256) {
        if(!(_inputX >= uint256(mX) && _inputX <= uint256(nX))) {
            revert InputOutOfRange();
        }
        int256 Ly = 0;
        for (uint256 i = 0; i < factorX.length; i++) {
            if (i == 0) {
                Ly += factorX[i];
            } else {
                if (factorX[i] != 0) {
                    int256 term = factorX[i];
                    for (uint256 j = 0; j < i; j++) {
                        term = term * int256(_inputX) / int256(PRECISION);
                    }
                    Ly += int256(term);
                }
            }
        }
        if(!(Ly >= 0)) {
            revert ResultMustBeNonNegative();
        }
        return uint256(Ly);
    }

    // y = f(x) 
    function getDeltaOfY(uint256 _inputXOrigin, uint256 _inputXTarget) public view returns (uint256) {
        uint256 delta = getLiquidityOfY(_inputXTarget) - getLiquidityOfY(_inputXOrigin);
        if(delta < 0) {
            revert ResultMustBeNonNegative();
        }
        return delta;
    }
}
