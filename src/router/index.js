import { createRouter, createWebHashHistory, hasNecessaryRoute } from 'vue-router';

import { menus } from './router';

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
    redirect: '/test/home',
    name: 'Index',
    component: () => import('../views/index/index.vue'),
    children: [],
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
  // 添加路由
  const routes = $data.getData('routes');
  if (!routes || !routes.length) {
    const addRoutes = []
    menus.forEach(item => {
      if (item.children && item.children.length) {
        addRoutes.push(...item.children.map(menu => ({
          path: menu.value,
          name: menu.name,
          // import中至少得有个@/字符串
          component: () => import('@/' + menu.url.split('@/')[1]),
        })));
      }
    });
    $data.setData('routes', addRoutes);
    addRoutes.forEach(item => {
      router.addRoute('Index', item)
    });
    // 添加后需要重定向一下
    return to.fullPath;
  }

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
