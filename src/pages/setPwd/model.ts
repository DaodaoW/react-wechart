import { setPassword } from './service';
import router from 'umi/router';
import { message } from 'antd';

export default {

  namespace: 'setpwd',

  state: {
  },

  effects: {
    *setPassword({payload}: any, { call }: any) {
      yield call(setPassword, payload);
      router.push('/');
    }
  },

  reducers: {
  }
}
