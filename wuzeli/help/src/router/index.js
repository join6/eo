import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Search from '../components/Search'
import APIStudio from "../components/APIStudio"
import Question from "../components/Question"
import Answer from "../components/Answer"
import Course from "../components/Course"
import Article from "../components/Article"
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      // redirect:'/search/result/0',
      component: Search,
      children:[
        {
          path:'result/:i',
          name:'result',
          component:APIStudio
        },
      ],
    },
    {
      path:'/question',
      name:'question',
      component:Question
    },
    {
      path:'/course',
      component:Course,
      name:"course",
      children:[
        {
          path:'article/:articleId',
          name:'article',
          component:Article
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  
})
