<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-primary text-white dark:bg-gray-800">
    <div class="container mx-auto py-6 px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Left section -->
        <div id="footer-left" class="text-center md:text-left">
          <h2 class="text-xl font-bold">Swappy</h2>
          <p class="mt-2 text-sm">A simple token price swap app</p>
        </div>
      </div>
      <!-- Divider -->
      <div class="border-t border-gray-300 my-4"></div>
      <!-- Copyright section -->
      <div id="copyright" class="text-center">
        <p class="text-xs">
          {{ `&#169; ${new Date().getFullYear()} CodingWithHao. All rights reserved.` }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
