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
                "time": "2024-05-01 08:30:15.000",
                "type": "用户操作",
                "content": "用户查询设备监测数据"
            },
            {
                "id": 2,
                "time": "2024-05-02 10:22:47.000",
                "type": "用户操作",
                "content": "用户进行了缺陷识别数据"
            },
            {
                "id": 3,
                "time": "2024-05-03 16:45:00.000",
                "type": "系统更新",
                "content": "系统升级到最新版本"
            },
            {
                "id": 4,
                "time": "2024-05-04 19:58:32.000",
                "type": "用户操作",
                "content": "用户删除了某条环境记录"
            },
            {
                "id": 5,
                "time": "2024-05-05 09:01:01.000",
                "type": "系统错误",
                "content": "数据库连接失败"
            },
            {
                "id": 6,
                "time": "2024-05-06 11:12:56.000",
                "type": "用户操作",
                "content": "用户修改了设备信息"
            },
            {
                "id": 7,
                "time": "2024-05-07 14:33:21.000",
                "type": "系统更新",
                "content": "修复了之前的错误"
            },
            {
                "id": 8,
                "time": "2024-05-08 17:44:44.000",
                "type": "用户操作",
                "content": "用户新增了一条设备采集记录"
            },
            {
                "id": 9,
                "time": "2024-05-09 08:22:19.000",
                "type": "系统错误",
                "content": "系统超时导致响应缓慢"
            },
            {
                "id": 10,
                "time": "2024-05-10 13:05:30.000",
                "type": "用户操作",
                "content": "用户查询了能耗统计"
            },
            {
                "id": 11,
                "time": "2024-05-11 12:11:58.000",
                "type": "系统更新",
                "content": "优化了系统性能"
            },
            {
                "id": 12,
                "time": "2024-05-12 07:30:02.000",
                "type": "用户操作",
                "content": "用户导出了设备数据"
            },
            {
                "id": 13,
                "time": "2024-05-13 18:56:49.000",
                "type": "系统错误",
                "content": "网络故障导致访问受限"
            },
            {
                "id": 14,
                "time": "2024-05-14 06:28:33.000",
                "type": "用户操作",
                "content": "用户进行了数据备份"
            },
            {
                "id": 15,
                "time": "2024-05-15 09:15:20.000",
                "type": "系统更新",
                "content": "用户查询预警记录"
            }
        ]
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
