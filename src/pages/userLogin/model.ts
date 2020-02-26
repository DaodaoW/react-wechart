import { checkPhoneRegister } from './service';
import router from 'umi/router';

export default {

  namespace: 'userlogin',

  state: {},

  effects: {
    *checkPhoneRegister({payload} : any, { call }: any) {
      const response = yield call(checkPhoneRegister, payload);
      !response || router.push({pathname: '/userVerify', query: {phone: payload.phone}});
    }
  },

  reducers: {
  }
}
