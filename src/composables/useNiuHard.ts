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
    this.bufs.value.slice();
  }

  // Vueのデータバインディング用
  getBufs(): Ref<RmType[]> {
    return this.bufs;
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
