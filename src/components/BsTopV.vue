<template>
  <div class="banks-wrapper">
    <BankV class="bank" :rmAry="rmAry0" :prtValidAry="prtAryCompute[0]"></BankV>
    <BankV class="bank" :rmAry="rmAry1" :prtValidAry="prtAryCompute[1]"></BankV>
    <BankV class="bank" :rmAry="rmAry2" :prtValidAry="prtAryCompute[2]"></BankV>
    <BankV class="bank" :rmAry="rmAry3" :prtValidAry="prtAryCompute[3]"></BankV>
  </div>

  <div class="pop-btn-wrapper">
    <el-button type="primary" @click="handleClick(0)">Pop-Bank0</el-button>
    <el-button type="primary" @click="handleClick(1)">Pop-Bank1</el-button>
    <el-button type="primary" @click="handleClick(2)">Pop-Bank2</el-button>
    <el-button type="primary" @click="handleClick(3)">Pop-Bank3</el-button>
  </div>
  <div>
    <p>Lo</p>
    <el-button type="primary" @click="handleClickLeft(0)"
      ><i class="el-icon-caret-left"></i
    ></el-button>

    <el-button type="primary" @click="handleClickRight(0)"
      ><i class="el-icon-caret-right"></i
    ></el-button>
  </div>
  <div>
    <p>Middle</p>
    <el-button type="primary" @click="handleClickLeft(1)"
      ><i class="el-icon-caret-left"></i
    ></el-button>

    <el-button type="primary" @click="handleClickRight(1)"
      ><i class="el-icon-caret-right"></i
    ></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, PropType, watch, computed } from "vue";
import BankV from "@/components/BankV.vue";
import useIpcBanks from "@/composables/useIpcBanks";

export default defineComponent({
  name: "BsTopV",
  components: {
    BankV,
  },
  props: {},
  setup() {
    // const { rmAry, popRm } = toRefs(useIpcBanks());
    // const { rmAry, popRm } = useIpcBanks();
    const { bank0, bank1, bank2, bank3 } = useIpcBanks();
    const bankAry = [bank0, bank1, bank2, bank3];
    const rmAry0 = bank0.getRm();
    const rmAry1 = bank1.getRm();
    const rmAry2 = bank2.getRm();
    const rmAry3 = bank3.getRm();

    const loPtr = ref(0);
    const midPtr = ref(0);
    const HiPtr = ref(0);

    const handleClick = (index: number) => {
      console.log("click Buttion");
      //popRm();
      bankAry[index].popRm();
    };

    const handleClickRight = (index: number) => {
      if (index == 0) {
        loPtr.value = (loPtr.value + 1) % 4;
      } else if (index == 1) {
        midPtr.value = (midPtr.value + 1) % 4;
      }
    };

    const handleClickLeft = (index: number) => {
      if (index == 0) {
        loPtr.value = (loPtr.value + 4 - 1) % 4;
      } else if (index == 1) {
        midPtr.value = (midPtr.value + 4 - 1) % 4;
      }
    };

    const prtAryCompute = computed(() => {
      const retVal = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ];
      retVal[loPtr.value][0] = true;
      retVal[midPtr.value][1] = true;
      return retVal;
    });

    return {
      rmAry0,
      rmAry1,
      rmAry2,
      rmAry3,
      handleClick,
      handleClickLeft,
      handleClickRight,
      prtAryCompute,
    };
  },
});
</script>

<style scoped lang="scss">
.banks-wrapper {
  display: flex;
}

.bank {
  margin-left: 20px;
}

.pop-btn-wrapper {
  margin: 40px 10px 10px 20px;
}
</style>
