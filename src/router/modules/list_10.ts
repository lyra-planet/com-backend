import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/list10',
    name: 'List10',
    redirect: '/list/basic-list10',
    component: Layout,
    meta: {
      title: '列表页面',
      icon: renderIcon(TableOutlined),
      sort: 10,
    },
    children: [
      {
        path: 'basic-list10',
        name: 'basic-list10',
        meta: {
          title: '灵眸智云大模型',
        },
        component: () => import('@/views/list/basicList10/index.vue'),
      },
      {
        path: 'basic-info10/:id?',
        name: 'basic-info10',
        meta: {
          title: '基础详情',
          hidden: true,
          activeMenu: 'basic-list',
        },
        component: () => import('@/views/list/basicList10/info.vue'),
      },
    ],
  },
];

export default routes;
