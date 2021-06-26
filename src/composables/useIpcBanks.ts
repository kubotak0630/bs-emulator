import { ref, Ref, readonly, InjectionKey } from 'vue';
import { RmType } from '@/types/commonTypes';

const IPC_BANK_NUM = 4;

class Bank {
  private rmAry: Ref<RmType[]>;

  constructor(num: number, midFlgAry: boolean[]) {
    const tmp: RmType[] = [];
    for (let i = 0; i < num; i++) {
      tmp.push({ num: i, enable: true, midFlg: midFlgAry[i] });
    }
    this.rmAry = ref<RmType[]>(tmp);
  }

  popRm() {
    if (this.rmAry.value.length > 0) {
      this.rmAry.value[0].enable = false;
      setTimeout(() => {
        this.rmAry.value.shift();
      }, 700);
    }
  }
  getRm() {
    return this.rmAry;
  }
}

export default function useIpcBanks() {
  const bank0 = new Bank(3, [true, false, false]);
  const bank1 = new Bank(2, [true, false]);
  const bank2 = new Bank(5, [true, false, false, false, false]);
  const bank3 = new Bank(8, [true, false, true, false, true, false, true, false]);

  return { bank0, bank1, bank2, bank3 };
}
