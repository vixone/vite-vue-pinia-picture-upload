<script setup>

</script>

<template>
  <div class="w-screen h-screen mocha text-green-400 font-mono p-4 overflow-hidden flex items-center justify-center">
    <div class="overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.mocha {
  background-color: #1E1E2E;
}
</style>
