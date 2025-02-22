import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import SwapItem from '../../../ui/SwapItem/SwapItem.vue'
import type { SwapRecord } from '../../../../types/token'

describe('SwapItem', () => {
  it('renders the from and to info properly', () => {
    const swap: SwapRecord = {
      fromCurrency: 'ATOM',
      toCurrency: 'USDC',
      fromAmount: 10,
      toAmount: 20,
    }

    const wrapper = mount(SwapItem, {
      props: { swap },
    })

    // 1) Check text for "from" side
    expect(wrapper.text()).toContain('10 ATOM')
    // 2) Check text for "to" side
    expect(wrapper.text()).toContain('20 USDC')

    // 3) Check images
    const imgs = wrapper.findAll('img')
    expect(imgs).toHaveLength(2)

    // The from image src
    expect(imgs[0].attributes('src')).toContain('/ATOM.svg')
    // The to image src
    expect(imgs[1].attributes('src')).toContain('/USDC.svg')
  })
})
