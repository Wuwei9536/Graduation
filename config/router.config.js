export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard/equipment', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/equipment',
            name: 'equipment',
            component: './_Dashboard/equipment/equipment.js',
          },
          {
            path: '/dashboard/cpu',
            name: 'cpu',
            component: './_Dashboard/cpu/cpu.js',
          },
          {
            path: '/dashboard/storage',
            name: 'storage',
            component: './_Dashboard/cpu/cpu.js',
          },
          {
            path: '/dashboard/disk',
            name: 'disk',
            component: './_Dashboard/cpu/cpu.js',
          },
          {
            path: '/dashboard/software',
            name: 'software',
            component: './_Dashboard/software/software.js',
          },
        ],
      },
      {
        path: '/account',
        name: 'account',
        icon: 'user',
        routes: [
          {
            path: '/account/system',
            name: 'system',
            component: './_Account/system/system.js',
          },
          {
            path: '/account/student',
            name: 'student',
            component: './_Account/student/student.js',
          },
        ]
      },
      {
        path: '/individual',
        name: 'individual',
        icon: 'check-circle-o',
        routes: [
          {
            path: '/individual/info',
            name: 'info',
            component: './_Individual/Settings/Info',
            routes: [
              {
                path: '/individual/info',
                redirect: '/individual/info/base',
              },
              {
                path: '/individual/info/base',
                component: './_Individual/Settings/BaseView',
              },
              {
                path: '/individual/info/security',
                component: './_Individual/Settings/SecurityView',
              },
            ],
          },
        ]
      },
      {
        component: '404',
      },
    ],
  },
];
