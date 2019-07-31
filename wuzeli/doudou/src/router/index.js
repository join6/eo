import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'
import page1 from '@/detailspage/page1'
import page2 from '@/detailspage/page2'
import page3 from '@/detailspage/page3'
import page4 from '@/detailspage/page4'
import Login from '../denglu/Login'
import Register from '../denglu/Register'
import Forget from '../denglu/Forget'


Vue.use(Router)

export default new Router({
  mode:"history",//该模式下没有 # 前缀，而且可以使用 pushState 和 replaceState 来管理记录。
  routes: [
    {
      path:'/',
      redirect:'/layout',
      component:Layout,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/login',
      name:"login",
      component:Login,      
    },
    {
      path:'/register',
      name:"register",
      component:Register,  
    },
    {
      path:'/forget',
      name:"forget",
      component:Forget,
    },
    {
      path:"/details/level1/:name",
      component:page1,
      meta:{
        requireAuth:true
      },
    },
    {
      path:"/details/level2/:name",
      component:page2,
      meta:{
        requireAuth:true
      }
    },
    {
      path:"/details/level3/:name",
      component:page3,
      meta:{
        requireAuth:true
      }
    },
    {
      path:"/details/level4/:name",
      component:page4,
      meta:{
        requireAuth:true
      }
    }



  ]
})





//路由嵌套
// {
//   path:'/about',           //一级路由
//   component:About,
//   children:[          
//     {                      //二级路由
//       path:'/',            //二级的默认路由（此path指向上一级，即path:'/about'）
//       name:'expressLink',        
//       component:Express      
//     },
//    
//     {
//       path:'/about/contact',
//       name:'contactLink',
//       component:Contact,
//       children:[            
//         {                                     //三级路由
//           path:'/about/contact/personName',
//           name:'personNameLink',
//           component:PersonName,
//         },
//         {
//           path:'/about/contact/phone',
//           name:'phoneLink',
//           component:Phone
//         },

//       ]
//     }
//   ]
// }