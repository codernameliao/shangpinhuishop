//Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue, options) {
        //全局指令
        // vue.prototype.$bus
        // vue.component....有点忘了
        Vue.directive(options.name, (element, params) => {
            element.innerHTML = params.value.toUpperCase();
            console.log(params);
        });

    }
    //对外暴露组件对象
export default myPlugins;