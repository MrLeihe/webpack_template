const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('babel-types')
/**
 * 去除 console 打印
 */
module.exports = function (source) {
    const ast = parser.parse(source, { sourceType: 'module' })
    traverse(ast, {
        CallExpression(path) {
            if (types.isMemberExpression(path.node.callee) && types.isIdentifier(path.node.callee.object, { name: 'console' })) {
                path.remove()
            }
        }
    })
    const output = generator(ast, {}, source)
    return output.code
}