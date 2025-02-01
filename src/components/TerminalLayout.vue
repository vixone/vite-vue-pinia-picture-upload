<template>
  <div class="w-screen h-screen mocha text-green-400 font-mono p-4 overflow-hidden">
    <div class="h-full overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped>
.mocha {
  background-color: #1E1E2E;
}
</style>
