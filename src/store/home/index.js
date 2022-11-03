import { reqCateGoryList, reqGetBannerList, reqFloorList } from "@/api/index.js";
const state = {
    categoryList: [],
    //bannerList：存储首页的轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
const actions = {
    async categoryList({ commit }) {
        let result = await reqCateGoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页banner的数据【轮播图】
    async getBannerList({ commit }) {
        //服务器返回banner数据--->存储于vuex当中
        let result = await reqGetBannerList();
        // console.log(result)
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data);
        }
    },

};
const getters = {};


//对外暴露store的一个实例
export default {
    state,
    mutations,
    actions,
    getters,

}