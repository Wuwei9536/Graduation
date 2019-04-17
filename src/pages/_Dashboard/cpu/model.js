import { fetchCpuData } from '@/services/api';

export default {
  namespace: 'cpu',

  state: {
    data: [{
      key:'1',
      time: 1555465811009,
      cpu: 0.3
    }, {
      key:'2',
      time: 1555472570301,
      cpu: 0.4
    }, {
      key:'3',
      time: 1555474570301,
      cpu: 0.4
    }, {
      key:'4',
      time: 1555475570301,
      cpu: 0.4
    }, {
      key:'5',
      time: 1555486570301,
      cpu: 0.4
    }],
  },

  effects: {
    *fetchCpuData({ payload }, { call, put }) {
      const response = yield call(fetchCpuData, payload);
      yield put({
        type: 'setCpuData',
        payload:response.data
      });
    },
  },

  reducers: {
    setCpuData(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
  },
};
