<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row:ListData) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="设备编号" path="name">
          <n-input placeholder="请输入编号" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="设备类型" path="address">
          <n-input type="textarea" placeholder="请输入类型" v-model:value="formParams.address" />
        </n-form-item>
        <n-form-item label="设备状态" path="date">
          <n-date-picker type="datetime" placeholder="请选择状态" v-model:value="formParams.date" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
  import { getTableList } from '@/api/table/list';
  import { columns, ListData } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';
  import { type FormRules } from 'naive-ui';

  const rules: FormRules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入名称',
    },
    address: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入地址',
    },
    date: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择日期',
    },
  };

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'NInput',
      label: '设备编号',
      componentProps: {
        placeholder: '请输入设备编号',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入设备编号', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '设备类型',
      componentProps: {
        placeholder: '请输入设备类型',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    }
  ];

  const router = useRouter();
  const formRef: any = ref(null);
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const formParams = reactive({
    name: '',
    address: '',
    date: null,
  });

  const actionColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除',
            onClick: handleDelete.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ['basic_list'],
          },
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
            ifShow: () => {
              return true;
            },
            auth: ['basic_list'],
          },
        ],
        dropDownActions: [
          {
            label: '启用',
            key: 'enabled',
            // 根据业务控制是否显示: 非enable状态的不显示启用按钮
            ifShow: () => {
              return true;
            },
          },
          {
            label: '禁用',
            key: 'disabled',
            ifShow: () => {
              return true;
            },
          },
        ],
        select: (key) => {
          window['$message'].info(`您点击了，${key} 按钮`);
        },
      });
    },
  });

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  function addTable() {
    showModal.value = true;
  }
  let tempData = {
  "page": 1,
  "pageSize": 10,
  "pageCount": 2,
  "itemCount": 15,
  "list": [
            {
                "id": 1,
                "time": "2024-05-01 08:10:00.000",
                "type": "网络故障",
                "content": "主路由器无响应",
                "state": "已解决",
                "staff": "李工",
                "remarks": "重启设备恢复"
            },
            {
                "id": 2,
                "time": "2024-05-03 09:32:00.000",
                "type": "系统错误",
                "content": "数据库服务中断",
                "state": "处理中",
                "staff": "张工",
                "remarks": "等待重启"
            },
            {
                "id": 3,
                "time": "2024-05-04 10:07:00.000",
                "type": "安全警报",
                "content": "未授权访问尝试",
                "state": "已拦截",
                "staff": "王工",
                "remarks": "加强监控"
            },
            {
                "id": 4,
                "time": "2024-05-07 11:25:00.000",
                "type": "硬件故障",
                "content": "磁盘阵列异常",
                "state": "待更换",
                "staff": "赵工",
                "remarks": "预计明日更换硬盘"
            },
            {
                "id": 5,
                "time": "2024-05-09 12:50:00.000",
                "type": "性能警告",
                "content": "CPU使用率过高",
                "state": "已优化",
                "staff": "李工",
                "remarks": "调整任务分配"
            },
            {
                "id": 6,
                "time": "2024-05-10 14:18:00.000",
                "type": "连接断开",
                "content": "VPN通道意外断开",
                "state": "已修复",
                "staff": "周工",
                "remarks": "软件升级导致"
            },
            {
                "id": 7,
                "time": "2024-05-11 15:05:00.000",
                "type": "电源问题",
                "content": "UPS电源异常",
                "state": "待检测",
                "staff": "吴工",
                "remarks": "需要物理检查"
            },
            {
                "id": 8,
                "time": "2024-05-13 16:30:00.000",
                "type": "温度告警",
                "content": "数据中心温度过高",
                "state": "已降温",
                "staff": "郑工",
                "remarks": "增加冷却负荷"
            },
            {
                "id": 9,
                "time": "2024-05-15 17:45:00.000",
                "type": "日志异常",
                "content": "异常登录行为日志",
                "state": "已跟踪",
                "staff": "林工",
                "remarks": "可能内部风险"
            },
            {
                "id": 10,
                "time": "2024-05-15 19:00:00.000",
                "type": "流量异常",
                "content": "NGFW流量峰值异常",
                "state": "分析中",
                "staff": "陈工",
                "remarks": "疑似DDoS攻击"
            },
            {
                "id": 11,
                "time": "2024-05-16 20:15:00.000",
                "type": "系统报错",
                "content": "邮件服务器崩溃",
                "state": "已重启",
                "staff": "胡工",
                "remarks": "软件故障导致"
            },
            {
                "id": 12,
                "time": "2024-05-18 21:30:00.000",
                "type": "存储告警",
                "content": "存储空间不足",
                "state": "处理中",
                "staff": "孙工",
                "remarks": "清理旧日志文件"
            },
            {
                "id": 13,
                "time": "2024-05-18 22:47:00.000",
                "type": "网络延迟",
                "content": "分支办公室网络延迟高",
                "state": "待优化",
                "staff": "何工",
                "remarks": "考虑带宽升级"
            },
            {
                "id": 14,
                "time": "2024-05-20 23:08:00.000",
                "type": "权限问题",
                "content": "多个账户权限异常",
                "state": "待调查",
                "staff": "刘工",
                "remarks": "疑似权限泄露"
            },
            {
                "id": 15,
                "time": "2024-05-2023:29:00.000",
                "type": "系统报警",
                "content": "操作系统未打补丁",
                "state": "待更新",
                "staff": "钱工",
                "remarks": "计划夜间更新"
            }
        ],
}



  const loadDataTable = async (res) => {
    // let data = await getTableList({ ...getFieldsValue(), ...res }).then(result=>{
    //   console.log(result)
    //   return tempData
    // })

    return tempData
  };

  function onCheckedRow(rowKeys) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }

  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate((errors) => {
      if (!errors) {
        window['$message'].success('新建成功');
        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }

  function handleEdit(record: Recordable) {
    console.log('点击了编辑', record);
    router.push({ name: 'basic-info', params: { id: record.id } });
  }

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record);
    window['$message'].info('点击了删除');
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped></style>
