import request from '@/utils/request.js';
import { BASE_URL } from '@/config/query';

// 查看充值记录
export async function getTransactionFlow(params = {}) {
  return request(`${BASE_URL}households/finance/getTransactionFlow`, params, 'GET')
}
