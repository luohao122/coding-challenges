import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import SwapForm from '../../../components/form/SwapForm.vue'

vi.mock('@/stores/token', () => {
  return {
    useTokenPriceStore: () => ({
      tokenPrices: [
        { currency: 'ATOM', price: 10 },
        { currency: 'ETH', price: 2000 },
        { currency: 'USDC', price: 1 },
      ],
      isLoading: false,
      error: null,
    }),
  }
})

describe('SwapForm.vue', () => {
  // Helper function to mount the component
  function createWrapper(currencies: string[]) {
    return mount(SwapForm, {
      props: {
        currencies,
      },
    })
  }

  it('renders properly with currency options', () => {
    const wrapper = createWrapper(['ATOM', 'ETH', 'USDC'])
    // Check that the select lists contain the correct currency options
    const selects = wrapper.findAll('select')
    expect(selects).toHaveLength(2) // fromCurrency, toCurrency

    // The first select should have 4 options including the disabled
    const options1 = selects[0].findAll('option')
    expect(options1).toHaveLength(4) // -- Select a Token -- + 3 currencies

    // The second select also 4
    const options2 = selects[1].findAll('option')
    expect(options2).toHaveLength(4)
  })

  it('shows validation errors and does not emit if invalid input', async () => {
    const wrapper = createWrapper(['ATOM', 'ETH', 'USDC'])

    // Try to submit immediately (no selections, no amount)
    await wrapper.find('form').trigger('submit.prevent')

    // Should not emit anything
    expect(wrapper.emitted('swapConfirmed')).toBeUndefined()

    // Check at least one error is displayed
    // e.g., "Please select a from currency." or "Amount to send must be greater than 0."
    expect(wrapper.text()).toContain('Please select a from currency.')
    expect(wrapper.text()).toContain('Amount to send must be greater than 0.')
  })

  it('emits swapConfirmed with correct payload when valid input', async () => {
    const wrapper = createWrapper(['ATOM', 'ETH', 'USDC'])

    // Set valid data
    // 1) fromCurrency -> "ATOM"
    const fromSelect = wrapper.findAll('select')[0]
    await fromSelect.setValue('ATOM')

    // 2) fromAmount -> 10
    const fromAmountInput = wrapper.find('#input-amount')
    await fromAmountInput.setValue('10')

    // 3) toCurrency -> "ETH"
    const toSelect = wrapper.findAll('select')[1]
    await toSelect.setValue('ETH')

    // Submit
    await wrapper.find('form').trigger('submit.prevent')

    // Now, using the mock store:
    // fromCurrency price = 10 (assuming 1 ATOM => $10)
    // toCurrency price = 2000 (assuming 1 ETH => $2000)
    // fromAmount = 10 ATOM => $100 total
    // => toAmount = $100 / 2000 = 0.05 ETH

    // Check event
    const emitted = wrapper.emitted('swapConfirmed')
    expect(emitted).toBeTruthy()
    // Should only be 1 event
    expect(emitted?.length).toBe(1)

    // The payload is in emitted[0][0]
    const payload = emitted![0][0]
    expect((payload as any).fromCurrency).toBe('ATOM')
    expect((payload as any).toCurrency).toBe('ETH')
    expect((payload as any).fromAmount).toBe(10)
    expect((payload as any).toAmount).toBeCloseTo(0.05, 5)
    // (using toBeCloseTo because floating precision can differ)
  })
})
