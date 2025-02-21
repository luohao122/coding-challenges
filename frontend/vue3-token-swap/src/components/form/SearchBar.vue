<template>
  <div class="flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-8 shadow-lg transition-shadow">
    <LucideSearch class="w-5 h-5 text-gray-500 dark:text-gray-300 mr-2" />
    <input
      v-model="inputValue"
      type="text"
      placeholder="Search for token prices..."
      class="w-full bg-transparent focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-gray-200"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { LucideSearch } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>
