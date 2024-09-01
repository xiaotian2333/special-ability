// 插件作者 xiaotian2333
// 开源地址 https://github.com/xiaotian2333/special-ability
// 原插件将不在维护：https://github.com/xiaotian2333/yunzai-plugins-Single-file/blob/main/%E9%9A%8F%E6%9C%BA%E8%B6%85%E8%83%BD%E5%8A%9B.js
// 欢迎投稿超能力列表，前往 https://github.com/xiaotian2333/special-ability 查看要求
import cfginit from "../lib/cfginit.js"
import getlist from "../lib/getlist.js"
import cfg from "../lib/cfg.js"

// 初始化配置文件
cfginit.initConfig()

// 读取能力列表
let cnl_list = await getlist.url(cfg.getConfig().cnl.url)
let fzy_list = await getlist.url(cfg.getConfig().fzy.url)
// 当pro标识开启时并入pro列表
if (cfg.getConfig().pro) {
    cnl_list.push(...await getlist.url(cfg.getConfig().cnl.pro))
    fzy_list.push(...await getlist.url(cfg.getConfig().fzy.pro))
}
// 当本地标识开启时并入本地列表
if (cfg.getConfig().local) {
    cnl_list.push(...await getlist.file(cfg.getConfig().cnl.file))
    fzy_list.push(...await getlist.file(cfg.getConfig().fzy.file))
}

export class nb extends plugin {
    constructor() {
        super({
            name: '随机超能力',
            dsc: '获取一个超能力及对应的副作用',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: "^#?超能力$",
                    fnc: 'nb'
                }
            ]
        })
    }

    async nb(e) {
        // 随机选择一行  
        const cnl = cnl_list[Math.floor(Math.random() * cnl_list.length)]
        const fzy = fzy_list[Math.floor(Math.random() * fzy_list.length)]
        e.reply(`你的超能力是：\n${cnl}\n但是：\n${fzy}`, true)
        return true
    }
}