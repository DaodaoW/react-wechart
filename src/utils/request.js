import axios from 'axios';
import router from 'umi/router';
import { message } from 'antd';

function setUrl(params) {
  let datas = '';
  Object.entries(params).map((item) => {
    if(item[1]) {
      datas = `${datas}${item[0]}=${item[1]}&`
    }
    return datas
  })
  return datas
}

function error(res) {
  const status = res.status;
  if(status === 401) {
    router.push('/userLogin');
    message.warning('尚未登录');
  } else if(status === 500) {
    message.error(res.error);
  }else {
    message.error('网络错误');
  }
}

export default function fetch(url, param = {}, mtd) {
  let config = {      
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    credentials: 'include'
  };
  if(mtd === 'GET'){
    let payload = setUrl(param);
    config = {
      ...config,
      method: 'GET',
      url: `${url}?${payload}`
    }
  }
  if(mtd === 'POST') {
    // param = JSON.stringify(param);
    config = {
      ...config,
      method: 'POST',
      url: url,
      data: param
    }
  }
  
  return axios(config).then(res => {
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data);
  }).then(res => {
    if (res.status === 200) return res;
    error(res);
  })
  .catch (e => {
    error(e);
  })
}