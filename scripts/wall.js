class Wall {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this._init();
    this._createFrame();
  }

  _init() {
    this.row = BLOCK_NUM_ROW;
    this.col = BLOCK_NUM_COL;
    this.goalY = (BLOCK_NUM_ROW - 2) * BLOCK_UNIT;
    this.goalX = (BLOCK_NUM_COL - 2) * BLOCK_UNIT;
    this.WALL_SIZE = 50;
  }

  _createFrame() {
    this.data = [];

    // 枠を作成
    for (let row = 0; row < BLOCK_NUM_ROW; row++) {
      this.data[row] = []; // 配列の要素数を指定
      for (let col = 0; col < BLOCK_NUM_COL; col++) {
        if (
          (row === 0) || 
          (col === 0) || 
          (row === (BLOCK_NUM_ROW - 1)) || 
          (col === (BLOCK_NUM_COL - 1))) {
          this.data[row][col] = 1;
        } else {
          this.data[row][col] = 0;
        }
      }
    }

    // 2点置きにブロックを配置（起点用）
    for (let row = 2; row < this.row - 2; row += 2) {
      for (let col = 2; col < this.col - 2; col += 2) {
        this.data[row][col] = 1;
      }
    }
  }

  _fillBlock(row, col) {
    let grd = this.ctx.createLinearGradient(20, 0, 120, 0);
    grd.addColorStop(0, "#800000");
    grd.addColorStop(1, "#8b4513");
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(
      col * this.WALL_SIZE, 
      row * this.WALL_SIZE, 
      this.WALL_SIZE, 
      this.WALL_SIZE
    );
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#000000";
    this.ctx.strokeRect(
      col * this.WALL_SIZE, 
      row * this.WALL_SIZE, 
      this.WALL_SIZE, 
      this.WALL_SIZE
    );
  }

  _setGoal() {
    this.ctx.fillStyle = "rgb(255, 0, 0)";

    this.ctx.font = "16px serif";
    this.ctx.fillText("GOAL", this.goalX, (this.goalY + BLOCK_UNIT));
  }

  drawWall() {
    this.canvas.height = BLOCK_NUM_ROW * this.WALL_SIZE;
    this.canvas.width = BLOCK_NUM_COL * this.WALL_SIZE;

    // ブロック塀を設置
    for (let row = 0; row < BLOCK_NUM_ROW; row++) {
      for (let col = 0; col < BLOCK_NUM_COL; col++) {
        if (this.data[row][col] === 1) {
          this._fillBlock(row, col);
        }
      }
    }

    // 迷路の作成
    let randomDir;
    const dir = [
      [0, +1],  // up
      [+1, 0],  // right
      [0, -1],  // down
      [-1, 0]   // left
    ];
    // 棒倒し理論でブロックを設置
    for (let row = 2; row < BLOCK_NUM_ROW - 2; row += 2) {
      for (let col = 2; col < BLOCK_NUM_COL - 2; col += 2) {
        do {
          // 行をランダムで選択する
          randomDir = Math.floor(Math.random() * 3)
        } while (this.data[row + dir[randomDir][0]][col + dir[randomDir][1]] === 1)
        this.data[row + dir[randomDir][0]][col + dir[randomDir][1]] = 1;
        this._fillBlock(row + dir[randomDir][0], col + dir[randomDir][1]);
      }
    }
    this._setGoal();
  }

  /**
   * 移動可否（ブロックが存在するか）の判定
   * @param {*} row 
   * @param {*} col 
   * @returns 
   */
  retWallExist(row, col) {
    let yAdmit = false;
    let dRow = row / BLOCK_UNIT;
    let dCol = col / BLOCK_UNIT;

    if (this.data[dRow][dCol] === 0) {
      yAdmit = true;
    }

    return yAdmit;
  }

  retGoalX() {
    return this.goalX;
  }

  retGoalY() {
    return this.goalY;
  }

}