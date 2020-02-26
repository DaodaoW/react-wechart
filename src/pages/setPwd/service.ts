import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 设置新密码
export async function setPassword(params = {}) {
  return request(`${BASE_URL}authc/households/setPassword`, params, 'POST')
}
