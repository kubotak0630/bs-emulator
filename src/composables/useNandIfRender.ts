import { ref } from 'vue';
import { RmType } from '@/types/commonTypes';

const uintX = 50;
const uinty = 50;
const originX = 40;
const originY = 20;
const cmdStartOffset = 40;
const cmdHight = 34; // Rsコマンドの高さ

class NandIfRender {
  private cmdAry: RmType[];
  private canvas: HTMLCanvasElement | null;
  private ctx: CanvasRenderingContext2D | null;
  private simTickCnt: number; // Simの内部カウンタ。これが進むとひとマス描画される

  constructor() {
    this.cmdAry = [];
    this.canvas = null;
    this.ctx = null;
    this.simTickCnt = 0;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.canvas.width = 800;
    this.canvas.height = 400;

    this.ctx = canvas.getContext('2d')!;

    this.bkgDraw();

    // this.ctx.strokeStyle = 'rgb(00,00,255)'; //枠線の色は青
    // this.ctx.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤

    // this.ctx.fillRect(0, 0, 50, 100);
  }

  push(cmd: RmType) {
    this.cmdAry.push(cmd);
    console.log(`length=${this.cmdAry.length}`);

    // 本番ではここでは呼ばない。デバッグ限定
    this.drawUpdate();
  }

  // getSimTickCnt() {
  //   return this.simTickCnt
  // }

  clear() {
    if (!this.ctx || !this.canvas) return;
    console.log('clear');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawUpdate() {
    if (!this.ctx || !this.canvas) return;

    // 一回消す
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.bkgDraw();

    this.cmdAry.forEach((cmd, index) => {
      this.singleCmdDraw(originX + uintX * index, cmdStartOffset, true);
    });

    this.drawSimTickMark();

    this.busyDraw(originX + uintX * (this.simTickCnt + 1), cmdStartOffset, 'start');

    this.busyDraw(originX + uintX * (this.simTickCnt + 2), cmdStartOffset, 'continue');

    this.busyDraw(originX + uintX * (this.simTickCnt + 3), cmdStartOffset, 'end');

    this.simTickCnt++;
  }

  // Simのマーカ表示(三角)
  drawSimTickMark() {
    if (!this.ctx) return;

    const size = 10; //三角形のサイズ

    this.ctx.beginPath();
    this.ctx.moveTo(originX + this.simTickCnt * uintX, originY);
    this.ctx.lineTo(originX + size / 2 + this.simTickCnt * uintX, originY - (size / 2) * 1.7320508);
    this.ctx.lineTo(originX - size / 2 + this.simTickCnt * uintX, originY - (size / 2) * 1.7320508);
    this.ctx.closePath();
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    this.ctx.fillStyle = 'pink';
    this.ctx.fill();
  }

  // 背景の点線をかく
  private bkgDraw() {
    if (!this.ctx) return;

    const vLintLen = 400; //補助線の縦の長さ

    // 線の色
    this.ctx.strokeStyle = 'darkgray';
    // 破線
    this.ctx.setLineDash([5, 8]);
    // 線の太さ
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < 10; i++) {
      this.ctx.beginPath();

      // 線を引くスタート地点に移動
      this.ctx.moveTo(originX + i * uintX, originY);

      this.ctx.lineTo(originX + i * uintX, originY + vLintLen);

      // 線を描画する
      this.ctx.stroke();
    }

    this.ctx.setLineDash([]); //実線に戻す
    this.ctx.lineWidth = 1.0; //太さを戻す
  }

  private singleCmdDraw(posX: number, posY: number, isBusyCmd: boolean) {
    if (!this.ctx) return;

    const rectWidth = 40;
    // const rectHeight = 34;

    this.ctx.beginPath();

    //先にコマンドの四角形の後ろのBusy線を描く
    // 線の色
    this.ctx.beginPath();
    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = 'darkgray';
    // this.ctx.lineWidth = 1.0;
    // 線を引くスタート地点に移動
    // this.ctx.moveTo(posX + rectWidth, posY + rectHeight / 2);
    const heightOffset = isBusyCmd ? (cmdHight * 7) / 8 : cmdHight / 2;
    this.ctx.moveTo(posX + rectWidth, posY + heightOffset);

    this.ctx.lineTo(posX + rectWidth + (uintX - rectWidth), posY + heightOffset);
    this.ctx.stroke();

    // コマンドの四角形描画
    // 線の色
    this.ctx.strokeStyle = 'darkblue';
    this.ctx.lineWidth = 2.5;

    //四角形
    // this.ctx.rect(posX, posY, rectWidth, rectHeight);
    this.createRoundRectPath(posX, posY, rectWidth, cmdHight, 6);
    this.ctx.stroke();

    // 文字をかく
    this.ctx.font = '16pt Arial';
    this.ctx.fillStyle = 'darkblue';
    this.ctx.textBaseline = 'top';
    const strTemp = 'Rs';
    const textWidth = this.ctx.measureText(strTemp).width;
    this.ctx.fillText(strTemp, posX + (rectWidth - textWidth) / 2, posY + 8);
  }

  private busyDraw(posX: number, posY: number, busyType: 'start' | 'continue' | 'end' | 'once') {
    if (!this.ctx) return;

    const rectOffsetY = 10; //cmdHightより高さは低くする (cmdHight-rectOffsetY)

    this.ctx.lineWidth = 6;
    this.ctx.strokeStyle = '#696969';
    this.ctx.fillStyle = 'darkgray';

    const posUpperR = { x: posX + uintX, y: posY + rectOffsetY }; //右上
    const posUpperL = { x: posX, y: posY + rectOffsetY }; //左上
    const posLowerL = { x: posX, y: posY + cmdHight - 4 }; //左下
    const posLowerR = { x: posX + uintX, y: posY + cmdHight - 4 }; //右下

    if (busyType == 'start') {
      this.ctx.beginPath();

      this.ctx.beginPath();
      this.ctx.moveTo(posUpperR.x, posUpperR.y);
      this.ctx.lineTo(posUpperL.x, posUpperL.y);
      this.ctx.lineTo(posLowerL.x, posLowerL.y);
      this.ctx.lineTo(posLowerR.x, posLowerR.y);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();

      // 文字をかく
      this.ctx.font = '12pt Arial';
      this.ctx.fillStyle = 'darkblue';
      this.ctx.textBaseline = 'top';
      const strTemp = 'Busy';
      // const textWidth = this.ctx.measureText(strTemp).width;
      this.ctx.fillText(strTemp, posUpperL.x + 4, posUpperL.y + 3);
    } else if (busyType == 'continue') {
      // 上下に2本ラインを引く
      this.ctx.beginPath();
      this.ctx.moveTo(posUpperL.x, posUpperL.y);
      this.ctx.lineTo(posUpperR.x, posUpperR.y);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(posLowerL.x, posLowerL.y);
      this.ctx.lineTo(posLowerR.x, posLowerR.y);
      this.ctx.stroke();
      // this.ctx.fill();
      //塗りつぶし
      this.ctx.beginPath();
      this.ctx.moveTo(posUpperR.x, posUpperR.y);
      this.ctx.lineTo(posUpperL.x, posUpperL.y);
      this.ctx.lineTo(posLowerL.x, posLowerL.y);
      this.ctx.lineTo(posLowerR.x, posLowerR.y);
      this.ctx.closePath();
      this.ctx.fill();
    } else if (busyType == 'end') {
      const rectWidth = 30;

      this.ctx.beginPath();
      this.ctx.moveTo(posUpperL.x, posUpperL.y);
      this.ctx.lineTo(posX + rectWidth, posUpperL.y);
      this.ctx.lineTo(posX + rectWidth, posLowerL.y);
      this.ctx.lineTo(posLowerL.x, posLowerL.y);
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(posX + rectWidth, posUpperR.y);
      this.ctx.lineTo(posX + uintX, posUpperR.y);
      this.ctx.stroke();
    }
  }

  /**
   * 角が丸い四角形のパスを作成する(コピペした関数), ctx.rect 同じ使い方, 第5引数rが追加されているだけ
   * @param  {Number} x   左上隅のX座標
   * @param  {Number} y   左上隅のY座標
   * @param  {Number} w   幅
   * @param  {Number} h   高さ
   * @param  {Number} r   半径
   */
  createRoundRectPath(x: number, y: number, w: number, h: number, r: number) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.moveTo(x + r, y);
    this.ctx.lineTo(x + w - r, y);
    this.ctx.arc(x + w - r, y + r, r, Math.PI * (3 / 2), 0, false);
    this.ctx.lineTo(x + w, y + h - r);
    this.ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * (1 / 2), false);
    this.ctx.lineTo(x + r, y + h);
    this.ctx.arc(x + r, y + h - r, r, Math.PI * (1 / 2), Math.PI, false);
    this.ctx.lineTo(x, y + r);
    this.ctx.arc(x + r, y + r, r, Math.PI, Math.PI * (3 / 2), false);
    this.ctx.closePath();
  }
}

// シングルトン
let nandIfRender: NandIfRender | null = null;

export function useNandIfRender() {
  if (!nandIfRender) {
    nandIfRender = new NandIfRender();
    return nandIfRender;
  } else {
    return nandIfRender;
  }
}
