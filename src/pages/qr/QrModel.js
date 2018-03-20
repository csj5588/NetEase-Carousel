import { routerRedux } from 'dva/router';
import * as api from './QrApi';

export default {
  namespace: 'qr',
  state: {
    qrData: {}, // 微信config信息
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetchWX' });
    },
  },
  effects: {
    *fetchWX({ payload }, { put, call }) {
       const resData = yield call(api.getWX);
       console.log(resData);
       yield put({ type: 'save/qrData', payload: resData.data.data });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    'save/qrData': (state, { payload }) => ({ ...state, qrData: payload }),
  },
};
