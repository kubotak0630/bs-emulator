import { ref, Ref } from 'vue';
import { RmType } from '@/types/commonTypes';
import { useNandIfRender } from '@/composables/useNandIfRender';

class NiuHard {
  private bufs: Ref<RmType[]>;
  private nandIfRender;
  constructor() {
    this.bufs = ref([] as RmType[]);
    this.nandIfRender = useNandIfRender();
  }

  push(rm: RmType) {
    this.bufs.value.push(rm);
    console.log(`length=${this.bufs.value.length}`);
  }

  pop() {
    if (this.bufs.value.length > 0) {
      this.bufs.value[0].enable = false;
      setTimeout(() => {
        const pkt = this.bufs.value.shift()!;
        console.log(`length=${this.bufs.value.length}`);

        this.nandIfRender.push(pkt);
      }, 500);
    }
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
