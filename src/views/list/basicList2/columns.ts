import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: string;
  name: string;
  avatar: string;
  address: string;
  d:string;
  e:string;
}
//设备编号、设备类型、设备状态（运行，停止。故障）、负载状态（空闲、部分负荷、满载）
export const columns: BasicColumn<ListData>[] = [
  {
    title: '设备编号',
    key: 'id',
    width: 100,
  },
  {
    title: '设备类型',
    key: 'name',
    width: 100,
  },
  {
    title: '生产批次',
    key: 'avatar',
    width: 100,
  },
  {
    title: '小时产能 ',
    key: 'address',
    width: 50,
  },
  {
    title: '单位',
    key: 'd',
    width: 50,
  },
  {
    title: '生产效率',
    key: 'e',
    width: 50,
  },

];
