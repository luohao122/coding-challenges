import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import RoundedButton from '../../../ui/RoundedButton/RoundedButton.vue'

describe('RoundedButton', () => {
  it('renders default slot content when none is provided', () => {
    const wrapper = mount(RoundedButton)
    // Default slot should be "Button"
    expect(wrapper.text()).toContain('Button')
  })

  it('renders custom slot content', () => {
    const wrapper = mount(RoundedButton, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('applies the default variant classes', () => {
    const wrapper = mount(RoundedButton)
    // The default variant should be "default", which maps to 'border border-gray-200 hover:bg-gray-100'
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-gray-200')
    expect(wrapper.classes()).toContain('hover:bg-gray-100')
  })

  it('applies the danger variant classes', () => {
    const wrapper = mount(RoundedButton, {
      props: { variant: 'danger' },
    })
    // Danger variant should have classes: 'bg-red-200 enabled:hover:bg-red-100 text-red-900'
    expect(wrapper.classes()).toContain('bg-red-200')
    expect(wrapper.classes()).toContain('text-red-900')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(RoundedButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })
})
