<template>
  <div class="priptr-container">
    <div class="wrapper">
      <transition appear>
        <div class="ptr rotate-l" v-if="lo_valid">L</div>
      </transition>
    </div>
    <div class="wrapper">
      <transition>
        <div class="ptr rotate-m" v-show="middle_valid">M</div>
      </transition>
    </div>
    <div class="wrapper">
      <transition>
        <div class="ptr rotate-h" v-show="high_valid">H</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';

export default defineComponent({
  name: 'PriorityPtrV',
  props: {
    lo_valid: {
      type: Boolean,
      required: true,
    },
    middle_valid: {
      type: Boolean,
      required: true,
    },
    high_valid: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped lang="scss">
.priptr-container {
  position: relative;
  display: flex;
  top: 20px;
}

// 空箱
.wrapper {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}

.ptr {
  display: inline-block;
  height: 20px;
  width: 20px;
  line-height: 20px;
  border-radius: 50px;
  text-align: center;
  color: #202020;
  font-weight: bold;
  font-size: 15px;

  &.rotate-l {
    background-color: #edcf6b;
  }

  &.rotate-m {
    background-color: #f37358;
  }

  &.rotate-h {
    background-color: #d64f64;
  }
}

/* アニメーション中のスタイル */
.v-leave-active,
.v-enter-active {
  transition: opacity 1s;
}

/* 表示アニメーション */
.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}

/* 非表示アニメーション */
.v-leave-from {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>
