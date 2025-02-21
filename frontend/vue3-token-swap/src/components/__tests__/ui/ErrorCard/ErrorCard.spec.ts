import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import ErrorCard from '../../../ui/ErrorCard/ErrorCard.vue'

describe('ErrorCard', () => {
  it('should render the content', () => {
    const wrapper = mount(ErrorCard, {
      slots: {
        default: 'An error occurred.',
      },
    })
    expect(wrapper.text()).toContain('An error occurred.')
  })

  it('should render the retry button when the retry prop is provided', () => {
    const retryFn = vi.fn()
    const wrapper = mount(ErrorCard, {
      props: {
        retry: retryFn,
      },
      slots: {
        default: 'An error occurred.',
      },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Retry Now')
  })

  it('should not render the retry button when the retry prop is not provided', () => {
    const wrapper = mount(ErrorCard, {
      slots: { default: 'An error occurred.' },
    })
    // Since the retry button is only rendered if a retry prop is provided,
    // there should be no button in this case.
    const button = wrapper.find('button')
    expect(button.exists()).toBe(false)
  })

  it('calls the retry function when the retry button is clicked', async () => {
    const retryFn = vi.fn()
    const wrapper = mount(ErrorCard, {
      props: { retry: retryFn },
      slots: { default: 'An error occurred.' },
    })
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(retryFn).toHaveBeenCalled()
  })
})
