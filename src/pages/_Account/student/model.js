import { fetchStudentData, deleteStudentUser, updateStudentUser, createStudentUser } from '@/services/api';

export default {
  namespace: 'student',

  state: {
    data: [{
      key: '1',
      name: 'John Brown',
      academy: '88%',
      class: 32,
      number: 32,
    }],
  },

  effects: {
    *fetchStudentData({ payload }, { call, put }) {
      const response = yield call(fetchStudentData, payload);
      yield put({
        type: 'setStudentData',
        payload: response
      });
    },
    *deleteStudentUser({ payload }, { call, put }) {
      yield call(deleteStudentUser, payload);
      yield put({
        type: 'fetchStudentData',
        payload:{
          stu_name:payload.stu_name,
          class_grade:payload.class_grade
        }
      })
    },
    *updateStudentUser({ payload }, { call, put }) {
      yield call(updateStudentUser, {
        id:payload.id,
        stu_name:payload.stu_name,
        academy:payload.academy,
        class_grade:payload.class_grade,
        stu_num:payload.stu_num
      });
      yield put({
        type: 'fetchStudentData',
        payload:{
          stu_name:payload.selectName,
          class_grade:payload.selectClassGrade
        }
      })
    },
    *createStudentUser({ payload }, { call, put }) {
      yield call(createStudentUser, {
        stu_name:payload.stu_name,
        academy:payload.academy,
        class_grade:payload.class_grade,
        stu_num:payload.stu_num
      });
      yield put({
        type: 'fetchStudentData',
        payload:{
          stu_name:payload.selectName,
          class_grade:payload.selectClassGrade
        }
      })
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
