import fs from 'fs'

/**
 * 获取网络列表，返回一个数组
 * @param url 资源列表链接
 */
async function url(url) {
    let result = await fetch(url, {
        headers: {
            'User-Agent': 'Special-ability(author by xiaotian2333) github(https://github.com/xiaotian2333/yunzai-plugins-Single-file)'
        }
    })
    result = await result.text()
    return result.split(/\r?\n/)
}

/** 
 * 获取本地列表，返回一个数组
 * @param filePath 本地文件路径
*/
async function file(filePath) {
    try {
        let data = fs.readFileSync(filePath, 'utf8')
        data = data.split(/\r?\n/)
        data = data.filter(line => line.trim() !== '')
        return data
    } catch (err) {
        logger.error('[随机超能力]读取文件时发生错误：', err)
    }
}

// 导出函数
export default {
    url,
    file
}