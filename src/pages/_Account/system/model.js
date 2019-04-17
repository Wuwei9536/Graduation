import { fetchSystemData } from '@/services/api';

export default {
  namespace: 'system',

  state: {
     data : [{
      key: '1',
      name: 'John Brown',
      catalogue: '12%',
      group: 32,
    }],

  },

  effects: {
    *fetchSystemData({ payload }, { call, put }) {
      const response = yield call(fetchSystemData, payload);
      yield put({
        type: 'setSystemData',
        payload:response.data
      });
    },
  },

  reducers: {
    setSystemData(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
  },
};
