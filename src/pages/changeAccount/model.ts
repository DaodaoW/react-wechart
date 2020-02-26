import { getList, switchAccount } from './service';
import router from 'umi/router';
import { message } from 'antd';

export default {

  namespace: 'changeaccount',

  state: {
    accountList: []
  },

  effects: {
    *getList({payload}: any, { call, put }: any) {
      const response = yield call(getList, payload);
      yield put({ type: 'setAccountList', response });
    },
    *switchAccount({payload}: any, { call }: any) {
      const response = yield call(switchAccount, payload);
      message.success(response.message);
      router.push('/');
    }
  },

  reducers: {
    setAccountList(state: any, action: any) {
      return {
        ...state,
        accountList: action.response.entity
      }
    }
  }
}