import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  did: string,
  name: string,
  production: string,
  hour: string,
  unit: string,
  efficiency: string,
  temperature: string,
  pressure: string,
  start: string,
  speed: string,
  rate: string,
  voltage: string,
  current: string
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
    title: '生产批次',
    key: 'production',
    width: 100,
  },
  {
    title: '小时产能 ',
    key: 'hour',
    width: 50,
  },
  {
    title: '单位',
    key: 'unit',
    width: 50,
  },
  {
    title: '生产效率',
    key: 'efficiency',
    width: 50,
  },
  {
    title: '温度',
    key: 'temperature',
    width: 50,
  },
  {
    title: '压力',
    key: 'pressure',
    width: 50,
  },
  {
    title: '启动时间',
    key: 'start',
    width: 50,
  },
  {
    title: '转速',
    key: 'speed',
    width: 50,
  },
  {
    title: '负荷率',
    key: 'rate',
    width: 50,
  },
  {
    title: '电压',
    key: 'voltage',
    width: 50,
  },
  {
    title: '电流',
    key: 'current',
    width: 50,
  },
];
