import fs from 'node:fs'

logger.info(`---------=.=---------`)
logger.info(`随机超能力插件载入中`)
let ret = []

const files = fs
  .readdirSync('./plugins/Special-ability/apps')
  .filter((file) => file.endsWith('.js'))

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}

logger.info(`随机超能力插件载入成功^_^`)
logger.info(`作者-xiaotian2333`)
logger.info(`---------------------`)
export { apps }