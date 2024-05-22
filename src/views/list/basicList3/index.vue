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
                "did": "QS001",
                "name": "电机",
                "production": "Lot001",
                "hour": "50",
                "unit": "件/小时",
                "efficiency": "0.9",
                "temperature": "60°C",
                "pressure": "5 bar",
                "start": "-",
                "speed": "-",
                "rate": "50 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 2,
                "did": "QS002",
                "name": "风机",
                "production": "Lot001",
                "hour": "30",
                "unit": "吨/小时",
                "efficiency": "0.8",
                "temperature": "55°C",
                "pressure": "4 bar",
                "start": "10 m/s",
                "speed": "2000 m³/h",
                "rate": "60 Hz",
                "voltage": "10 m/s",
                "current": "2000 m³/h"
            },
            {
                "id": 3,
                "did": "QS003",
                "name": "塔筒",
                "production": "Lot001",
                "hour": "20",
                "unit": "件/小时",
                "efficiency": "0.75",
                "temperature": "65°C",
                "pressure": "3 bar",
                "start": "-",
                "speed": "-",
                "rate": "55 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 4,
                "did": "QS004",
                "name": "风机",
                "production": "Lot002",
                "hour": "40",
                "unit": "吨/小时",
                "efficiency": "0.85",
                "temperature": "60°C",
                "pressure": "6 bar",
                "start": "12 m/s",
                "speed": "2500 m³/h",
                "rate": "58 Hz",
                "voltage": "12 m/s",
                "current": "2500 m³/h"
            },
            {
                "id": 5,
                "did": "QS005",
                "name": "电机",
                "production": "Lot002",
                "hour": "60",
                "unit": "件/小时",
                "efficiency": "0.92",
                "temperature": "58°C",
                "pressure": "4 bar",
                "start": "-",
                "speed": "-",
                "rate": "60 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 6,
                "did": "QS006",
                "name": "过滤器",
                "production": "Lot001",
                "hour": "15",
                "unit": "件/小时",
                "efficiency": "0.65",
                "temperature": "70°C",
                "pressure": "2 bar",
                "start": "-",
                "speed": "-",
                "rate": "45 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 7,
                "did": "QS007",
                "name": "风机",
                "production": "Lot003",
                "hour": "35",
                "unit": "吨/小时",
                "efficiency": "0.82",
                "temperature": "57°C",
                "pressure": "5 bar",
                "start": "14 m/s",
                "speed": "3000 m³/h",
                "rate": "62 Hz",
                "voltage": "14 m/s",
                "current": "3000 m³/h"
            },
            {
                "id": 8,
                "did": "QS008",
                "name": "混合器",
                "production": "Lot001",
                "hour": "25",
                "unit": "批次/小时",
                "efficiency": "0.7",
                "temperature": "50°C",
                "pressure": "3 bar",
                "start": "-",
                "speed": "-",
                "rate": "50 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 9,
                "did": "QS009",
                "name": "电机",
                "production": "Lot003",
                "hour": "70",
                "unit": "件/小时",
                "efficiency": "0.93",
                "temperature": "56°C",
                "pressure": "4 bar",
                "start": "-",
                "speed": "-",
                "rate": "65 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 10,
                "did": "QS010",
                "name": "电机",
                "production": "Lot004",
                "hour": "80",
                "unit": "件/小时",
                "efficiency": "0.95",
                "temperature": "54°C",
                "pressure": "5 bar",
                "start": "--",
                "speed": "-",
                "rate": "70 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 11,
                "did": "QS011",
                "name": "泵",
                "production": "Lot001",
                "hour": "100",
                "unit": "吨/小时",
                "efficiency": "0.88",
                "temperature": "62°C",
                "pressure": "8 bar",
                "start": "-",
                "speed": "-",
                "rate": "55 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 12,
                "did": "QS012",
                "name": "压缩机",
                "production": "Lot002",
                "hour": "120",
                "unit": "立方/小时",
                "efficiency": "0.78",
                "temperature": "68°C",
                "pressure": "10 bar",
                "start": "-",
                "speed": "-",
                "rate": "60 Hz",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 13,
                "did": "QS013",
                "name": "加热器",
                "production": "Lot001",
                "hour": "50",
                "unit": "加热量/小时",
                "efficiency": "0.8",
                "temperature": "-",
                "pressure": "-",
                "start": "-",
                "speed": "-",
                "rate": "-",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 14,
                "did": "QS014",
                "name": "冷却塔",
                "production": "Lot001",
                "hour": "30",
                "unit": "冷却量/小时",
                "efficiency": "0.75",
                "temperature": "-",
                "pressure": "-",
                "start": "-",
                "speed": "-",
                "rate": "-",
                "voltage": "-",
                "current": "-"
            },
            {
                "id": 15,
                "did": "QS015",
                "name": "反应器",
                "production": "Lot003",
                "hour": "20",
                "unit": "反应量/小时",
                "efficiency": "0.87",
                "temperature": "-",
                "pressure": "-",
                "start": "-",
                "speed": "-",
                "rate": "-",
                "voltage": "-",
                "current": "-"
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
