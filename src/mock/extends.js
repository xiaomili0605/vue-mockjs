//按需导入
import { Random } from 'mockjs'


// 创建自定义 Mock 函数，随机返回其中一个值，'@fruit()'直接使用即可
Random.extend({
    // 自定义函数名称：function 函数
    'fruit': function() {
      const arr = ['榴莲','菠萝蜜','椰子','苹果','菠萝']
      return this.pick(arr)
    }
    // 其他自定义函数继续往下写即可
  })
  