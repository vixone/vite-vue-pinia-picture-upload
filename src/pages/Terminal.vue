<template>
  <div class="w-screen h-screen bg-black text-green-400 font-mono p-4 overflow-hidden" @click="focusInput">
    <div class="h-full overflow-y-auto">
      <div v-for="(line, index) in history" :key="index" class="mb-1">
        {{ line }}
      </div>
      <div class="flex items-center">
        <span class="mr-2">$</span>
        <input ref="terminalInput" v-model="command" @keyup.enter="processCommand"
          class="bg-transparent border-none outline-none text-green-400 w-full" autofocus />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: ["Welcome to the game!", "Type 'help' for commands."],
      command: "",
    };
  },
  methods: {
    processCommand() {
      if (this.command.trim() === "") return;
      this.history.push(`$ ${this.command}`);
      this.handleGameLogic(this.command);
      this.command = "";
      this.$nextTick(() => {
        this.$refs.terminalInput.scrollIntoView({ behavior: "smooth" });
      });
    },
    handleGameLogic(cmd) {
      const responses = {
        help: "Available commands: start, look, inventory, quit",
        start: "You wake up in a dark forest...",
        look: "It's too dark to see anything.",
        inventory: "You have nothing.",
        quit: "Thanks for playing!",
      };
      this.history.push(responses[cmd] || "Unknown command.");
    },
    focusInput() {
      this.$refs.terminalInput.focus();
    },
  },
};
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

