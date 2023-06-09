﻿<template>
  <div :disabled="commandDisabled">
    <a-button class="delete-btn" shape="circle" @click="execCommand()">
      <template #icon>
        <icon-delete />
      </template>
    </a-button>
    <template v-for="(item, pIndex) in priorityCount + 1">
      <a-button
        v-if="pIndex != 0"
        :key="item"
        class="priority-btn"
        :class="'priority-btn_' + pIndex"
        size="small"
        @click="execCommand(pIndex)"
      >
        {{ priorityPrefix }}{{ priorityStartWithZero ? pIndex - 1 : pIndex }}
      </a-button>
    </template>
  </div>
</template>

<script lang="ts" name="sequenceBox" setup>
  import { onMounted, reactive, nextTick, ref } from 'vue';
  import { isDisableNode, setPriorityView } from '../../script/tool/utils';
  import { priorityProps } from '../../props';

  const props = defineProps(priorityProps);

  const commandValue = ref('');
  const commandDisabled = ref(true);
  let minder = reactive<any>({});

  const isDisable = (): boolean => {
    if (Object.keys(minder).length === 0) return true;
    nextTick(() => {
      setPriorityView(props.priorityStartWithZero, props.priorityPrefix);
    });
    if (minder.on) {
      minder.on('interactchange', () => {
        commandValue.value = minder.queryCommandValue && minder.queryCommandValue('priority');
      });
    }
    const node = minder.getSelectedNode();
    if (isDisableNode(minder) || !node || node.parent === null) {
      return true;
    }
    if (props.priorityDisableCheck) {
      return props.priorityDisableCheck();
    }
    return !!minder.queryCommandState && minder.queryCommandState('priority') === -1;
  };

  onMounted(() => {
    nextTick(() => {
      minder = window.minder;
      const freshFuc = setPriorityView;
      if (minder.on) {
        minder.on('contentchange', () => {
          // 异步执行，否则执行完，还会被重置
          setTimeout(() => {
            freshFuc(props.priorityStartWithZero, props.priorityPrefix);
          }, 0);
        });
        minder.on('selectionchange', () => {
          commandDisabled.value = isDisable();
        });
      }
    });
  });

  function execCommand(index?: number) {
    if (index && minder.execCommand) {
      if (!commandDisabled.value) {
        minder.execCommand('priority', index);
      }
      setPriorityView(props.priorityStartWithZero, props.priorityPrefix);
    } else if (minder.execCommand && !commandDisabled.value) {
      minder.execCommand('priority');
    }
  }
</script>

<style lang="less" scoped>
  .delete-btn {
    margin: 0 4px;
    padding: 2px !important;
    width: 23px;
    height: 23px;
    i {
      width: 1em !important;
      height: 1em !important;
    }
  }
  .priority-btn {
    margin-right: 4px;
    padding: 0;
    padding-right: 5px;
    width: 22px;
    height: 22px;
    font-size: 12px;
    border: 0;
    border-radius: 8px;
    color: white;
    font-style: italic;
  }
  .priority-btn_1 {
    border-bottom: 3px solid #840023;
    background-color: #ff1200;
  }
  .priority-btn_1:hover {
    border-bottom: 3px solid #840023;
    color: white;
    background-color: #ff1200;
  }
  .priority-btn_2 {
    border-bottom: 3px solid #01467f;
    background-color: #0074ff;
  }
  .priority-btn_2:hover {
    border-bottom: 3px solid #01467f;
    color: white;
    background-color: #0074ff;
  }
  .priority-btn_3 {
    border-bottom: 3px solid #006300;
    background-color: #00af00;
  }
  .priority-btn_3:hover {
    border-bottom: 3px solid #006300;
    color: white;
    background-color: #00af00;
  }
  .priority-btn_4 {
    border-bottom: 3px solid #b25000;
    background-color: #ff962e;
  }
  .priority-btn_4:hover {
    border-bottom: 3px solid #b25000;
    color: white;
    background-color: #ff962e;
  }
  .priority-btn_5 {
    border-bottom: 3px solid #4720c4;
    background-color: #a464ff;
  }
  .priority-btn_5:hover {
    border-bottom: 3px solid #4720c4;
    color: white;
    background-color: #a464ff;
  }
  .priority-btn_6 {
    border-bottom: 3px solid #515151;
    background-color: #a3a3a3;
  }
  .priority-btn_6:hover {
    border-bottom: 3px solid #515151;
    color: white;
    background-color: #a3a3a3;
  }
</style>
