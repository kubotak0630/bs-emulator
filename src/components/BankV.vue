<template>
  <div class="bank">
    <div class="rms-wraper">
      <RmV
        v-for="(rm, index) in reversRmAry"
        :key="index"
        :rmObj="rm"
        :posIndex="index"
        :isRemoveTransition="index == 7"
      ></RmV>
    </div>
    <PriorityPtrV
      :lo_valid="prtValidAry[0]"
      :middle_valid="prtValidAry[1]"
      :high_valid="prtValidAry[2]"
    ></PriorityPtrV>
  </div>

  <!-- <el-button type="primary" @click="handleClick()">Primary</el-button> -->

  <!-- <el-button type="primary" @click="handleClick2()">PriPtr</el-button> -->
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, PropType } from "vue";
import RmV from "@/components/RmV.vue";
import PriorityPtrV from "@/components/PriorityPtrV.vue";

export type RmType = {
  num: number;
  enable: boolean;
};

export default defineComponent({
  name: "BankV",
  components: {
    RmV,
    PriorityPtrV,
  },
  props: {
    rmAry: {
      type: Object as PropType<RmType[]>,
      required: true,
    },
    prtValidAry: {
      type: Array as PropType<boolean[]>,
      required: true,
    },
  },
  setup(props) {
    // const prtValidAry = ref<boolean[]>([true, true, false]);

    //配列の逆順にして、足りない文は
    const reversRmAry = computed(() => {
      const copyAry = props.rmAry.slice();
      const len = copyAry.length;

      for (let i = 0; i < 8 - len; i++) {
        copyAry.push({ num: 255, enable: false });
      }

      return copyAry.reverse();
    });

    return { reversRmAry };
  },
});
</script>

<style scoped lang="scss">
.bank {
  // position: relative;
  // top: 200px;
  // left: 200px;
  width: 100px;
  height: 226px;
  background-color: lightgray;
  border-bottom: solid 3px red;
  border-right: solid 3px red;
  border-left: solid 3px red;
}

.rms-wraper {
  position: relative;
  // background-color: yellow;
  top: 10px;
}
</style>
