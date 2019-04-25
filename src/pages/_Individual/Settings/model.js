import { updateSystemUser } from '@/services/api';

export default {
  namespace: 'individual',

  state: {

    isLoading: false,
  },

  effects: {
    *updateSystemUser({ payload }, { call }) {
        yield call(updateSystemUser,payload);
      },
  },

  reducers: {
    
  },
};
