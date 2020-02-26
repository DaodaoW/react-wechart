import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 检测手机号是否存在
export async function checkPhoneRegister(params = {}) {
  return request(`${BASE_URL}authc/households/checkPhoneRegister`, params, 'GET')
}