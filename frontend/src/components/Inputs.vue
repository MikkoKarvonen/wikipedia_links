<script setup lang="ts">
import Input from "./Input.vue";
</script>

<template>
  <div class="inputs">
    <Input label="Initial page" type="text" />
    <Input label="Height" type="number" max="4" min="1" value="1" />
    <Input label="Depth" type="number" max="4" min="1" value="1" />
    <button>Get links</button>
  </div>
</template>
