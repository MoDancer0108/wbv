export const menus = [
    {
        label: 'Test',
        value: 'Test',
        children: [
            {
                label: 'Home',
                name: 'Home',
                value: '/test/home',
                url: '@/views/Home/index.vue',
            },
        ],
    },
    {
        label: '用户管理',
        value: 'User',
        children: [
            {
                label: '用户列表',
                name: 'UserList',
                value: '/user/userList',
                url: '@/views/User/UserList/index.vue',
            },
        ],
    },
];