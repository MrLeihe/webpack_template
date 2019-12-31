const babel = require('@babel/core')
const types = require('babel-types')

// 箭头函数转普通函数 const num = function(a, b) { return a + b }
const code = `const num = (a, b) => a + b`

const visitor = {
    ArrowFunctionExpression(path) {
        let params = path.node.params
        const blockStatement = types.blockStatement([
            types.returnStatement(path.node.body)
        ])
        const func = types.functionExpression(null, params, blockStatement, false, false)
        console.log('func', func)
        path.replaceWith(func)
    }
}

// transform 方法转换 code
const result = babel.transform(code, {
    plugins: [
        {
            visitor
        }
    ]
})

console.log('result', result.code)
