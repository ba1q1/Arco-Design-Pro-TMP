<template>
  <div class="my-container">
    <div>流程编辑器</div>
    <FlowEditor />
    <a-divider />
    <div>ace编辑器</div>
  </div>
</template>

<script lang="ts" setup>
  import FlowEditor from '@/components/flow-editor/index.vue';
</script>

<style>
  .my-container {
    padding: 16px 20px;
    padding-bottom: 0;
    background-color: #fff;
  }
</style>
