//常量路由,对外暴漏

export const constantRoute = [
  //登陆
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login', //命名路由
  },
  //登陆成功，展示首页路由
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      //首页
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
      //商品管理
      {
        path: 'product',
        component: () => import('@/views/product/index.vue'),
        name: 'Product',
        redirect: '/product/trademark',
        meta: {
          title: '商品管理',
          icon: 'Handbag',
        },
        children: [
          {
            path: 'trademark',
            component: () => import('@/views/product/trademark/index.vue'),
            name: 'Trademark',
            meta: {
              title: '品牌管理',
              icon: 'ShoppingCart',
            },
          },
          {
            path: 'attr',
            component: () => import('@/views/product/attr/index.vue'),
            name: 'Attr',
            meta: {
              title: '属性管理',
              icon: 'Operation',
            },
          },
          {
            path: 'spu',
            component: () => import('@/views/product/spu/index.vue'),
            name: 'Spu',
            meta: {
              title: 'SPU管理',
              icon: 'CollectionTag',
            },
          },
          {
            path: 'sku',
            component: () => import('@/views/product/sku/index.vue'),
            name: 'Sku',
            meta: {
              title: 'SKU管理',
              icon: 'PriceTag',
            },
          },
        ],
      },
      //权限管理
      {
        path: 'acl',
        component: () => import('@/views/acl/index.vue'),
        name: 'Acl',
        redirect: '/acl/user',
        meta: {
          title: '权限管理',
          icon: 'Lock',
        },
        children: [
          {
            path: 'user',
            component: () => import('@/views/acl/user/index.vue'),
            name: 'User',
            meta: {
              title: '用户管理',
              icon: 'User',
            },
          },
          {
            path: 'role',
            component: () => import('@/views/acl/role/index.vue'),
            name: 'Role',
            meta: {
              title: '角色管理',
              icon: 'UserFilled',
            },
          },
          {
            path: 'permission',
            component: () => import('@/views/acl/permission/index.vue'),
            name: 'Permission',
            meta: {
              title: '菜单管理',
              icon: 'Menu',
            },
          },
        ],
      },
    ],
  },
  //数据大屏
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'Screen',
    },
  },
  //404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  //任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
