<template>
  <BkHeader
    logo
    title="Bngo app"
  />
  <main>
    <CropperBox
      @img-cropped="uploadImage"
    />
  </main>
</template>
<script setup lang="ts">
import CropperBox from '@/components/CropperBox.vue';
import type { CropperResultType, Image } from '@/components/CropperBox.model';
import * as api from '@/api/upload';
import BkHeader from '../components/Core/BkHeader/BkHeader.vue';

const uploadImage = (croppedResult: CropperResultType, image: Image) => {
  const { canvas } = croppedResult;
  if (canvas) {
    const form = new FormData();
    canvas.toBlob(blob => {
      form.append('file', blob as Blob, image.name);
      // You can use axios, superagent and other libraries instead here
      api.uploadImage(form);
      // Perhaps you should add the setting appropriate file format here
    }, image.type);
  }
};
</script>
<style>
@import '@/assets/base.css';

.button {
  cursor: pointer;
  background-color: var(--vt-c-white-soft);
  color: var(--vt-c-black);
  padding: 10px;
  border-radius: 5px;
}
.file-input {
  display: none;
}
</style>