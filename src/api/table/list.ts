import { http } from '@/utils/http/axios';

//获取table




export function getTableList(params) {
  return http.request({
    url: `http://118.25.85.189:8017/device/list?pageNum=${params.page}&pageSize=${params.pageSize}`,
    method: 'post',
    headers:{
      "Access-Control-Allow-Origin":"*"
    }
  });
}
