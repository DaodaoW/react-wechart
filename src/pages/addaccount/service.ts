import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 绑定缴费账号
export async function bandingUser(params = {}) {
  return request(`${BASE_URL}households/accounts/bandingUser`, params, 'POST')
}
