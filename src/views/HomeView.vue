<template>
  <BkHeader
    logo
    title="Bngo app"
  />
  <main>
    <form class="form-container" novalidate @onsubmit="submitImage">
      <BkInput
        required
        name="game"
        placeholder="game name"
        id="game"
        label="game name"
        :value="gameName"
        @input="setGameName"
      />
      <CropperBox
        @img-cropped="uploadImage"
      />
      <button type="submit">submit image</button>
    </form>
  </main>
</template>
<script setup lang="ts">
import CropperBox from '@/components/CropperBox.vue';
import type { CropperResultType, Image } from '@/components/CropperBox.model';
import * as api from '@/api/upload';
import BkHeader from '../components/Core/BkHeader/BkHeader.vue';
import BkInput from '../components/Core/BkInput/BkInput.vue';

let gameName = '';
let imageName = '';
let cropImage: Blob | null = null;

const setGameName = (value: string) => {
  gameName = value
};

const uploadImage = (croppedResult: CropperResultType, image: Image) => {
  const { canvas } = croppedResult;
  if (canvas) {
    const form = new FormData();
    canvas.toBlob(blob => {
      cropImage = blob;
      imageName = image.name;
      form.append('file', blob as Blob, image.name);
    }, image.type);
  }
};

const submitImage = async () => {
  const form = new FormData();
  if (imageName && gameName) {
    form.append('file', cropImage as Blob, imageName);
    form.append('gameName', gameName);
    // You can use axios, superagent and other libraries instead here
    await api.uploadImage(form);
    // Perhaps you should add the setting appropriate file format here
  }
}
</script>
<style>
@import '@/assets/base.css';
.form-container {
  max-width: 600px;
  margin: 10px auto;
}
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