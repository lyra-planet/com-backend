import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  did: string,
  name: string,
  start: string,
  end: string,
  total: string,
  average: string,
  max: string,
  min: string
}
//设备编号、设备类型、设备状态（运行，停止。故障）、负载状态（空闲、部分负荷、满载）
export const columns: BasicColumn<ListData>[] = [
  {
    title: '设备编号',
    key: 'did',
    width: 100,
  },
  {
    title: '设备类型',
    key: 'name',
    width: 100,
  },
  {
    title: '开始时间',
    key: 'start',
    width: 100,
  },
  {
    title: '结束时间',
    key: 'end',
    width: 100,
  },
  {
    title: '总能耗',
    key: 'total',
    width: 50,
  },
  {
    title: '平均能耗',
    key: 'average',
    width: 50,
  },
  {
    title: '最大能耗',
    key: 'max',
    width: 50,
  },
  {
    title: '最小能耗',
    key: 'min',
    width: 50,
  },
];
