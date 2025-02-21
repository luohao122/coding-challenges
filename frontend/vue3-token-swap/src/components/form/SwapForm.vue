<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col gap-4 bg-white dark:bg-gray-800 py-4 rounded-lg mb-8 p-4"
  >
    <div class="flex items-center mb-2">
      <ArrowLeftRight class="w-5 h-5 mr-2 text-indigo-500" />
      <h5 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Swap</h5>
    </div>

    <!-- FROM CURRENCY -->
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-gray-700 dark:text-gray-300"> From Currency </label>
      <select
        v-model="fromCurrency"
        class="border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-gray-200"
      >
        <option disabled value="">-- Select a Token --</option>
        <!-- Dynamically populated from the 'currencies' prop -->
        <option v-for="symbol in currencies" :key="symbol" :value="symbol">
          {{ symbol }}
        </option>
      </select>
      <p v-if="fromCurrencyError" class="text-red-500 text-sm mt-1">
        {{ fromCurrencyError }}
      </p>
    </div>

    <!-- AMOUNT TO SEND -->
    <div class="flex flex-col">
      <label for="input-amount" class="mb-1 font-medium text-gray-700 dark:text-gray-300">
        Amount to send
      </label>
      <input
        id="input-amount"
        v-model="fromAmount"
        type="number"
        placeholder="e.g. 100"
        class="border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-gray-200"
      />
      <p v-if="fromError" class="text-red-500 text-sm mt-1">
        {{ fromError }}
      </p>
    </div>

    <!-- TO CURRENCY -->
    <div class="flex flex-col">
      <label class="mb-1 font-medium text-gray-700 dark:text-gray-300"> To Currency </label>
      <select
        v-model="toCurrency"
        class="border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-gray-200"
      >
        <option disabled value="">-- Select a Token --</option>
        <option v-for="symbol in currencies" :key="symbol" :value="symbol">
          {{ symbol }}
        </option>
      </select>
      <p v-if="toCurrencyError" class="text-red-500 text-sm mt-1">
        {{ toCurrencyError }}
      </p>
    </div>

    <!-- AUTO-COMPUTED AMOUNT TO RECEIVE -->
    <div class="flex flex-col">
      <label for="output-amount" class="mb-1 font-medium text-gray-700 dark:text-gray-300">
        Amount to receive
      </label>
      <input
        id="output-amount"
        :value="computedToAmount"
        type="number"
        disabled
        class="border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-gray-200"
      />
      <p v-if="toError" class="text-red-500 text-sm mt-1">
        {{ toError }}
      </p>
    </div>

    <!-- CONFIRM BUTTON -->
    <button
      type="submit"
      class="inline-flex items-center justify-center px-4 py-2 mt-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
    >
      CONFIRM SWAP
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import { ArrowLeftRight } from 'lucide-vue-next'
import { useTokenPriceStore } from '@/stores/token'
import type { TokenPrice } from '@/types/token'

// Props: an array of currency symbols
const props = defineProps<{
  currencies: string[]
}>()

// We emit an event 'swapConfirmed' with the final data
const emit = defineEmits<{
  (
    e: 'swapConfirmed',
    payload: {
      fromCurrency: string
      toCurrency: string
      fromAmount: number
      toAmount: number
    },
  ): void
}>()

// Local reactive state
const fromCurrency = ref('')
const toCurrency = ref('')
const fromAmount = ref<number | null>(null)

// We remove 'toAmount' from v-model and use a computed property for it
// We'll still keep an error message to show if the final computed is 0 or invalid
const fromError = ref('')
const toError = ref('')
const fromCurrencyError = ref('')
const toCurrencyError = ref('')

// Access the store to look up prices
const tokenPriceStore = useTokenPriceStore()

function getPrice(symbol: string): number | null {
  const found = tokenPriceStore.tokenPrices.find((tp: TokenPrice) => tp.currency === symbol)
  return found ? found.price : null
}

// Auto-calc the "toAmount"
const computedToAmount = computed<number>(() => {
  if (!fromCurrency.value || !toCurrency.value || !fromAmount.value) {
    return 0
  }
  const fromP = getPrice(fromCurrency.value)
  const toP = getPrice(toCurrency.value)
  if (!fromP || !toP) {
    return 0
  }
  // (fromAmount in 'fromCurrency' * fromPriceInUSD) / toPriceInUSD
  return (fromAmount.value * fromP) / toP
})

// Validate inputs before final submission
function validateInputs(): boolean {
  fromError.value = ''
  toError.value = ''
  fromCurrencyError.value = ''
  toCurrencyError.value = ''

  let isValid = true

  // Check currency selections
  if (!fromCurrency.value) {
    fromCurrencyError.value = 'Please select a from currency.'
    isValid = false
  }
  if (!toCurrency.value) {
    toCurrencyError.value = 'Please select a to currency.'
    isValid = false
  }
  if (fromCurrency.value && toCurrency.value && fromCurrency.value === toCurrency.value) {
    toCurrencyError.value = 'Cannot swap the same currency.'
    isValid = false
  }

  // Check fromAmount
  if (!fromAmount.value || fromAmount.value <= 0) {
    fromError.value = 'Amount to send must be greater than 0.'
    isValid = false
  }

  // Check if computedToAmount is valid
  if (computedToAmount.value <= 0) {
    toError.value = 'Calculated receive amount is invalid or zero.'
    isValid = false
  }

  return isValid
}

function onSubmit() {
  if (validateInputs()) {
    console.log(
      'Swapping:',
      fromAmount.value,
      fromCurrency.value,
      '→',
      computedToAmount.value,
      toCurrency.value,
    )

    // Emit the final data to the parent
    emit('swapConfirmed', {
      fromCurrency: fromCurrency.value,
      toCurrency: toCurrency.value,
      fromAmount: fromAmount.value as number,
      toAmount: computedToAmount.value,
    })
  }
}
</script>

<style scoped></style>
