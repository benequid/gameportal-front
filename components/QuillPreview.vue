<template>
  <QuillEditor
    v-model:content="model"
    theme="bubble"
    :modules="modules"
    toolbar="none"
    read-only="true"
  />
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { ImageDrop } from 'quill-image-drop-module';

const model = defineModel()

const modules = {
  name: 'ImageDrop',
  module: ImageDrop,
};

</script>
