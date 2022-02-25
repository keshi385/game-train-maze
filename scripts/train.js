'use strict';

class Train {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this._init();
    this._draw();
  }

  /**
   * 初期化関数
   */
  _init() {
    this.img = new Image();
    this.img.src = './img/hankyu.png';
    this.x = 50;
    this.y = 50;
    this.w = TRAIN_WIDTH;
    this.h = TRAIN_HEIGHT;
  }

  _draw() {
    // 画像の表示
    this.img.onload = () => {
      this.ctx.drawImage
      (
        this.img, 
        this.x, 
        this.y, 
        this.w, 
        this.h
      );
    };
  }

  /**
   * 電車の表示
   */
  drawTrain(x, y) {
    // 既存の電車画像クリア
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
    // 新規の電車画像描画
    this.x = x;
    this.y = y;
    this.ctx.drawImage
    (
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  /**
   * ゴールの判定
   * @param x
   * @param y
   * @returns ゴール有無
   */
  judgeGoal(x, y) {
    let retJudge = false;

    if ((this.x === x) && 
      (this.y === y)) {
        retJudge = true;
      }
    
    return retJudge;
  }

  /**
   * 電車位置(列)のgetter
   * @return 座標
   */
  getCoorCol() {
    return this.x;
  }

  /**
   * 電車位置(行)のgetter
   * @return 座標
   */
   getCoorRow() {
    return this.y;
  }
}