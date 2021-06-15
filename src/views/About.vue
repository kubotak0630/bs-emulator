<template>
  <div class="about">
    <div class="wrap">
      <transition>
        <div v-show="isValid">This is an about page</div>
      </transition>
    </div>
  </div>
  <el-button type="primary" @click="handleClick">Primary</el-button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
export default defineComponent({
  name: "BankV",

  setup() {
    const isValid = ref(true);
    const handleClick = () => {
      isValid.value = !isValid.value;
    };
    return { isValid, handleClick };
  },
});
</script>

<style scoped lang="scss">
/* アニメーション中のスタイル */
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-active {
  transition: all 2s;
}
/* 表示アニメーション */
.v-enter-from {
  opacity: 0;
  // background-color: purple;
}
.v-enter-to {
  opacity: 1;
  // background-color: pink;
}

/* 非表示アニメーション */
.v-leave-from {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}

.wrap {
  height: 100px;
}
</style>
