import axios from 'axios'
import Vue from 'Vue'
// import cookieparser from 'cookieparser'
// import Cookies from 'js-cookie'
Vue.prototype.$axios = axios

// create an axios instance
const service = axios.create({
    baseURL: process.env.baseUrl, // api的base_url
    timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
      // debugger
      // Do something before request is sent
    //   if (store.getters.token) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['X-Token'] = '2333'
        // config.headers['dubbo-tag'] = 'wulian'
    //   }
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
)
// respone interceptor
service.interceptors.response.use(
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
      const res = response.data
      res.ok = res.ok === 'false' || !res.ok
      if (res.code !== '200') {
        // 未登录res.code === '-1' ||
        if (res.code === 401) {
          var msg = '你已被退出，请重新登录'
          console.log(msg)
        } else {
          if (res.msg) {
            console.log('error', msg)
          }
        }
        // return Promise.reject('error')
        return res
      } else {
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      if (error.msg) {
        console.log('error', error.msg)
      } else {
        console.log('error', error.msg)
      }
      return Promise.reject(error)
    }
  )

// // token
// export function getToken (req, key) {
//     if (req && req.headers.cookie) {
//         var parsed = cookieparser.parse(req.headers.cookie)
//         if (key) {
//             return parsed[key]
//         } else {
//             return ''
//         }
//     } else {
//         return Cookies.get(key)
//     }
// }

// export function setToken (token, time) {
//     if (token) {
//         // Cookies.set('Authorization', token, { expires: time })
//     }
//     return true
// }

// // axios 配置
// axios.defaults.timeout = 15000
// axios.defaults.withCredentials = true
// // axios.defaults.headers.post['Content-Type'] = 'application/json'
// // POST传参序列化
// axios.interceptors.request.use((config) => {
//     console.log('process.browser', process.browser)
//     if (process.browser) {
//         const sessionid = getToken()
//         if (sessionid) {
//             // config.headers.Authorization = sessionid
//         }
//     } else {
//         // 解决本地 node服务端调用接口 默认域名问题
//         console.log('本地node服务')
//     }
//     return config
// }, (error) => {
//     return Promise.reject(error)
// })

// // 返回状态判断
// axios.interceptors.response.use((response) => {
//     if (response.status === 200) {
//         const res = response.data
//         // 状态码验证
//         if (res.code === '300' && process.browser) {
//             // console.log($nuxt.$store,'$nuxt.context')
//             // 踢回登陆
//             window.location.href = 'v2ray.wyap.ml'
//         } else {
//             return response
//         }
//     } else {
//         // return Promise.reject(response)
//     }
//     return response
// }, (error) => {
//     return Promise.reject(error)
// })

// export function fetch (url, data, isGet) {
//     return new Promise((resolve, reject) => {
//         if (isGet && isGet === true) {
//             axios.get(url, data)
//                 .then(res => {
//                     if (process.server) { }
//                     resolve(res.data)
//                 })
//                 .catch((error) => {
//                     reject(error)
//                 })
//         } else {
//             // 发送 POST 请求
//             axios({
//                 method: 'post',
//                 url: url,
//                 data: {
//                     firstName: 'Fred',
//                     lastName: 'Flintstone'
//                 }
//             }).then(res => {
//                 if (process.server) { }
//                 resolve(res.data)
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//             // const data23 = JSON.stringify(data)
//             // axios.post(url, {
//             //     firstName: 'Fred',
//             //     lastName: 'Flintstone'
//             //   })
//             //     .then(res => {
//             //         if (process.server) { }
//             //         resolve(res.data)
//             //     })
//             //     .catch((error) => {
//             //         reject(error)
//             //     })
//         }
//     })
// }
export default service
