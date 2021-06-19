<template>
  <div class="element-wrapper">
    <div v-if="isRemoveTransition">
      <transition>
        <div class="element" v-show="elObj.enable">{{ elObj.num }}</div>
      </transition>
    </div>
    <div v-else>
      <div class="element" v-show="elObj.enable">{{ elObj.num }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RmType } from '@/types/commonTypes';

export default defineComponent({
  name: 'FifoElementV',
  props: {
    elObj: {
      type: Object as PropType<RmType>,
      required: true,
    },
    //削除時のtransitonのON/OFF
    isRemoveTransition: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.element-wrapper {
  width: 40px;
  height: 40px;
  margin-top: 3px;
  margin-left: 3px;
  // background-color: orange;
  // border: solid 1px orange;
}

.element {
  width: 38px;
  height: 38px;
  background-color: pink;
  border: solid 1px blue;
  line-height: 38px;
  text-align: center;
}

/* 非表示アニメーション動作後のスタイル */
.v-leave-to {
  transform: scaleY(0);
  // transform: scaleX(0);
}

/* 非表示アニメーション動作中のスタイル */
.v-leave-active {
  transition-property: all;
  transition-duration: 250ms;
  transition-delay: 0ms;
  transition-timing-function: linear;
}
</style>
