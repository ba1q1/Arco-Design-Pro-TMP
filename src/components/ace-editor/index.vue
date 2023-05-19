<template>
  <v-ace-editor
    :value="currentValue"
    :lang="props.lang"
    :theme="props.theme"
    :style="{ height: props.height, width: props.width }"
    @init="editorInit"
  />
</template>

<script lang="ts" setup>
  import { computed, PropType, ref, onUnmounted } from 'vue';
  import { VAceEditor } from 'vue3-ace-editor';
  import 'ace-builds/src-noconflict/ext-language_tools';
  import 'ace-builds/src-noconflict/ext-beautify';
  import 'ace-builds/src-noconflict/theme-github_dark';
  import 'ace-builds/src-noconflict/theme-github';
  import 'ace-builds/src-noconflict/theme-chrome';
  import 'ace-builds/src-noconflict/mode-javascript';
  import 'ace-builds/src-noconflict/mode-html';
  import 'ace-builds/src-noconflict/mode-xml';
  import 'ace-builds/src-noconflict/mode-json';
  import 'ace-builds/src-noconflict/mode-java';

  export type LangType = 'javascript' | 'html' | 'xml' | 'json' | 'java';
  export type ThemeType = 'github_dark' | 'github' | 'chrome';

  const props = defineProps({
    content: {
      type: String,
      required: true,
      default: '',
    },
    init: {
      type: Function,
    },
    lang: {
      type: String as PropType<LangType>,
      default: 'javascript',
    },
    theme: {
      type: String as PropType<ThemeType>,
      default: 'github_dark',
    },
    height: {
      type: String,
      default: '500px',
    },
    width: {
      type: String,
      default: '100%',
    },
  });

  const emit = defineEmits(['update:content']);
  const editorInstance = ref<any>(null);

  const currentValue = computed({
    get() {
      return props.content;
    },
    set(val) {
      emit('update:content', val);
    },
  });

  const editorInit = (editor: any) => {
    if (props.init) props.init(editor);
    editorInstance.value = editor;
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: false,
      enableLiveAutocompletion: true,
    });
  };

  onUnmounted(() => {
    editorInstance.value.destroy();
  });
</script>
