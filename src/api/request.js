import axios from "axios";
//进度条
import nprogress from 'nprogress';
//因为进度条样式咱们没有引入
import "nprogress/nprogress.css";
// 在当前模块引入仓库
import store from '@/store/index'
//1、对axios二次封装
const requests = axios.create({
        //基础路径，requests发出的请求在端口号后面会跟改baseURl
        baseURL: '/api',
        timeout: 5000,
    })
    //2、配置请求拦截器,在发请求之前可以检测到，可以干一些事情
requests.interceptors.request.use(config => {
        if (store.state.detail.uuid_token) {
            //通过上行请求的请求头，把用户临时身份带给服务器
            //请求头添加的属性名字不能瞎写，因为已经和后台人员商量好了
            //如果不叫做userTempid字段，服务器获取不到
            //config配置对象，这里面有请求头
            //config，请求拦截器的一个配置对象
            //请求头的这个属性token，和后台老师商量好的了，不能叫做别的名字
            config.headers.userTempId = store.state.detail.uuid_token;
        }
        //用户身份token
        if (store.state.user.token) {
            //请求头的这个属性token，和后台老师商量好的了，不能叫做别的名字
            config.headers.token = store.state.user.token;
        }
        //检测到程序发请求，请求拦截器可以检测到，进度条开始动
        nprogress.start();
        //config内主要是对请求头Header配置
        //比如添加token

        return config;
    })
    //3、配置相应拦截器
requests.interceptors.response.use((res) => {
        //成功的回调函数
        //服务器数据返回进度条结束
        nprogress.done();
        return res.data;
    }, (error) => {
        //失败的回调函数
        console.log("响应失败" + error)
        return Promise.reject(new Error('fail'))
    })
    //4、对外暴露
export default requests;