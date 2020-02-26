import { getTransactionFlow } from './service';

export default {

  namespace: 'bill',

  state: {
  },

  effects: {
    *getTransactionFlow({ payload }: any, { call }: any) {
      const response = yield call(getTransactionFlow, payload);
      return response;
    }
  },

  reducers: {
  }
}