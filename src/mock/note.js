// 1 在 main.js 中导入 mock 的 index 这样全局都可以使用
// import './mock/index'

// 2 导入 模拟假数据的包，按需导入Random
import Mock, { Random } from 'mockjs'

// 通过 Mock.mock() 来模拟API接口
// 函数return Mock.mock()才会造假数据，直接return对象时这种name: '@cword(2, 5)'写法不会生效
// 双层Mock.mock，外层是拦截ajax，里层是模拟假数据
// 建议写成正则函数这种，这样可以通过option可以查看query,params,post传递参数情况
// 注意：如果没有合适的随机数据，可以创建自定义 Mock 函数，随机返回其中一个值

// 1 get 
Mock.mock('/api/goodslist', 'get', {
    status: 200,
    message: '获取商品列表成功！',
    // 'data|5生成5条数据，'data|1-5'随机生成1-5条数据
    'data|1-5': [
        {
            // Random.increment(1) 随机生成一个全局的自增整数。整数自增的步长。默认值为 1。
            // 简写'@increment(1)'，在函数中不能使用简写
            id: '@increment(1)',
            // @cword()随机生成1个函数，@cword(2, 8)随机生成2-8个汉字, @cword(2)随机生成2个汉字
            name: '@cword(2, 5)',
            // @natural(2, 10) 随机生成数据 价格 都可以
            price: '@natural(2, 10)',
            count: '@natural(100, 999)',
            // @dataImage()生成一段随机的 Base64 图片编码，宽高1000x300，建议使用Base64，比image稳定
            img: '@dataImage("1000x300")'
        }
    ]
})

// 2 get 有 query 传参时使用正则，只要包含'/api/getgoods'就会成功
// 发送请求是可以写成 axios.get('/api/getgoods/${id}')
Mock.mock(/\/api\/getgoods/, 'get', function (option) {
    // 查看传参
    console.log(option)
    return Mock.mock({
        // 响应数据
        data: {
            id: 9,
            name: '@fruit()',
            price: 2,
            count: 199,
            img: '@dataImage("78x78")'
        },
        status: 200,
        message: '获取商品成功！'
    })
})

// 3 get 有 params 传参时使用正则
// 发送请求是可以写成 axios.get('/api/getgoods/', { params: { ID: 12345 }})
Mock.mock(/\/api\/test/, 'get', function (option) {
    // 查看传参
    console.log(option)
    return Mock.mock({
        // 响应数据
        data: {
            id: 10,
            name: '香蕉',
            price: 12,
            count: 299,
            img: '@dataImage("78x78")'
        },
        status: 200,
        message: '获取商品成功！'
    })
})


// 4 post，函数return Mock.mock()才会造假数据，直接return对象时这种name: '@cword(2, 5)'写法不会生效
Mock.mock('/api/addgoods', 'post', function (option) {
    // 这里的option中可以查看发送post请求传过来的参数，参数是否传递成功
    console.log(option)
    return Mock.mock({
        // 响应数据
        status: 200,
        message: '商品添加成功！',
        name: '@cword(2, 5)',
        // 'id|+1': 0, 这种写法也是在模拟一个自增长的id值
        id: '@increment(1)'
    })
})



// 5 创建自定义 Mock 函数，随机返回其中一个值，'@fruit()'直接使用即可
Random.extend({
    // 自定义函数名称：function 函数
    'fruit': function() {
      const arr = ['榴莲','菠萝蜜','椰子','苹果','菠萝']
      return this.pick(arr)
    }
  })
  