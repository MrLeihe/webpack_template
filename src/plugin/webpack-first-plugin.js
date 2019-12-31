class FirstPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        // 计算打包后文件大小
        compiler.plugin('emit', (compilation, callback) => {
            let str = ''
            for (let filename in compilation.assets) {
                str += `文件：${filename}  大小${compilation.assets[filename]['size']()}B\n`
            }
            compilation.assets['fileSize.md'] = {
                source: () => {
                    return str
                },
                size: () => {
                    return str.length
                }
            }
            callback()
        })
    }
}

module.exports = FirstPlugin