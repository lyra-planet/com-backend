<template>
  <div class="card content-box">
    <n-card :bordered="false" title="视觉检测系统" class=" text-center">
    </n-card>
    <div   class="mt-3  h-[70vh]">
      <div class="flex flex-row h-full">
        <div class="flex flex-col w-4/5 mr-3">
          <n-card >
            <div class="flex flex-row">
              <img class="w-1/2 h-[30vh] object-cover" src="http://picture.gptkong.com/20240521/2221eac887eea547b3b16203b907eb1d31.jpg" alt="">
              <img class="w-1/2 h-[30vh] object-cover" src="http://picture.gptkong.com/20240521/2221b288f52a1e497c8af482512c38afb3.jpg" alt="">
            </div>
          </n-card>
          <n-card >
            <div class="flex flex-row">
              <div class="w-1/2">
                <n-menu :options="menuOptions2" />
              </div>
              <div class="w-1/2">
                <n-card title="识别结果">
                  <n-menu :options="menuOptions3" />
                </n-card>
              </div>
            </div>
          </n-card>
        </div>
        <div class="flex flex-col w-1/5  h-full">
          <n-card class="h-full">
            <n-menu :options="menuOptions1" />
          </n-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="copyDirect">
import { h, Component } from 'vue'
import { NIcon} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
const menuOptions1: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '自动识别'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '上传图片'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '停止识别'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '参数设置'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '识别设置'
      ),
    key: 'go-back-home'
  },
]
const menuOptions2: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '叶片表面缺陷检测'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '发电机故障诊断'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '塔筒轴承故障诊断'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '结构健康检测'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '管道泄露检测'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '设备质量检测'
      ),
    key: 'go-back-home'
  },
]
const menuOptions3: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '检测用时: 4.2s'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '是否异常: 是'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '缺陷类别: 表面腐蚀'
      ),
    key: 'go-back-home'
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        '置信度: 95%'
      ),
    key: 'go-back-home'
  },
 
]
</script>

<style scoped lang="less">
  body {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    position: relative;
  }
  .content-box {
    height: 100vh;
    .box {
      width: 100px;
      height: 100px;
      background-color: #2d8cf0;
      position: absolute;
      z-index: 10000000;
      border-radius: 10px;
      margin: 20px 5px;
    }
  }
</style>
