import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 获取账户列表
export async function getList(params = {}) {
  return request(`${BASE_URL}households/accounts/list`, params, 'GET')
}

// 切换缴费账户
export async function switchAccount(params = {}) {
  return request(`${BASE_URL}households/accounts/switch`, params, 'POST')
}