import { mapMenu } from '../../router'
 
const user = {
  state: {
    menus: mapMenu
  }
}
export default user

const getters = {
    menus: state => state.user.menus,
    barEffect: state => state.app.barEffect
  }
   
  export default getters

  const app = {
    state: {
      barEffect: {
        open: true
      }
    },
    mutations: {
      TOGGLE_BAREFFECT: state => {              //建议用大写加下划线定义mutations的方法
        state.barEffect.open = !state.barEffect.open
      }
    },
    actions: {
      ToggleBarEffect: ({ commit }) => {
        commit('TOGGLE_BAREFFECT')    //触发mutations中的TOGGLE_BAREFFECT
      }
    }
  }
  