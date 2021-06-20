<template>
  <div class="home">
    <BsTopV />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BankV from '@/components/BankV.vue'; // @ is an alias to /src
import BsTopV from '@/components/BsTopV.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BsTopV,
  },
});
</script>
