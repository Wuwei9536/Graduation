import { fetchSystemData, deleteSystemUser, updateSystemUser, createSystemUser,downloadExcel,uploadExcel } from '@/services/api';

export default {
  namespace: 'system',

  state: {
    data: [{
      key: '1',
      name: 'John Brown',
      catalogue: '12%',
      group: 32,
    }],

  },

  effects: {
    *fetchSystemData({ payload }, { call, put }) {
      const response = yield call(fetchSystemData, payload);
      console.log('%cresponse: ', 'font-size:15px;background-color: rgb(135, 208, 104);', response);
      yield put({
        type: 'setSystemData',
        payload: response
      });
    },
    *deleteSystemUser({ payload }, { call, put }) {
      yield call(deleteSystemUser, payload);
      yield put({
        type: 'fetchSystemData',
        payload:{
          name:payload.name,
          groupname:payload.groupname
        }
      })
    },
    *updateSystemUser({ payload }, { call, put }) {
      yield call(updateSystemUser, {
        id:payload.id,
        name:payload.name,
        homedirectory:payload.homedirectory,
        groupname:payload.groupname,
      });
      yield put({
        type: 'fetchSystemData',
        payload:{
          name:payload.selectName,
          groupname:payload.selectGroupName
        }
      })
    },
    *createSystemUser({ payload }, { call, put }) {
      yield call(createSystemUser, {
        name:payload.name,
        homedirectory:payload.homedirectory,
        groupname:payload.groupname
      });
      yield put({
        type: 'fetchSystemData',
        payload:{
          name:payload.selectName,
          groupname:payload.selectGroupName
        }
      })
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
