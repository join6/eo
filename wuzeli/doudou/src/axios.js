// import axios from 'axios'
// import store from '../store'
//  import { Loading, Message } from 'element-ui'

//  // 超时时间
//  axios.defaults.timeout = 5000
//  // axios请求拦截器
//  var loadinginstace
//  axios.interceptors.request.use(config => {
//    // element ui Loading方法
//     loadinginstace = Loading.service({ fullscreen: true })
//    return config
//  }, error => {
//    loadinginstace.close()
//    Message.error({
//      message: '加载超时'
//    })
//    return Promise.reject(error)
// })
//  // axios响应拦截器
//  axios.interceptors.response.use(data => {// 响应成功关闭loading
//    loadinginstace.close()
//    return data
//  }, error => {
//    loadinginstace.close()
//    Message.error({
//      message: '加载失败'
//    })
//    return Promise.reject(error)
//  })

axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个axios header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
 
// axios response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         name: 'login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//          return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     });



export default axios