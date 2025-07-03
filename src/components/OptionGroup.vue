<script setup>
  const props = defineProps({
    title: String
  });
</script>

<template>
  <h2 class="title">{{props.title}}</h2>
  <div class="flex justify-center">
    <slot/>
  </div>
</template>
