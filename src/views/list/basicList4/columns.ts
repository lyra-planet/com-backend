import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: number,
  cam: string,
  photo: string,
  abnormal: string,
  mold: string,
  content: string,
  time: string
}
//序号、相机编号、采集图片、采集时间、是否异常、缺陷类型、缺陷内容
export const columns: BasicColumn<ListData>[] = [
  {
    title: '设备编号',
    key: 'id',
    width: 100,
  },
  {
    title: '相机编号',
    key: 'cam',
    width: 100,
  },
  {
    title: '采集图片',
    key: 'photo',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.photo,
      });
    },
  },
  {
    title: '采集时间',
    key: 'time',
    width: 100,
  },
  {
    title: '是否异常',
    key: 'abnormal',
    width: 100,
  },
  {
    title: '缺陷类型',
    key: 'mold',
    width: 100,
  },
  {
    title: '缺陷内容',
    key: 'content',
    width: 100,
  },
];
