<script setup>
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import { APIResponse } from './APIResponse.js';
  import { GenerationRequest } from './GenerationRequest.js';

  const router = useRouter();

  const formatsDescription = 'Select the desired output format for the generated web shell';
  const optionsDescription = 'Select additional operations to be performed to the generated shell';

  // Create computed properties for both output formats and options
  const formats = computed(() => APIResponse.features.filter(f => f.type === 'output,format'));
  const options = computed(() => APIResponse.features.filter(f => f.type === 'output,option'));

  // When the component is mounted, unselect all options
  onMounted(() => {
    // Set all formats and options to unselected
    APIResponse.features.filter(f => f.type.startsWith('output')).forEach(format => {
      format.selected = false; 
    });

    // Initialize all options to false
    options.value.forEach(option => GenerationRequest.setOutputOption(option.key, false));
  });

  // Handler for format selection events
  const onFormatSelected = (format) => {
    // Add the format to the GenerationRequest
    GenerationRequest.setOutputFormat(format.key);

    // Unselect all other formats
    formats.value.forEach(f => {
      if (f.key === format.key) {
        f.selected = true;
      } else {
        f.selected = false;
      }
    });
  };

  const onFormatDeselected = (format) => {
    // Reset the output format
    GenerationRequest.setOutputFormat('');

    // Unselect the component
    formats.value.forEach(f => {
      if (f.key === format.key) {
        f.selected = false;
      }
    });
  };

  const onOptionSelected = (option) => {
    // Set the option as true
    GenerationRequest.setOutputOption(option.key, true);

    // Select the component
    options.value.forEach(o => {
      if (o.key === option.key) {
        o.selected = true;
      }
    });
  }

  const onOptionDeselected = (option) => {
    // Set the option as true
    GenerationRequest.setOutputOption(option.key, false);

    // Select the component
    options.value.forEach(o => {
      if (o.key === option.key) {
        o.selected = false;
      }
    });
  }

  const onNavigate = () => {
    if (GenerationRequest.request.output.format !== '') {
      router.push('/client');
    }
  }
</script>

<template>
  <div>
    <div class="mb-10">
      <OptionGroup title="Output Formats" :description="formatsDescription">
        <BasicOptionComponent v-for="f in formats"
                              :key="f.key"
                              :id="f.key"
                              :label="f.name"
                              :description="f.description"
                              :selected="f.selected"
                              @selected="onFormatSelected"
                              @deselected="onFormatDeselected"
        />
      </OptionGroup>
    </div>
    <div class="mb-10">
      <OptionGroup title="Additional Options" :description="optionsDescription">
        <BasicOptionComponent v-for="o in options"
                              :key="o.key"
                              :id="o.key"
                              :label="o.name"
                              :description="o.description"
                              :selected="o.selected"
                              @selected="onOptionSelected"
                              @deselected="onOptionDeselected"
        />
      </OptionGroup>
    </div>
    <div class="flex justify-center">
      <button class="btn" id="navigation-button" @click="onNavigate">Continue</button>
    </div>
  </div>
</template>
