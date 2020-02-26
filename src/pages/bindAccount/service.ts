import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 查看天气
export async function getWeather(params = {}) {
  return request(`${BASE_URL}households/home/getWeather`, params, 'GET')
}

// 查看扣费明细
export async function getConsumptionDetails(params = {}) {
  return request(`${BASE_URL}households/finance/getConsumptionDetails`, params, 'GET')
}

// 首页总览
export async function overview(params = {}) {
  return request(`${BASE_URL}households/finance/Overview`, params, 'GET')
}

// 获取账户列表
export async function getList(params = {}) {
  return request(`${BASE_URL}households/accounts/list`, params, 'GET')
}

// 创建充值订单
export async function createRechargeOrder(params = {}) {
  return request(`${BASE_URL}households/finance/createRechargeOrder`, params, 'POST')
}
