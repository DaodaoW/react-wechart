import { getWeather, getConsumptionDetails, overview, getList, createRechargeOrder } from './service';

export default {

  namespace: 'account',

  state: {
    data: {
      weatherPic: '',
      weather: '',
      temperature: '',
      humidity: '',
      region: '',
      pm: ''
    },
    accountInfo: {
      balance: 0,
      consumeAmount: 0
    },
    show: false
  },

  effects: {
    *getWeather({payload}: any, { call, put }: any) {
      const response = yield call(getWeather, payload);
      yield put({ type: 'setWeather', response });
    },
    // *updateCond({ payload = { page: 1, pageSize: 10 } }, { put }: any) {
    //   const { pageSize, page, ...cond } = payload;
    //   yield put({ type: 'setCond', payload: cond });
    //   yield put({ type: 'getConsumptionDetails', payload });
    // },
    *getConsumptionDetails({ payload }: any, { call, put, select }: any) {
      const cond = yield select((state: any) => state.account.cond);
      const params = { ...payload, ...cond };
      const response = yield call(getConsumptionDetails, params);
      yield put({ type: 'setConsumptionData', payload: response });
      return response;
    },
    *getOverview({ payload }: any, { call, put }: any) {
      const response = yield call(overview, payload);
      yield put({ type: 'setOverview', payload: response });
    },
    *getList({payload}: any, { call, put }: any) {
      const response = yield call(getList, payload);
      yield put({ type: 'setShow', payload: response.entity });
    },
    *createRechargeOrder({payload}: any, { call, put }: any) {
      const response = yield call(createRechargeOrder, payload);
      return response;
    },
  },

  reducers: {
    setWeather(state: any, action: any) {
      return {
        ...state,
        data: action.response ? action.response.entity : null
      }
    },
    setConsumptionDetails(state: any, action: any) {
      return {
        ...state,
        data: action.response.entity.data
      }
    },
    setOverview(state: any, action: any) {
      return {
        ...state,
        accountInfo: {...action.payload.entity}
      }
    },
    setShow(state: any, action: any) {
      return {
        ...state,
        show: action.payload.length !== 0
      }
    },
    // setCond(state: any, action: any) {
    //   return {
    //     ...state,
    //     cond: action.payload
    //   }
    // },
    // setConsumptionData(state: any, action: any) {
    //   return {
    //     ...state,
    //     consumptionData: action.payload.entity.data,
    //     total: action.payload.entity.total,
    //     currentPage: action.payload.entity.current_page
    //   }
    // },
  }
}