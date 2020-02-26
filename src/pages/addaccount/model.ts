import { bandingUser } from './service';
import { message } from 'antd';
import router from 'umi/router';

export default {

  namespace: 'addaccount',

  state: {
  },

  effects: {
    *bandingUser({ payload }: any, { call }: any) {
      const response = yield call(bandingUser, payload);
      message.success(response.message);
      router.push('/changeAccount');
    }
  },

  reducers: {
  }
}