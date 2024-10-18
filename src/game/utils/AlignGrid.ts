/* eslint-disable @typescript-eslint/no-explicit-any */
class PosVo {
  constructor(public x: number, public y: number) {}
}

export class AlignGrid {
  rows: number;
  cols: number;
  cw: number;
  ch: number;
  cd: number;
  numberArray: any[] = [];
  scene: any;
  rscene: any;
  height: number;
  width: number;
  graphics: any;

  constructor(
    scene: any,
    rows: number = 11,
    cols: number = 11,
    width: number = -1,
    height: number = -1
  ) {
    this.rows = 0;
    this.cols = 0;
    this.cw = 0;
    this.ch = 0;
    this.cd = 0;
    this.numberArray = [];

    if (height === -1) {
      height = scene.getH();
    }
    if (width === -1) {
      width = scene.getW();
    }

    this.rows = rows;
    this.cols = cols;
    this.scene = scene;

    // Calculate cell width and height
    this.cw = width / this.cols;
    this.ch = height / this.rows;

    // d = √(l² + w²)
    this.cd = Math.sqrt(this.cw * this.cw + this.ch * this.ch);

    this.height = height;
    this.width = width;
    this.rscene = this.scene;
  }

  show() {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000, 0.5);

    for (let i = 0; i < this.width; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.height);
    }

    for (let i = 0; i < this.height; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.width, i);
    }

    this.graphics.strokePath();
  }

  place(pos: PosVo, obj: any) {
    this.placeAt(pos.x, pos.y, obj);
  }

  placeAt(xx: number, yy: number, obj: any) {
    const x2 = this.cw * xx + this.cw / 2;
    const y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeAt2(xx: number, yy: number, obj: any) {
    const x2 = this.cw * (xx - 1) + this.cw;
    const y2 = this.ch * (yy - 1) + this.ch;
    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index: number, obj: any, useCenter: boolean = true) {
    const yy = Math.floor(index / this.cols);
    const xx = index - yy * this.cols;

    if (useCenter) {
      this.placeAt(xx, yy, obj);
    } else {
      this.placeAt2(xx, yy, obj);
    }
  }

  showNumbers() {
    this.show();
    let count = 0;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const numText = this.scene.add.text(0, 0, count.toString(), {
          color: "#ff0000",
        });
        numText.setOrigin(0.5, 0.5);
        this.numberArray.push(numText);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }

  showPos() {
    this.show();
    let count = 0;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const numText = this.scene.add.text(0, 0, `${j}\n${i}`, {
          color: "#ff0000",
        });
        numText.setOrigin(0.5, 0.5);
        this.numberArray.push(numText);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }

  findNearestIndex(xx: number, yy: number): number {
    const row = Math.floor(yy / this.ch);
    const col = Math.floor(xx / this.cw);
    return row * this.cols + col;
  }

  findNearestGridXY(xx: number, yy: number): PosVo {
    const row = Math.floor(yy / this.ch);
    const col = Math.floor(xx / this.cw);
    return { x: col, y: row };
  }

  findNearestGridXYDec(xx: number, yy: number): PosVo {
    const row = yy / this.ch;
    const col = xx / this.cw;
    return { x: col, y: row };
  }

  hide() {
    if (this.graphics) {
      this.graphics.clear();
    }

    this.numberArray.forEach((t) => {
      t.destroy();
    });
  }

  getPosByXY(xx: number, yy: number): PosVo {
    const index = this.findNearestIndex(xx, yy);
    return this.getPosByIndex(index);
  }

  getRealXY(xx: number, yy: number): PosVo {
    const x1 = xx * this.cw;
    const y1 = yy * this.ch;
    return new PosVo(x1, y1);
  }

  getRealMiddleBottom(xx: number, yy: number): PosVo {
    const x1 = xx * this.cw + this.cw / 2;
    let y1 = (yy + 1) * this.ch;
    y1 += this.ch;
    return new PosVo(x1, y1);
  }

  getRealBottom(xx: number, yy: number): PosVo {
    const x1 = xx * this.cw;
    let y1 = (yy + 1) * this.ch;
    y1 += this.ch;
    return new PosVo(x1, y1);
  }

  getPosByIndex(index: number): PosVo {
    const yy = Math.floor(index / this.cols);
    const xx = index - yy * this.cols;
    const x2 = this.cw * xx + this.cw / 2;
    const y2 = this.ch * yy + this.ch / 2;
    return new PosVo(x2, y2);
  }
}
