import { ref, Ref } from 'vue';
import { RmType } from '@/types/commonTypes';

class NiuHard {
  private bufs: Ref<RmType[]>;
  constructor() {
    this.bufs = ref([] as RmType[]);
  }

  push(rm: RmType) {
    this.bufs.value.push(rm);
    console.log(`length=${this.bufs.value.length}`);
  }

  pop() {
    this.bufs.value[0].enable = false;
    setTimeout(() => {
      this.bufs.value.shift();
      console.log(`length=${this.bufs.value.length}`);
    }, 500);
  }

  // Vueのデータバインディング用
  getBufs(): RmType[] {
    return this.bufs.value;
  }
}

// シングルトン
let niuHard: NiuHard | null = null;

export function useNiuHard() {
  if (!niuHard) {
    niuHard = new NiuHard();
    return niuHard;
  } else {
    return niuHard;
  }
}
