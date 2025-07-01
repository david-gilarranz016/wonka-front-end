<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';

  // State variables
  const features = ref([]);


  // When mounted, request the selected technology's features
  onMounted(async () => {
    // Request the features
    const response = await axios.get(`${process.env.VUE_APP_API_BASE}/web-shell/${$route.params.technology}`);
    response.forEach(f => f.selected = false);

    // Initialize the features
    features.value = response.filter(f => f.type === 'feature');
  });
</script>

<template>
  <div>
    <OptionGroup title="WebShell Features">
      <BasicOptionComponent v-for="f in features"
                            :key="f.key"
                            :id="f.key"
                            :label="f.name"
                            :description="f.description"
                            :selected="f.selected"
      />
    </OptionGroup>
    <OptionGroup title="Additional Protections" />
  </div>
</template>
