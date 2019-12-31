const babel = require('@babel/core')
const types = require('babel-types')

const code = `class Person {
    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}`

const visitor = {
    ClassDeclaration(path) {
        const node = path.node // 当前节点
        const id = node.id // 节点id
        const methods = node.body.body  // 方法数组
        let constructorFunction = null // 构造方法
        let functions = [] // 目标方法

        methods.forEach(method => {
            if (method.kind === 'constructor') {
                console.log('method', method.params)
                constructorFunction = types.functionDeclaration(id, method.params, method.body, false, false)
                functions.push(constructorFunction)
            } else {
                const memberExpression = types.memberExpression(types.memberExpression(id, types.identifier('prototype'), false), method.key, false)
                const functionExpression = types.functionExpression(null, method.params, method.body, false, false);
                const assignmentExpression = types.assignmentExpression('=', memberExpression, functionExpression);
                functions.push(types.expressionStatement(assignmentExpression))
            }
        })

        if (functions.length === 1) {
            path.replaceWith(functions[0])
        } else {
            path.replaceWithMultiple(functions)
        }
    }
}

const result = babel.transform(code, {
    plugins: [{
        visitor
    }]
})

console.log('result', result)


