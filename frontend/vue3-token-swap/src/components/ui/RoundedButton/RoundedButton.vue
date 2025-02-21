<template>
  <button
    @click="$emit('click')"
    :class="['text-sm font-medium rounded-full px-3 py-1', variants[variant]]"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  variant: {
    type: String as PropType<'default' | 'danger'>,
    default: 'default',
  },
})

const variants: Record<'default' | 'danger', string> = {
  default: 'border border-gray-200 hover:bg-gray-100',
  danger: 'bg-red-200 enabled:hover:bg-red-100 text-red-900',
}

defineEmits<{
  (e: 'click'): void
}>()
</script>
