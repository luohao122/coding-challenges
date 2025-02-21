import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Footer from '../../../ui/Footer/Footer.vue'

describe('Footer', () => {
  it('should renders the left section of the footer', () => {
    const wrapper = mount(Footer)
    const footerLeft = wrapper.find('div#footer-left')

    expect(footerLeft.exists()).toBe(true)
    expect(footerLeft.text()).toContain('Taskman')
  })

  it('should renders the copyright section of the footer', () => {
    const wrapper = mount(Footer)
    const copyright = wrapper.find('div#copyright')

    expect(copyright.exists()).toBe(true)
    expect(copyright.text()).toContain('CodingWithHao.')
  })
})
