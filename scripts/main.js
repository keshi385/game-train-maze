'use strict';

(() => {
  let timerId;
  let timer = document.querySelector('.timer');
  let dispSec, dispMsec;
  let firstFlag = true;
  const mask = document.querySelector('.mask');
  const popup = document.querySelector('.popup');
  const msgBox = document.querySelector('.msgBox');
  const retryButton = document.querySelector('.retryButton');

  class Maze {
    constructor(canvas) {
      this.canvas = canvas;
      this.wall = new Wall(this.canvas);
      this.train = new Train(this.canvas);
      this._init();
    }

    _init() {
      this.wall.drawWall();
    }

    /**
     * 壁の確認（移動可否チェック）
     * @param {進行方向} dir 
     */
    judgeWall(dir) {
      let admit = false;
      let row, col;

      switch(dir) {
        case KEY_UP:
          col = this.train.getCoorCol();
          row = this.train.getCoorRow() - TRAIN_UNIT;
          break;
        case KEY_DOWN:
          col = this.train.getCoorCol();
          row = this.train.getCoorRow() + TRAIN_UNIT;
          break;
        case KEY_RIGHT:
          col = this.train.getCoorCol() + TRAIN_UNIT;
          row = this.train.getCoorRow();
          break;
        case KEY_LEFT:
          col = this.train.getCoorCol() - TRAIN_UNIT;
          row = this.train.getCoorRow();
          break;
      }
      admit = this.wall.retWallExist(row, col);

      return admit;
    }

    /**
     * 電車の移動
     * @param {方向} dir 
     */
    moveTrain(dir) {
      let x, y;

      if (firstFlag === true) {
        // タイマ減算の開始
        startTimer();
        firstFlag = false;
      }

      switch(dir) {
        case KEY_UP:
          x = this.train.getCoorCol();
          y = this.train.getCoorRow() - TRAIN_UNIT;
          break;
        case KEY_DOWN:
          x = this.train.getCoorCol();
          y = this.train.getCoorRow() + TRAIN_UNIT;
          break;
        case KEY_RIGHT:
          x = this.train.getCoorCol() + TRAIN_UNIT;
          y = this.train.getCoorRow();
          break;
        case KEY_LEFT:
          x = this.train.getCoorCol() - TRAIN_UNIT;
          y = this.train.getCoorRow();
          break;
      }
      // 電車の移動
      this.train.drawTrain(x, y);
      // ゴールの判定
      if (this.train.judgeGoal(this.wall.retGoalX(), this.wall.retGoalY()) !== false) {
        // ゴール達成
        console.log("CONGRATULATIONS!");
        // 終了
        stopTimer();
        mask.classList.remove('hidden');
        popup.classList.remove('hidden');
        msgBox.textContent = "CONGRATULATIONS!";
      }
    }
  }

  /**
   * タイマ処理（周回）
   */
  const countDown = () => {
    if (dispMsec === 0) {
      if (dispSec >= 1) {
        dispMsec = 99;
        dispSec -= 1;
      } else {
        console.log("TIME OUT!");
        // 終了
        stopTimer();
        // タイムアウト処理
        mask.classList.remove('hidden');
        popup.classList.remove('hidden');
        msgBox.textContent = "TIME OUT!";
      }
    } else {
      dispMsec -= 1;
    }

    // 残り時間の表示
    timer.textContent = `${("0".repeat(2) + dispSec).slice(-2)} : ${("0".repeat(2) + dispMsec).slice(-2)} sec`;
  }

  // canvasの取得
  const canvas = document.querySelector('canvas');
  if (typeof canvas.getContext === 'undefined') {
    return; // 棄却
  }
  // インスタンスの生成
  const maze = new Maze(canvas);

  /**
   * キーによる移動処理
   */
  document.addEventListener('keydown', e => {
    let dir = e.key;

    // 進行可能か判定してから処理
    if (maze.judgeWall(dir) !== false) {
      maze.moveTrain(dir);
    }
  });

  /**
   * タイマ処理
   */
  function startTimer() {
    timerId = setInterval(countDown, TIMER_10_MSEC);
    timer.textContent = "20:00";
    dispSec = 20;
    dispMsec = 0;
  }
  function stopTimer() {
    clearInterval(timerId);
  }
  
  /**
   * リトライ処理
   */
   retryButton.addEventListener('click', () => {
    //  リセット
    window.location.reload();
  });
})();