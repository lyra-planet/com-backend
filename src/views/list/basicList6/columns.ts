import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: number,
  time: string,
  type: string,
  content: string,
  state: string,
  staff: string,
  remarks: string
}
// 序号、时间、类型、事件、处理状态、运维人员、备注
export const columns: BasicColumn<ListData>[] = [
  {
    title: '序号',
    key: 'id',
    width: 50,
  },
  {
    title: '时间',
    key: 'time',
    width: 200,
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
  },
  {
    title: '事件 ',
    key: 'content',
    width: 200,
  },
  {
    title: '处理状态',
    key: 'state',
    width: 50,
  },
  {
    title: '运维人员',
    key: 'staff',
    width: 50,
  },
  {
    title: '备注',
    key: 'remarks',
    width: 150,
  },
];
