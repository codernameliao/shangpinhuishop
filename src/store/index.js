import Vuex from 'vuex'
import Vue from 'vue'
import home from '@/store/home/index.js'
import search from '@/store/search/index.js'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'
import user from '@/store/user'
import trade from '@/store/trade'

Vue.use(Vuex)



//对外暴露store的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }

})