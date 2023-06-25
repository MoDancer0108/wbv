export const menus = [
    {
        label: '首页',
        name: 'Hello',
        path: '/hello',
        url: '@/views/Hello/index.vue',
        children: [],
    },
    {
        label: 'Test',
        name: 'Test',
        path: '/test',
        url: '@/views/Test/index.vue',
        children: [
            {
                label: 'Home',
                name: 'Home',
                path: 'home',
                url: '@/views/Test/Home/index.vue',
            },
        ],
    },
    {
        label: '用户管理',
        name: 'User',
        path: '/user',
        url: '@/views/User/index.vue',
        children: [
            {
                label: '用户列表',
                name: 'UserList',
                path: 'userList',
                url: '@/views/User/UserList/index.vue',
            },
        ],
    },
    {
        label: '路由管理',
        name: 'Router',
        path: '/router',
        url: '@/views/Router/index.vue',
        children: [
            {
                label: '路由列表',
                name: 'RouterList',
                path: 'routerList',
                url: '@/views/Router/RouterList/index.vue',
            },
        ],
    },
];