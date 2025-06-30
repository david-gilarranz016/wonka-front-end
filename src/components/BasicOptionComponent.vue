<script setup>
  const props = defineProps({
    label: String,
    description: String,
    key: String
  });
</script>

<template>
  <button>{{label}}</button> 
</template>
