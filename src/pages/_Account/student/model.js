import { fetchStudentData } from '@/services/api';

export default {
  namespace: 'student',

  state: {
     data : [{
      key: '1',
      name: 'John Brown',
      academy: '88%',
      class: 32,
      number: 32,
      teacher:1,
    }],
  },

  effects: {
    *fetchStudentData({ payload }, { call, put }) {
      const response = yield call(fetchStudentData, payload);
      yield put({
        type: 'setStudentData',
        payload:response.data
      });
    },
  },

  reducers: {
    setStudentData(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
  },
};
