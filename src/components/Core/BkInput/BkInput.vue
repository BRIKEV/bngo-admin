<template>
  <div class="input-container">
    <label :for="id" :class="color">{{ label }}</label>
    <input
      :data-cy="dataCy"
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      required
      :class="color"
      @input="$emit('input', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineEmits<{
  (eventName: 'input', value: string): void
}>()

defineProps({
  title: String,
  logo: Boolean,
  dataCy: String,
  value: String,
  name: String,
  type: String,
  label: String,
  placeholder: String,
  required: Boolean,
  color: String,
  id: String,
});
</script>
<style lang="scss" scoped>
  @import "@/theme/index.scss";
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: calculateRem(30px) 0;
    input {
      border-radius: 5px;
      width: 100%;
      font-size: $fs-large;
      padding: 20px 10px;
    }
    label {
      color: $white;
      font-size: $fs-large;
      font-weight: 700;
      transition: all .3s ease;
      padding: 5px 10px;
      &.primary {
        color: $white;
      }
      &.secundary {
        color: $black;
      }
    }
  }
</style>
