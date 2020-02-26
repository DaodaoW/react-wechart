import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 支付订单
export async function unifiedOrder(params = {}) {
  return request(`${BASE_URL}authc/order/unifiedOrder`, params, 'POST')
}
