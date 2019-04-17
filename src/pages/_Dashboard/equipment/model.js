import { fetchEquipmentData } from '@/services/api';

export default {
  namespace: 'equipment',

  state: {
    data: [{
      key: '1',
      name: 'John Brown',
      ip: "0.0.0.0",
      type: "类型名称",
      model: "89-1",
      cpu: '88%',
      storage: 32,
      disk: 32,
      software: 1,
      agent: "否"
    }],
  },

  effects: {
    *fetchEquipmentData({ payload }, { call, put }) {
      const response = yield call(fetchEquipmentData, payload);
      yield put({
        type: 'setEquipmentData',
        payload:response.data
      });
    },
  },

  reducers: {
    setEquipmentData(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
  },
};
