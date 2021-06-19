<template>
  <div class="element-wrapper">
    <div class="element" v-show="elObj.enable"></div>
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
}
</style>
