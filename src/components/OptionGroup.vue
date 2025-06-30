<script setup>
  const props = defineProps({
    title: String
  });
</script>

<template>
  <div>
    <h2>{{props.title}}</h2>
    <slot/>
  </div>
</template>
