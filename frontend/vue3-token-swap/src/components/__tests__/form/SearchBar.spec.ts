import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { LucideSearch } from 'lucide-vue-next'

import SearchBar from '../../form/SearchBar.vue'

describe('SearchBar', () => {
  it('renders the input with the initial modelValue', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'initial value' },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial value')
  })

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })
    const input = wrapper.find('input')
    // Set new value in the input field
    await input.setValue('new value')
    // Check that the update:modelValue event was emitted with the new value.
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]).toEqual(['new value'])
  })

  it('renders the search icon', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })
    // Find the LucideSearch component by its name or CSS class.
    const icon = wrapper.findComponent(LucideSearch)
    expect(icon.exists()).toBe(true)
  })
})
