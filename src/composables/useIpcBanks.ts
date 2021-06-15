import { ref, Ref, readonly, InjectionKey } from "vue";

type RmType = {
  num: number;
  enable: boolean;
};

const IPC_BANK_NUM = 4;

class Bank {
  private rmAry: Ref<RmType[]>;

  constructor(num: number) {
    const tmp = [];
    for (let i = 0; i < num; i++) {
      tmp.push({ num: i, enable: true });
    }
    this.rmAry = ref<RmType[]>(tmp);
  }

  popRm() {
    if (this.rmAry.value.length > 0) {
      this.rmAry.value[0].enable = false;
      setTimeout(() => {
        this.rmAry.value.shift();
      }, 500);
    }
  }
  getRm() {
    return this.rmAry;
  }
}

export default function useIpcBanks() {
  const bank0 = new Bank(3);
  const bank1 = new Bank(2);
  const bank2 = new Bank(5);
  const bank3 = new Bank(8);

  return { bank0, bank1, bank2, bank3 };
}
