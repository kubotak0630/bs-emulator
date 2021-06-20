<template>
  <div class="rm-wrapper">
    <!-- transitionをかけるのは一番下のセルだけ -->
    <div v-if="isRemoveTransition">
      <transition>
        <div class="rm" :class="{ 'now-delete': !rmObj.enable }" v-show="rmObj.enable">
          {{ rmObj.num }}
        </div>
      </transition>
    </div>
    <div v-else>
      <div class="rm" v-show="rmObj.enable">{{ rmObj.num }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';
import { RmType } from '@/types/commonTypes';

export default defineComponent({
  name: 'RmV',
  props: {
    rmObj: {
      type: Object as PropType<RmType>,
      required: true,
    },
    //削除時のtransitonのON/OFF
    isRemoveTransition: {
      type: Boolean,
      required: false,
      default: false,
    },
    //オブジェクトの特定のためのデバッグに使用(0-7)
    posIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped lang="scss">
.rm-wrapper {
  width: 96px;
  height: 26px;
  margin-top: 1px;
  margin-left: 2px;
  // background-color: purple;
}

.rm {
  text-align: center;
  height: 24px;
  background-color: pink;
  border: solid 1px blue;
}

// 消える瞬間に当たるスタイル。
.now-delete {
  opacity: 0.7;
  height: 20px;
  // background-color: pink;
  border: solid 3px blue;
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
  transition-delay: 200ms;
  transition-timing-function: linear;
}
</style>
