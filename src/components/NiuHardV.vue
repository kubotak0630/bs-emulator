<template>
  <div class="niu-wapper">
    <div class="v-fifo-wrapper">
      <FifoElementV :elObj="copyFillAry[7]" />
      <FifoElementV :elObj="copyFillAry[6]" />
      <FifoElementV :elObj="copyFillAry[5]" />
      <FifoElementV :elObj="copyFillAry[4]" />
    </div>

    <div class="dummy"></div>

    <div class="h-fifo-wrapper">
      <FifoElementV :elObj="copyFillAry[3]" />
      <FifoElementV :elObj="copyFillAry[2]" />
      <FifoElementV :elObj="copyFillAry[1]" />
      <FifoElementV :elObj="copyFillAry[0]" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import FifoElementV from '@/components/FifoElementV.vue';
import { RmType } from '@/types/commonTypes';

export default defineComponent({
  name: 'NiuHardV',
  components: {
    FifoElementV,
  },
  props: {
    fifoElAry: {
      type: Object as PropType<RmType[]>,
      required: true,
    },
  },
  setup(props) {
    const copyFillAry = computed(() => {
      const copyAry = Array.from(props.fifoElAry);
      const len = copyAry.length;
      //８個以下のときにDummyの配列を追加
      for (let i = 0; i < 8 - len; i++) {
        copyAry.push({ num: 255, enable: false });
      }

      return copyAry;
    });

    return { copyFillAry };
  },
});
</script>

<style scoped lang="scss">
.niu-wapper {
  position: relative;
  height: 180px;
}

.v-fifo-wrapper {
  width: 46px;
  height: 125px;
  // // border-bottom: solid 3px red;
  border-left: solid 3px red;
  border-right: solid 3px red;
}

// .lower-left-fifo-wrapper {
//   width: 44px;
//   border-left: solid 3px orange;
//   border-bottom: solid 3px orange;
// }

.h-fifo-wrapper {
  display: flex;
  position: absolute;
  top: 123px;
  left: 49px;
  height: 46px;
  width: 180px;
  // border-bottom: solid 3px red;
  border-top: solid 3px red;
  // border: solid 3px red;
}

.dummy {
  position: absolute;
  top: 125px;
  left: 0;
  height: 46px;
  width: 240px;
  // background-color: yellow;
  border-bottom: solid 3px red;
  border-left: solid 3px red;
}
</style>
