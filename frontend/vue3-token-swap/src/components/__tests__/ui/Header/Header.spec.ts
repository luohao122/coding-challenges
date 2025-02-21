import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../../../ui/Header/Header.vue'

describe('Header', () => {
  it('renders logo inside a RouterLink', () => {
    const wrapper = mount(Header, {
      global: {
        // Stub RouterLink so we can test without vue-router
        stubs: {
          RouterLink: {
            template: '<a class="router-link"><slot /></a>',
          },
        },
      },
    })
    // Find a RouterLink component and check that it contains "Taskman"
    // using a CSS selector:
    const logoLink = wrapper.find('a.router-link')
    expect(logoLink.exists()).toBe(true)
    expect(logoLink.text()).toContain('Taskman')
  })

  it('toggles mobile menu when hamburger button is clicked', async () => {
    const wrapper = mount(Header, {
      global: {
        stubs: ['RouterLink'],
      },
    })
    // Mobile menu container has classes: "fixed top-0 right-0 h-full w-64 ..." with dynamic translate classes.
    const mobileMenu = wrapper.find('div.fixed.top-0.right-0.h-full.w-64')
    // Initially, the mobile menu should be off-screen, i.e. have class 'translate-x-full'
    expect(mobileMenu.classes()).toContain('translate-x-full')

    // Find the hamburger button (should be the first button in the header)
    const hamburgerButton = wrapper.find('button')
    await hamburgerButton.trigger('click')
    // After clicking, menu should slide in (class 'translate-x-0')
    expect(mobileMenu.classes()).toContain('translate-x-0')

    // Click the hamburger button again to close the menu.
    await hamburgerButton.trigger('click')
    expect(mobileMenu.classes()).toContain('translate-x-full')
  })

  it('closes mobile menu when a mobile menu link is clicked', async () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a class="router-link"><slot /></a>',
          },
        },
      },
    })
    // Open the mobile menu first.
    const hamburgerButton = wrapper.find('button')
    await hamburgerButton.trigger('click')

    const mobileMenu = wrapper.find('div.fixed.top-0.right-0.h-full.w-64')
    expect(mobileMenu.classes()).toContain('translate-x-0')

    // Find a mobile menu link inside the mobile menu.
    // Mobile menu links are within a <ul> with classes "flex flex-col space-y-4 p-4"
    const mobileLink = wrapper.find('ul.flex.flex-col.space-y-4.p-4 a.router-link')
    await mobileLink.trigger('click')
    // After clicking the link, the mobile menu should close.
    expect(mobileMenu.classes()).toContain('translate-x-full')
  })

  it('closes mobile menu when the backdrop is clicked', async () => {
    const wrapper = mount(Header, {
      global: {
        stubs: ['RouterLink'],
      },
    })
    // Open the menu first.
    const hamburgerButton = wrapper.find('button')
    await hamburgerButton.trigger('click')

    const mobileMenu = wrapper.find('div.fixed.top-0.right-0.h-full.w-64')
    expect(mobileMenu.classes()).toContain('translate-x-0')

    // Find the backdrop: it has classes "fixed inset-0 bg-black/50 lg:hidden z-40"
    // Because of the colon in the class name for opacity, escape it properly.
    const backdrop = wrapper.find('div.fixed.inset-0.bg-black\\/50.lg\\:hidden.z-40')
    expect(backdrop.exists()).toBe(true)
    await backdrop.trigger('click')
    // After clicking the backdrop, the mobile menu should close.
    expect(mobileMenu.classes()).toContain('translate-x-full')
  })
})
