import { createRouter, createWebHashHistory } from 'vue-router';
import { getRouteListApi } from '@/api/route';
import * as config from '@/config';
import { defaultMenus } from './defaultMenus';

const routes = [
  {
    path: '/',
    redirect: config.defaultRoute,
    name: 'index',
    component: () => import('../views/index/index.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/index/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from) => {
  const isLogin = $data.getLocalData('userInfo')?.id;
  if (isLogin) {
    // 添加路由
    if (!$data.getData('menus') || !$data.getData('menus').length) {
      try {
        const res = await getRouteListApi();
        // const res = { code: 200, data: [] };
        if (res.code == 200) {
          const character = $data.getLocalData('userInfo').character || '';
          const filter = item =>
            item.label &&
            item.name &&
            item.path &&
            item.url &&
            (item.character.length == 0 || item.character.indexOf(character) > -1)
          ;
          const menus = [...defaultMenus, ...res.data]
            .filter(filter)
            .map(it => it.children ? ({
              ...it,
              children: it.children.filter(filter),
            }) : it )
          ;
          $data.setData('menus', menus);
          const addRoutes = menus.map(item => {
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
            router.addRoute('index', item)
          });
          // 添加后需要重定向一下
          return to.fullPath;
        }
      } catch(err) {
        console.log(err);
      }
    }
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
