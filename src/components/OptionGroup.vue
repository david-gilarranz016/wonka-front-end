<script setup>
  const props = defineProps({
    title: String,
    description: String
  });
</script>

<template>
  <h2 class="title">{{props.title}}</h2>
  <p>{{ description }}</p>
  <div class="flex justify-center">
    <slot/>
  </div>
</template>
