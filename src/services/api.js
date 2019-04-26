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

//登陆
export async function fakeAccountLogin(params) {
  return request(`/api/login?${stringify(params)}`);
  // const { password, userName, type } = params;
}

// 获取当前用户
export async function getCurrentUser(params) {
  return request(`/api/getcurrentuser?${stringify(params)}`);
}

//获取设备
export async function fetchEquipmentData(params) {
  return request(`/api/getequipment?${stringify(params)}`);
}

// 获取cpu
export async function fetchCpuData(params) {
  return request(`/api/getcpu?${stringify(params)}`);
}

// 获取内存

export async function fetchStorageData(params) {
  return request(`/api/getstorage?${stringify(params)}`);
}

// 获取磁盘
export async function fetchDiskData(params) {
  return request(`/api/getdisk?${stringify(params)}`);
}

// 获取软件
export async function fetchSoftware(params) {
  return request(`/api/getsoftware?${stringify(params)}`);
}


//获取系统用户
export async function fetchSystemData(params) {
  return request(`/api/getsystemuser?${stringify(params)}`);
}

//删除系统用户
export async function deleteSystemUser(params) {
  return request(`/api/deletesystemuser?${stringify(params)}`);
}

//更新系统用户
export async function updateSystemUser(params) {
  return request('/api/updatesystemuser', {
    method: 'POST',
    data: params,
  });
}

//创建系统用户
export async function createSystemUser(params) {
  return request('/api/createsystemuser', {
    method: 'POST',
    data: params,
  });
}


//获取学生用户
export async function fetchStudentData(params) {
  return request(`/api/getstudentuser?${stringify(params)}`);
}

//删除学生用户
export async function deleteStudentUser(params) {
  return request(`/api/deletestudentuser?${stringify(params)}`);
}

//更新学生用户
export async function updateStudentUser(params) {
  return request('/api/updatestudentuser', {
    method: 'POST',
    data: params,
  });
}

//创建学生用户
export async function createStudentUser(params) {
  return request('/api/createstudentuser', {
    method: 'POST',
    data: params,
  });
}

//新建设备
export async function createEquipment(params) {
  return request('/api/createequipment', {
    method: 'POST',
    data: params,
  });
}

//删除设备
export async function deleteEquipment(params) {
  return request(`/api/deleteequipment?${stringify(params)}`);

}

//更新设备
export async function updateEquipment(params) {
  return request('/api/updateequipment', {
    method: 'POST',
    data: params,
  });
}
