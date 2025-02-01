<template>
  <div class="h-full overflow-y-auto" @click="focusInput">
    <div v-for="(line, index) in history" :key="index" class="mb-1">
      {{ line }}
    </div>
    <div class="flex items-center">
      <span class="mr-2">$</span>
      <input ref="terminalInput" v-model="command" @keyup.enter="processCommand"
        class="bg-transparent border-none outline-none text-green-400 w-full" autofocus />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const history = ref(["Welcome to the room!", "Type 'help' for commands."]);
const command = ref("");
const terminalInput = ref(null);

function processCommand() {
  if (command.value.trim() === "") return;
  history.value.push(`$ ${command.value}`);
  handleGameLogic(command.value);
  command.value = "";

  nextTick(() => {
    terminalInput.value?.scrollIntoView({ behavior: "smooth" });
  });
}

function handleGameLogic(cmd) {
  const responses = {
    help: "Available commands: start, look, inventory, quit",
    start: "Surrounded by white walls, you see 3 doors in front of you",
    look: "It's too dark to see anything.",
    inventory: "You have nothing.",
    quit: "Thanks for playing!",
  };
  history.value.push(responses[cmd] || "Unknown command.");
}

function focusInput() {
  terminalInput.value?.focus();
}
</script>

<style scoped>
/* Optional blinking cursor */
input:focus::after {
  content: "|";
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
