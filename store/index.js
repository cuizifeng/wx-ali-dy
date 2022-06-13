import Vue from 'vue'
import Vuex from 'vuex'

import yb from './modules/yb'
Vue.use(Vuex)
const store = new Vuex.Store({
    ...yb
    // modules: {
    //     yb,
        
    // },
})

export default store