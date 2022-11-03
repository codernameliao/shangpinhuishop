//引入接口函数
import { reqSearchList } from '@/api/index.js';
const state = {
    //存储搜索模块的数据
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};

//actions:可以处理dispatch派发action地方，这里可以书写你的业务逻辑：for、if、异步语句等等
const actions = {
    //获取搜索页面的数据
    async getSearchList({ commit }, params = {}) {
        //注意:获取搜索页面的数据（请求接口），至少携带一个空对象才能获取数据
        let result = await reqSearchList(params);

        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    },
};
// 为了简化数据而生，getter的state是当前创库，而非大仓库
const getters = {
    // 搜索模块【商品展示的数据】
    //state：它是当前小仓库（search）的state数据，没有home仓库中的state
    //只是当前仓库的state
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    //品牌数据
    tradeMarkList(state) {
        return state.searchList.trademarkList;
    },
    //平台属性
    attrsList() {
        return state.searchList.attrsList;
    },
};


//对外暴露store的一个实例
export default ({
    state,
    mutations,
    actions,
    getters,

})