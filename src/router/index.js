import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () => import('../pages/index/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../pages/Home/index.vue')
      },
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
