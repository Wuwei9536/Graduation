import { fetchEquipmentData ,createEquipment,deleteEquipment,updateEquipment} from '@/services/api';

export default {
  namespace: 'equipment',

  state: {
    data: [],
  },

  effects: {
    *fetchEquipmentData({ payload }, { call, put }) {
      const response = yield call(fetchEquipmentData, payload);
      yield put({
        type: 'setEquipmentData',
        payload:response
      });
    },
    *createEquipment({ payload }, { call, put }) {
      yield call(createEquipment, {
        equip_name:payload.equipmentName,
        ip:payload.ip,
        node_type:payload.nodeType,
        cpu_model:payload.cpuType,
        core_num:payload.cpuNum,
        storage:payload.storage,
        disk:payload.disk,
        isagent:payload.agent
      });
      yield put({
        type: 'fetchEquipmentData',
        payload:{
          equip_name:payload.name,
          status:payload.status
        }
      });
    },
    *deleteEquipment({ payload }, { call, put }) {
      yield call(deleteEquipment, {
        id:payload.id
      });
      yield put({
        type: 'fetchEquipmentData',
        payload:{
          equip_name:payload.equip_name,
          status:payload.status
        }
      });
    },
    *updateEquipment({ payload }, { call, put }) {
      yield call(updateEquipment, {
        id:payload.id,
        equip_name:payload.equipmentName,
        ip:payload.ip,
        node_type:payload.nodeType,
        cpu_model:payload.cpuType,
        core_num:payload.cpuNum,
        storage:payload.storage,
        disk:payload.disk,
        isagent:payload.agent
      });
      yield put({
        type: 'fetchEquipmentData',
        payload:{
          equip_name:payload.name,
          status:payload.status
        }
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
