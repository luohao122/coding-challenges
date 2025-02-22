import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import SwapList from '../../../ui/SwapList/SwapList.vue'
import SwapItem from '../../../ui/SwapItem/SwapItem.vue'
import type { SwapRecord } from '../../../../types/token'

describe('SwapList', () => {
  it('renders the correct number of SwapItem components', () => {
    // Mock swap data
    const swaps: SwapRecord[] = [
      { fromCurrency: 'ATOM', toCurrency: 'ETH', fromAmount: 10, toAmount: 0.5 },
      { fromCurrency: 'USDC', toCurrency: 'ATOM', fromAmount: 100, toAmount: 14 },
    ]

    const wrapper = mount(SwapList, {
      props: { swaps },
      global: {
        stubs: {},
      },
    })

    // Ensure the correct number of SwapItem components
    const itemComponents = wrapper.findAllComponents(SwapItem)
    expect(itemComponents.length).toBe(swaps.length)
  })

  it('renders no SwapItem when the swaps array is empty', () => {
    const wrapper = mount(SwapList, {
      props: { swaps: [] },
    })
    // With no swaps, there should be no SwapItem
    expect(wrapper.findAllComponents(SwapItem)).toHaveLength(0)
  })
})
