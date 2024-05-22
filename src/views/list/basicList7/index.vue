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
  "itemCount": 12,
  "list":  [
            {
                "id": 1,
                "did": "QS001",
                "name": "电机",
                "start": "2024-05-01 08:00:00.000",
                "end": "2024-05-02 08:00:00.000",
                "total": "1200 kWh",
                "average": "60 kWh",
                "max": "100 kWh",
                "min": "50 kWh"
            },
            {
                "id": 2,
                "did": "QS002",
                "name": "风机",
                "start": "2024-05-02 08:00:00.000",
                "end": "2024-05-03 08:00:00.000",
                "total": "1400 kWh",
                "average": "70 kWh",
                "max": "110 kWh",
                "min": "60 kWh"
            },
            {
                "id": 3,
                "did": "QS003",
                "name": "塔筒",
                "start": "2024-05-03 08:00:00.000",
                "end": "2024-05-04 08:00:00.000",
                "total": "1600 kWh",
                "average": "80 kWh",
                "max": "120 kWh",
                "min": "70 kWh"
            },
            {
                "id": 4,
                "did": "QS004",
                "name": "风机",
                "start": "2024-05-04 08:00:00.000",
                "end": "2024-05-05 08:00:00.000",
                "total": "1800 kWh",
                "average": "90 kWh",
                "max": "130 kWh",
                "min": "80 kWh"
            },
            {
                "id": 5,
                "did": "QS005",
                "name": "电机",
                "start": "2024-05-05 08:00:00.000",
                "end": "2024-05-06 08:00:00.000",
                "total": "2000 kWh",
                "average": "100 kWh",
                "max": "140 kWh",
                "min": "90 kWh"
            },
            {
                "id": 6,
                "did": "QS006",
                "name": "过滤器",
                "start": "2024-05-06 08:00:00.000",
                "end": "2024-05-07 08:00:00.000",
                "total": "2200 kWh",
                "average": "110 kWh",
                "max": "150 kWh",
                "min": "100 kWh"
            },
            {
                "id": 7,
                "did": "QS007",
                "name": "电机",
                "start": "2024-05-07 08:00:00.000",
                "end": "2024-05-08 08:00:00.000",
                "total": "2400 kWh",
                "average": "120 kWh",
                "max": "160 kWh",
                "min": "110 kWh"
            },
            {
                "id": 8,
                "did": "QS008",
                "name": "风机",
                "start": "2024-05-08 08:00:00.000",
                "end": "2024-05-09 08:00:00.000",
                "total": "2600 kWh",
                "average": "130 kWh",
                "max": "170 kWh",
                "min": "120 kWh"
            },
            {
                "id": 9,
                "did": "QS009",
                "name": "塔筒",
                "start": "2024-05-09 08:00:00.000",
                "end": "2024-05-10 08:00:00.000",
                "total": "2800 kWh",
                "average": "140 kWh",
                "max": "180 kWh",
                "min": "130 kWh"
            },
            {
                "id": 10,
                "did": "QS010",
                "name": "电机",
                "start": "2024-05-10 08:00:00.000",
                "end": "2024-05-11 08:00:00.000",
                "total": "3000 kWh",
                "average": "150 kWh",
                "max": "190 kWh",
                "min": "140 kWh"
            },
            {
                "id": 11,
                "did": "QS011",
                "name": "风机",
                "start": "2024-05-11 08:00:00.000",
                "end": "2024-05-12 08:00:00.000",
                "total": "3200 kWh",
                "average": "160 kWh",
                "max": "200 kWh",
                "min": "150 kWh"
            },
            {
                "id": 12,
                "did": "QS012",
                "name": "过滤器",
                "start": "2024-05-12 08:00:00.000",
                "end": "2024-05-13 08:00:00.000",
                "total": "3400 kWh",
                "average": "170 kWh",
                "max": "210 kWh",
                "min": "160 kWh"
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
