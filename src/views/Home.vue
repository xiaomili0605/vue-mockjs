<template>
  <div class="home">
    <div>
      <button @click="getList">1.get方式请求无传参</button>
    </div>
    <br/>
    <div>
      <button @click="getTypeList(2)">2.get方式请求query传参</button>
    </div>
    <br/>
    <div>
      <button @click="getParamsList(2)">3.get方式请求params传参</button>
    </div>
    <br/>
    <div>
      <button @click="postList">4. post方式请求有传参</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      goodslist: []
    }
  },
  methods: {
    // 1 发送get请求无传参
    async getList() {
      const res = await axios.get('/api/goodslist')
      this.goodslist = res.data.data
      console.log(this.goodslist)
    },
    // 2 发送get请求query传参
    async getTypeList(id) {
      const res = await axios.get(`/api/getgoods/${id}`)
      console.log(res.data)
    },
    // 3 发送get请求params传参
    async getParamsList() {
      const res = await axios.get('/api/test', { params: { ID: 12345 } })
      console.log(res.data)
    },
    // 4 发送post请求有传参
    async postList() {
      const data = {
        name: '小红',
        age: 18
      }
      const res = await axios.post('/api/addgoods', data)
      console.log(res)
    }
  },
  components: {}
}
</script>
