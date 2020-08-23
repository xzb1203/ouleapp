import axios from 'axios';
// const IP = 'http://127.0.0.1:5000'
const IP = 'http://172.16.15.186:5000'
// 请求基本路径 
axios.defaults.baseURL = IP
//获取商品数据
export const shopData = ()=>axios.get('/goods/goods_list',{params:{}})
//获取商家
export const seller = ()=>axios.get('/shop/seller',{params:{}})
//获取评价数据
export const ratings = ()=>axios.get('/shop/ratings',{params:{}})
