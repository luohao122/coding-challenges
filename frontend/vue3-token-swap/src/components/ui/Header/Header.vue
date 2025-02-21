<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="sticky top-0 bg-primary shadow-md z-50 dark:bg-gray-800">
    <nav>
      <div class="container mx-auto flex justify-between items-center p-4">
        <!-- Logo -->
        <RouterLink to="/">
          <h1 class="text-2xl font-bold text-white">Swappy</h1>
        </RouterLink>

        <!-- Hamburger Button (Mobile) -->
        <button @click="toggleMenu" class="text-white lg:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <!-- Navigation Menu (Desktop) -->
        <ul class="hidden lg:flex lg:space-x-6 lg:items-center">
          <li>
            <RouterLink class="block text-white hover:text-yellow-400 py-2" to="/">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink class="block text-white hover:text-yellow-400 py-2" to="/settings">
              Settings
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Mobile Slide-In Menu -->
      <div
        class="fixed top-0 right-0 h-full w-64 bg-primary text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50"
        :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="p-4 flex justify-between items-center">
          <h2 class="text-xl font-bold">Menu</h2>
          <button @click="toggleMenu" class="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul class="flex flex-col space-y-4 p-4">
          <li>
            <RouterLink
              @click="closeMenu"
              class="block text-white hover:text-yellow-400 py-2"
              to="/"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              @click="closeMenu"
              class="block text-white hover:text-yellow-400 py-2"
              to="/settings"
            >
              Settings
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Backdrop -->
      <div
        v-if="menuOpen"
        @click="closeMenu"
        class="fixed inset-0 bg-black/50 lg:hidden z-40"
      ></div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// State for mobile menu
const menuOpen = ref(false)

// Toggle menu function
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// Close menu when clicking a link or backdrop
const closeMenu = () => {
  menuOpen.value = false
}
</script>
