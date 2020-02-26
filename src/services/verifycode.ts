import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 获取验证码
export async function sendVCode(params = {}) {
  return request(`${BASE_URL}authc/households/sendVCode`, params, 'POST')
}
