<template>
  <div class="bank">
    <div class="rms-wraper">
      <RmV
        v-for="(rm, index) in reversRmAry"
        :key="rm.keyIndex"
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

    let serialKeyNum = 0;

    type hoge1 = { name: string; age: number };
    type hoge2 = hoge1 & { hobby?: string };

    const hogehoge: hoge2 = { name: "kubota", age: 45, hobby: "programing" };

    //配列の逆順にして、足りない文は
    const reversRmAry = computed(() => {
      //RmTypeにkeyIndexを足した型(v-for表示のための使い捨ての型)
      const copyAry: (RmType & { keyIndex?: number })[] = props.rmAry.slice();
      const len = copyAry.length;

      //８個以下のときにDummyの配列を追加
      for (let i = 0; i < 8 - len; i++) {
        copyAry.push({ num: 255, enable: false });
      }

      //v-forのために通しのkeyIndexを降る(削除があるのでこれのほうが安全？)
      for (let i = 0; i < 8; i++) {
        copyAry[i].keyIndex = serialKeyNum++;
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
