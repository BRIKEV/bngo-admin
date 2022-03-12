<template>
  <cropper
    class="cropper"
    :src="image.src"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default defineComponent({
  components: {
    Cropper,
  },

  setup() {
    const image = reactive({
      src:
        "https://images.unsplash.com/photo-1619737307100-55b82496fcda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      type: "image/jpg",
    });

    return {
      image,
    };
  },
});
</script>

<style>
.cropper {
  max-height: 500px;
}
</style>
