import { fetchCpuData, fetchEquipmentData,fetchStorageData,fetchDiskData } from '@/services/api';

export default {
  namespace: 'cpu',

  state: {
    data: [],
    equipment: [],
    defaultEquipment: '',
    percent: 100,
    isShow: false
  },

  effects: {
    //获取cpu数据 获取设备列表 设置默认显示设备
    *fetchCpuData({ payload }, { call, put }) {
      console.log('%cpayload: ', 'font-size:15px;background-color: rgb(135, 208, 104);', payload);
      const equipment = yield call(fetchEquipmentData); //获取设备列表
      const { id, pathname } = payload;
      if (!id) { //如果路由没有参数
        payload = { id: equipment[0].key } //参数就等于设备列表第一个的id
        yield put({ //设备默认显示设备为设备列表第一个
          type: 'setDefaultEquipment',
          payload: equipment[0].name
        });
      } else { // 有参数
        payload = { id } //参数就等于设备列表第一个的id
        for (let i in equipment) {
          if (payload.id == equipment[i].key) { // 在下拉列表中找到与参数id相同的设备  设置默认设备名称
            yield put({
              type: 'setDefaultEquipment',
              payload: equipment[i].name
            });
          }
        }
      }
      let fetchData;
      switch (pathname) {
        case '/dashboard/cpu':
          fetchData = fetchCpuData;
          break;
        case '/dashboard/storage':
          fetchData = fetchStorageData;
          break;
        case '/dashboard/disk':
          fetchData = fetchDiskData;
          break;
        default:
          break;
      }
      const response = yield call(fetchData, payload); //拉取cpu数据
      let resData = [];
      if (response.length > 0) {
        resData = response.map((item) => ({
          key: item.id,
          time: item.create_time,
          cpu: item.usage_rate,
          cpuPercent: item.usage_rate * 100 + '%',
          tableTime: new Date(item.create_time).toLocaleTimeString()
        }))
      }
      yield put({ //设置设备列表
        type: 'setEquipmentData',
        payload: equipment
      });
      yield put({ // 设置cpu数据
        type: 'setCpuData',
        payload: resData
      });
      yield put({ 
        type: 'setIsShow',
        payload: true
      });
    },
  },

  reducers: {
    setCpuData(state, { payload }) {
      return {
        ...state,
        data: payload,
        percent: payload.length > 0 ? payload[payload.length - 1].cpu * 100 : 100
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
    setIsShow(state, { payload }) {
      return {
        ...state,
        isShow: payload
      };
    },
  },
};
