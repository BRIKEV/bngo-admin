<template>
  <cropper
    class="cropper"
    ref="cropperRef"
    v-if="image.src"
    :src="image.src"
    :stencil-props="{
      aspectRatio: 77 / 90,
    }"
  />
  <div>
      <div class="button-wrapper">
        <label for="fileInput" class="button">
          Upload image
        </label>
        <input
          class="file-input"
          id="fileInput"
          type="file"
          @change="uploadImage($event)"
          accept="image/*"
        />
      </div>
      <button class="button" @click="cropImage()">Crop & upload image</button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import type { Image, CropperResultType } from './CropperBox.model';

const emit = defineEmits<{
  (eventName: 'img-cropped', croppedResult: CropperResultType, image: Image): void
}>()
const cropperRef = ref();
const image = reactive<Image>({
  src: null,
  name: 'default'
});

const uploadImage = (e: Event) => {
  const { files } = e.target as HTMLInputElement;
  // Ensure that you have a file before attempting to read it
  if (files && files[0]) {
    // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (image.src) {
      URL.revokeObjectURL(image.src);
    }
    // 2. Create the blob link to the file to optimize performance:
    const blob = URL.createObjectURL(files[0]);

    // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
    image.src = blob;
    image.name = files[0].name;
    image.type = files[0].type;
  }
};

const cropImage = () => {
  const result = cropperRef.value.getResult();
  if (image.type) {
    emit('img-cropped', result, image)
  }
};
</script>

<style>
.cropper {
  max-height: 500px;
}
</style>
