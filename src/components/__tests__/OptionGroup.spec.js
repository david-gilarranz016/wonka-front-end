import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import OptionGroup from '../OptionGroup.vue'

describe('OptionGroup', () => {
  it('shows the title', () => {
    // Mount the component 
    const title = 'Test title';
    const wrapper = mount(OptionGroup, { props: { title, description: '' } });

    // Check that the component renders the title
    expect(wrapper.text()).toContain(title);
  });

  it('shows nested components', () => {
    // Mount the component 
    const slot = `<p>slotted component</p>`;
    const wrapper = mount(OptionGroup, { props: { title: 'Title', description: '' }, slots: { default: slot } });

    // Check that the component renders the title
    expect(wrapper.text()).toContain('slotted component');
  });

  it('shows description', () => {
    // Mount the component 
    const description = 'Group description';
    const wrapper = mount(OptionGroup, { props: { title: 'Title', description } });

    // Expect the description to be present
    expect(wrapper.text()).toContain(description);
  });
});
