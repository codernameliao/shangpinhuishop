//统一管理项目全部接口的文件
//获取真实服务器的接口的数据利用当前axios
import requests from "@/api/request.js";
import mockRequests from "./mockAjax.js";
// 基础网址http://gmall-h5-api.atguigu.cn
// 三级联动接口/api/product/getBaseCategoryList，方式为get，参数为无
//当前模块，API进行统一管理，即对请求接口统一管理


//首页三级分类接口
export const reqCateGoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    })
};


// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });
//搜索产品的接口[真实的接口]
//URL:/api/list   method:post    参数：需要携带
//这个接口【携带参数：最多十个，十个属性可以传递，也可以不传递，但是至少给给服务器携带一个空对象】
export const reqSearchList = (params) => requests({ url: "/list", method: 'post', data: params });
//获取产品详情的接口  /api/item/{skuId}  get
// export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
//添加到购物车(对已有 物品进行数量 改动)
///api/cart/addToCart/{ skuId }/{ skuNum }  post

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//获取购物车的数据
///api/cart/cartList   get 
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: 'get' });
//删除购物车某一个产品的接口
///api/cart/deleteCart/{skuId}  delete 
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改某一个产品的选中状态接口
//api/cart/checkCart/{skuId}/{isChecked}  get 
//需要注意：从文档拷贝过来路径skuId小写的
export const reqUpdateCartChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });


//用户获取到验证码的接口
///api/user/passport/sendCode/{phone}  get 
export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册用户接口
//api/user/passport/register  post  phone code password
export const reqRegister = (phone, code, password) => requests({ url: `/user/passport/register`, method: 'post', data: { phone, code, password } });

//登录接口
///api/user/passport/login  post phone password
export const reqLogin = (phone, password) => requests({ url: `/user/passport/login`, method: 'post', data: { phone, password } });

//获取用户信息的接口
//api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });

//退出登录的接口【通知服务器销毁当前token身份】
///api/user/passport/logout  get 
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });

//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//获取支付信息
///api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//判断用户是否支付成功
///api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });