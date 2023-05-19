<template>
  <div class="my-container">
    <div>流程编辑器</div>
    <FlowEditor />
    <a-divider />
    <div class="mb-5">ace编辑器</div>
    <AceEditor v-model:content="currentValue" :init="initAce" :theme="aceTheme" :lang="aceLang" />
    <div class="mt-10">
      <span>主题</span>
      <a-radio-group v-model="aceTheme">
        <a-radio value="github_dark">github_dark</a-radio>
        <a-radio value="github">github</a-radio>
        <a-radio value="chrome">chrome</a-radio>
      </a-radio-group>
    </div>
    <div class="mt-10">
      <span>语言</span>
      <a-radio-group v-model="aceLang">
        <a-radio value="javascript">javascript</a-radio>
        <a-radio value="xml">xml</a-radio>
        <a-radio value="json">json</a-radio>
        <a-radio value="html">html</a-radio>
        <a-radio value="java">java</a-radio>
      </a-radio-group>
    </div>
    <a-divider />
    <div class="mt-10">
      <a-button type="primary">按钮</a-button>
      <a-switch />
    </div>
    <div class="mt-10">
      <span>动态主题切换</span>
      <a-select @change="(v) => appStore.toggleCustomTheme(v as CustomTheme)">
        <a-option value="theme-default">theme-default</a-option>
        <a-option value="theme-green">theme-green</a-option>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import FlowEditor from '@/components/flow-editor/index.vue';
  import AceEditor, { LangType, ThemeType } from '@/components/ace-editor/index.vue';
  import { useAppStore } from '@/store';
  import { CustomTheme } from '@/store/modules/app/types';

  const currentValue = ref('');
  const initAce = (editor: any) => {
    // eslint-disable-next-line no-console
    console.log(editor.getOptions());
  };
  const aceTheme = ref<ThemeType>('github_dark');
  const aceLang = ref<LangType>('javascript');
  const appStore = useAppStore();
</script>

<style>
  .my-container {
    height: 100vh;
    padding: 16px 20px;
    padding-bottom: 0;
    background-color: #fff;
  }
</style>
