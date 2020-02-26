import { sendVCode } from '@/services/verifycode.ts';
import { message } from 'antd';

export default {

  namespace: 'verifycode',

  state: {
  },

  effects: {
    *sendVCode({payload} : any, { call }: any) {
      const response = yield call(sendVCode, payload);
      message.success(response.message);
    }
  },

  reducers: {
  }
}
