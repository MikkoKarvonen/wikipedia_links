<script setup lang="ts">
defineProps<{
  label: string;
  type: string;
  max?: string;
  min?: string;
  value?: string;
}>();
</script>

<template>
  <div>
    <label>{{ label }}</label>
    <input :type="type" :max="max" :min="min" :value="value" />
  </div>
</template>
