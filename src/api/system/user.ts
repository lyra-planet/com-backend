import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取用户信息
 */

const adminInfo = {
  userId: '1',
  username: 'lingmou',
  realName: 'Lingmou',
  avatar: "http://dummyimage.com/120x60",
  desc: 'manager',
  password: "NRDAKCANYFIXS",
  token:"FGIDUTLLOGOTXEDQJTNVEHWESGERYTQZ",
  permissions: [
    {
      label: '主控台',
      value: 'dashboard_console',
    },
    {
      label: '监控页',
      value: 'dashboard_monitor',
    },
    {
      label: '工作台',
      value: 'dashboard_workplace',
    },
    {
      label: '基础列表',
      value: 'basic_list',
    },
    {
      label: '基础列表删除',
      value: 'basic_list_delete',
    },
  ],
};

export function getUserInfo() {
  return adminInfo
}

/**
 * @description: 用户登录
 */
export function login(params) {
  let postData: any = {
    account: params.username,
    password: params.password,
  };
  postData = postData;
  console.log(postData);
  return http.request<BasicResponseModel>(
    { url: 'http://118.25.85.189:8017/user/login', method: 'POST', data: postData },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params,
  });
}
