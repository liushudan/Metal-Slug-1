const GAME_WIDTH = 650;
const GAME_HEIGHT = 400;

class MetalSlug {
  constructor() {
    this.width = GAME_WIDTH;
    this.height = GAME_HEIGHT;
    this.gameUI = new GameUI();
    this.camera = new Camera();
    this.keys = [];
    this.sx = 0;
    this.sy = 0;
    this.frame = 0;
    this.bulletList = [];
    this.enemyList = [];
    this.checkPoint = [764, 1025, 1800, 2285];
    this.checkPointReached = false;
  }

  init(enemyInformation) {
    this.background = new Image();
    this.background.src = "images/background.jpg";
    this.character = new Character();

    this.enemyInformation = enemyInformation;
    this.initialiseKeys();
    this.bindKeyPress(this.keys);
    this.start();
  }

  start() {
    let animation = window.requestAnimationFrame(() => this.start());
    this.gameUI.clear(0, 0, this.width, this.height);
    this.renderBackground();

    this.character.drawCharacter(this.camera);
    if (this.keys[39]) {
      this.character.updateCharacter(1, 0);
      if (this.keys[32]) {
        this.createBullet();
      }
    }
    else if (this.keys[37]) {
      //left
      this.character.updateCharacter(-1, 0);
      if (this.keys[32]) {
        this.createBullet();
      }
    }
    else if (this.keys[38]) {/*up arrow*/
    }
    else if (this.keys[40]) {/*down arrow*/
    }
    else if (this.keys[32]) {
      //space
      if (!this.character.inAir) {
        this.createBullet();
      }
    }
    else {
      //idle position
      if (this.character.inAir == false) {
        this.character.idlePosition();
      }
    }
    this.moveCamera();
    this.moveBullet();


    if (this.checkPoint.indexOf(parseInt(this.character.x + 400)) >= 0) {
      if (this.checkPointReached == false) {
        console.log("checkpoint reached"); // make this checkpoint true so as to control the camera here and then restrict the characters movement
        this.renderEnemies(this.enemyInformation[this.checkPoint.indexOf(parseInt(this.character.x + 400))]);
        this.checkPointReached = true;
      }
    }


    this.enemyList.forEach(
      function (enemy) {
        enemy.drawEnemy();
        enemy.updateEnemy();
      }
    );
  }


  renderEnemies(enemyInformation) {
    let listObject = [];
    let diffX = 0;
    enemyInformation.forEach((data) => {
        let enemy = new Enemy(data["src"], 600 + diffX, 250, data["width"], data["height"]);
        listObject.push(enemy);
        diffX += 60;
      }
    );
    this.enemyList = listObject;
  }

  renderBackground() {
    this.gameUI.canvasCtx.drawImage(this.background, this.sx + this.camera.x, this.sy, this.width, this.height, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  moveCamera() {
    this.camera.update(this.gameUI.canvas, this.character);
  }

  createBullet() {
    let bullet = new Bullet(this.character, this.camera);
    bullet.drawBullet();
    this.bulletList.push(bullet);
  }

  moveBullet() {
    this.bulletList.forEach((bullet) => {
      bullet.moveBullet();
    })
  }

  initialiseKeys() {
    for (let i = 1; i < 223; i++) {
      this.keys.push(false);
    }
  }

  bindKeyPress(keys) {
    document.body.addEventListener("keydown", function (e) {
      keys[e.keyCode] = true;
    }, true);
    document.body.addEventListener("keyup", function (e) {
      keys[e.keyCode] = false;
    }, true);
  }

}