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
      label: '采集时间',
      componentProps: {
        placeholder: '请输入设备开始时间-结束时间',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入设备开始时间-结束时间', trigger: ['blur'] }],
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '缺陷类型',
      componentProps: {
        placeholder: '请输入缺陷类型',
        showButton: false,
        onInput: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'mobile',
      component: 'NInputNumber',
      label: '缺陷内容',
      componentProps: {
        placeholder: '请输入缺陷内容',
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
                "cam": "CAM001",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-01 08:00:00.000"
            },
            {
                "id": 2,
                "cam": "CAM002",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "划痕",
                "content": "表面有明显划痕",
                "time": "2024-04-01 09:30:00.000"
            },
            {
                "id": 3,
                "cam": "CAM003",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-01 10:15:00.000"
            },
            {
                "id": 4,
                "cam": "CAM004",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "凹陷",
                "content": "部分区域凹陷",
                "time": "2024-04-01 11:45:00.000"
            },
            {
                "id": 5,
                "cam": "CAM005",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-01 13:20:00.000"
            },
            {
                "id": 6,
                "cam": "CAM006",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "污渍",
                "content": "表面有油渍",
                "time": "2024-04-01 14:50:00.000"
            },
            {
                "id": 7,
                "cam": "CAM007",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-01 16:00:00.000"
            },
            {
                "id": 8,
                "cam": "CAM008",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "磨损",
                "content": "边缘磨损严重",
                "time": "2024-04-01 17:30:00.000"
            },
            {
                "id": 9,
                "cam": "CAM009",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-01 19:10:00.000"
            },
            {
                "id": 10,
                "cam": "CAM010",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "锈迹",
                "content": "金属部件有锈迹",
                "time": "2024-04-01 20:45:00.000"
            },
            {
                "id": 11,
                "cam": "CAM011",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-01 22:20:00.000"
            },
            {
                "id": 12,
                "cam": "CAM012",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "裂纹",
                "content": "表面出现裂纹",
                "time": "2024-04-01 23:30:00.000"
            },
            {
                "id": 13,
                "cam": "CAM013",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-02 01:00:00.000"
            },
            {
                "id": 14,
                "cam": "CAM014",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "是",
                "mold": "变形",
                "content": "部件弯曲变形",
                "time": "2024-04-02 02:15:00.000"
            },
            {
                "id": 15,
                "cam": "CAM015",
                "photo": "http://picture.gptkong.com/20240521/192128027943b64f85883af86fefb854d7.jpg",
                "abnormal": "否",
                "mold": "无",
                "content": "无",
                "time": "2024-04-02 03:45:00.000"
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
