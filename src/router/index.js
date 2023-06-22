import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/index',
    redirect: '/index/foo',
    name: 'Index2',
    component: () => import('../pages/index/index.vue'),
    children: [
      {
        path: 'foo',
        name: 'Foo',
        component: () => import('../pages/Foo.vue')
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('../pages/Test.vue')
      },
      {
        path: 'pinia',
        name: 'Pinia',
        component: () => import('../pages/Pinia.vue')
      },
      {
        path: 'myForm',
        name: 'MyForm',
        component: () => import('../pages/myForm/MyForm.vue')
      },
      {
        path: 'test01',
        name: 'Test01',
        component: () => import('../pages/test01/index.vue')
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
    name: 'Index',
    component: () => import('../views/index/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home/index.vue')
      },
      {
        path: 'home2',
        name: 'Home2',
        component: () => import('../views/Home2/index.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  const isLogin = $data.getLocalData('userID');
  if (isLogin) {
    // 已登录不能去登录页
    if (to.path == '/login') {
      return false;
    }
  } else {
    // 未登录不能去非登录页
    if (to.path != '/login') {
      if (from.path == '/login') return false;
      return router.push('/login');
    }
  }
  return true;
})
export default router
