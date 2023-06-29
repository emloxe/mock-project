import axios from 'axios';

import {  message } from 'antd';


export const service = axios.create({
  baseURL: 'http://127.0.0.1:3006/api/v1',
  timeout: 50000,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data;
    // 要根据success的成功与否决定下面的操作
    if (code === 0) {
      return response.data;
    } else {
      // 业务错误
      message.error(msg); // 提示错误消息
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.msg) {
      message.error(error.response.data.msg);
    } else {
      message.error('接口出错');
    }
    return Promise.reject(error);
  }
);


export const getGroupApi = (params) => service.get('/mockGroup/list',  params);
export const addGroupApi = (params) => service.post('/mockGroup/add',  params);
export const deleteGroupApi = (params) => service.delete('/mockGroup/delete/one',{data: params}  );


export const getListApi = (params) => service.get('/mockList/list', {params: params});
export const addListApi = (params) => service.post('/mockList/add',  params);
export const updateListApi = (params) => service.put('/mockList/update',  params);
export const deleteListApi = (params) => service.delete('/mockList/delete',  {data: params});

