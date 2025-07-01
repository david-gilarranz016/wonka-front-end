<script setup>
  import axios from 'axios';
  import { onMounted, ref, computed } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import InputOptionComponent from './InputOptionComponent.vue';

  // State variables
  const features = ref([]);
  const protections = ref([]);

  // Computed properties to distinguish between basic and non input-based protections
  const basicProtections = computed(() => protections.value.filter(p => p.input === undefined));
  const inputProtections = computed(() => protections.value.filter(p => p.input !== undefined));

  // When mounted, request the selected technology's features
  onMounted(async () => {
    // Request the features
    const response = await axios.get(`${process.env.VUE_APP_API_BASE}/web-shell/${$route.params.technology}`);
    response.forEach(f => f.selected = false);

    // Initialize the features and protection arrays
    features.value = response.filter(f => f.type === 'feature');
    protections.value = response.filter(f => f.type === 'security');
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
    <OptionGroup title="Additional Protections">
      <BasicOptionComponent v-for="p in basicProtections"
                            :key="p.key"
                            :id="p.key"
                            :label="p.name"
                            :description="p.description"
                            :selected="p.selected"
      />
      <InputOptionComponent v-for="p in inputProtections"
                            :key="p.key"
                            :id="p.key"
                            :label="p.name"
                            :description="p.description"
                            :placeholder="p.input.placeholder"
                            :argument-name="p.input.key"
                            :selected="p.selected"
      />
    </OptionGroup>
  </div>
</template>
