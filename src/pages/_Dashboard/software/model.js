import { fetchSoftware,fetchEquipmentData } from '@/services/api';

export default {
  namespace: 'software',

  state: {
    data: [{
      key: '1',
      name: 'John Brown',
      catalogue: '12%',
      group: 32,
    }],
    equipment: [],
    defaultEquipment: '',
  },

  effects: {
    *fetchSoftware({ payload }, { call, put }) {
      const equipment = yield call(fetchEquipmentData,{}); //获取设备列表
      if (!payload) { //如果路由没有参数
        payload = { id: equipment[0].key } //参数就等于设备列表第一个的id
        yield put({ //设备默认显示设备为设备列表第一个
          type: 'setDefaultEquipment',
          payload: equipment[0].name
        });
      } else { // 有参数
        for (let i in equipment) {
          if (payload.id == equipment[i].key) { // 在下拉列表中找到与参数id相同的设备  设置默认设备名称
            yield put({
              type: 'setDefaultEquipment',
              payload: equipment[i].name
            });
          }
        }
      }
      const response = yield call(fetchSoftware, payload);
      yield put({
        type:'setSoftwareDate',
        payload:response,
      })
      yield put({ //设置设备列表
        type: 'setEquipmentData',
        payload: equipment
      });
    }
  },

  reducers: {
    setSoftwareDate(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    setEquipmentData(state, { payload }) {
      return {
        ...state,
        equipment: payload
      };
    },
    setDefaultEquipment(state, { payload }) {
      return {
        ...state,
        defaultEquipment: payload
      };
    },
  }
};
