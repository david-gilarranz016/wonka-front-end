import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import OptionGroup from '../OptionGroup.vue'

describe('OptionGroup', () => {
  it('shows the title', () => {
    // Mount the component 
    const title = 'Test title';
    const wrapper = mount(OptionGroup, { props: { title } });

    // Check that the component renders the title
    expect(wrapper.text()).toContain(title);
  });

  it('shows nested components', () => {
    // Mount the component 
    const slot = `<p>slotted component</p>`;
    const wrapper = mount(OptionGroup, { props: { title: 'Title' }, slots: { default: slot } });

    // Check that the component renders the title
    expect(wrapper.text()).toContain('slotted component');
  });
});
