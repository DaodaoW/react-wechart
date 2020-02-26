import { unifiedOrder } from './service';
import router from 'umi/router';

export default {

  namespace: 'pay',

  state: {
  },

  effects: {
    *unifiedOrder({payload}: any, { call }: any) {
      const response = yield call(unifiedOrder, payload);
      return response;
    }
  },

  reducers: {
  }
}