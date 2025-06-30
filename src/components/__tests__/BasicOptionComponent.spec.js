import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BasicOptionComponent from '../BasicOptionComponent.vue'

describe('BasicOptionComponent', () => {
  it('Displays the label', () => {
    // Render the Component
    const props = {
      label: 'Test',
      key: 'test',
      description: 'Test description'    
    }
    const wrapper = mount(BasicOptionComponent, { props });

    // Expect it to contain the title
    expect(wrapper.text()).toContain(props.label);
  });
});
