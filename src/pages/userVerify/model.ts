import { checkPhoneRegister, inputVCode } from './service';
import router from 'umi/router';

export default {

  namespace: 'userverify',

  state: {
  },

  effects: {
    *inputVCode({ payload }: any, { call }: any) {
      const response = yield call(inputVCode, payload);
      response.entity.isRegister ? router.push('/') : router.push('/setPwd');
    },
    // *checkPhoneRegister({ payload }: any, { call }: any) {
    //   const response = yield call(checkPhoneRegister, payload);
    //   response.entity.isRegister ? router.push('/') : router.push('/setPwd');
    // }
  },

  reducers: {
  }
}
