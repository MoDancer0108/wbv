import { createRouter, createWebHashHistory } from 'vue-router';
import { getRouteListApi } from '@/api/route';
import * as config from '@/config';
import { defaultMenus } from './defaultMenus';

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
    redirect: config.defaultRoute,
    name: 'Index',
    component: () => import('../views/Index/index.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Index/Login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from) => {
  // 添加路由
  if (!$data.getData('menus') || !$data.getData('menus').length) {
    try {
      const res = await getRouteListApi();
      // const res = { code: 200, data: [] };
      if (res.code == 200) {
        const menus = res.data.filter(item =>
          item.label &&
          item.name &&
          item.path &&
          item.url
        );
        $data.setData('menus', [...defaultMenus, ...menus]);
        const addRoutes = [...defaultMenus, ...menus].map(item => {
          if (item.children && item.children.length) {
            return {
              ...item,
              component: () => import('@/' + item.url.split('@/')[1]),
              children: item.children.map(menu => ({
                ...menu,
                // import中至少得有个@/字符串
                component: () => import('@/' + menu.url.split('@/')[1]),
              })),
            };
          } else {
            return {
              ...item,
              component: () => import('@/' + item.url.split('@/')[1]),
            };
          }
        });
        addRoutes.forEach(item => {
          router.addRoute('Index', item)
        });
        // 添加后需要重定向一下
        return to.fullPath;
      }
    } catch(err) {}
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
