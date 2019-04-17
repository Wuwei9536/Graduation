import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request(`/api/systemuser?${stringify(params)}`);
  // const { password, userName, type } = params;
  // console.log('%ctype: ', 'font-size:15px;background-color: rgb(135, 208, 104);', type);
  // if (password === 'root' && userName === 'admin') {
  //   return{
  //     status: 'ok',
  //     type,
  //     currentAuthority: 'admin',
  //   };
  //   // return;
  // }
  // if (password === 'root' && userName === 'user') {
  //   return{
  //     status: 'ok',
  //     type,
  //     currentAuthority: 'user',
  //   }
  // }
  // return{
  //   status: 'error',
  //   type,
  //   currentAuthority: 'guest',
  // };

  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// ----------------------

export async function fetchEquipmentData() {
  return {
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
      agent: "shi"
    }, {
      key: '2',
      name: 'John Brown',
      ip: "0.0.0.0",
      type: "类型名称",
      model: "89-1",
      cpu: '88%',
      storage: 32,
      disk: 32,
      software: 1,
      agent: "shi"
    }]
  }
}

export async function fetchCpuData() {
  return {
    data: [{
      key: '1',
      time: 1555465811009,
      cpu: 0.3
    }, {
      key: '2',
      time: 1555472570301,
      cpu: 0.4
    }, {
      key: '3',
      time: 1555474570301,
      cpu: 0.4
    }, {
      key: '4',
      time: 1555475570301,
      cpu: 0.4
    }, {
      key: '5',
      time: 1555486570301,
      cpu: 0.4
    }]
  }
}

export async function fetchStudentData() {
  return {
    data: [{
      key: '1',
      name: 'John Brown',
      academy: '88%',
      class: 32,
      number: 32,
      teacher: "s",
    }],
  }
}

export async function fetchSystemData() {
  return {
    data: [{
      key: '1',
      name: 'John Brown',
      catalogue: '12%',
      group: 32,
    }],
  }
}