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
    this.bulletCount = 0;
    this.reloadTime = 0;
    this.enemyList = [];
    this.animation = '';
    this.checkPoint = [764, 1025, 1800, 2285];
    this.checkPointReached = false;
    this.utils = new SortArray();
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
    this.animation = window.requestAnimationFrame(() => this.start());
    this.gameUI.clear(0, 0, this.width, this.height);
    this.renderBackground();
    this.character.drawCharacter(this.camera);
    this.frame++;

    if (this.bulletCount > 10) {
      this.reloadTime++;
      if (this.reloadTime > 200) {
        this.bulletCount = 0;
        this.reloadTime = 0;
      }
    }

    if (this.keys[39]) {
      this.character.updateCharacter(1, 0);
      if (this.keys[32]) {
        this.renderBullet();
      }
    }
    else if (this.keys[37]) {
      //left
      this.character.updateCharacter(-1, 0);
      if (this.keys[32]) {
        this.renderBullet();
      }
    }
    else if (this.keys[38]) {/*up arrow*/
    }
    else if (this.keys[40]) {/*down arrow*/
    }
    else if (this.keys[32]) {
      //space
      if (!this.character.inAir) {
        this.renderBullet();
      }
    }
    else {
      //idle position
      if (this.character.inAir == false) {
        this.character.idlePosition();
      }
    }

    this.moveCamera();
    if (this.bulletList.length > 0) {
      this.moveBullet();
    }
    if (this.checkPoint.indexOf(parseInt(this.character.x + 400)) >= 0) {
      if (this.checkPointReached == false) {
        console.log("checkpoint reached"); // make this checkpoint true so as to control the camera here and then restrict the characters movement
        this.renderEnemies(this.enemyInformation[this.checkPoint.indexOf(parseInt(this.character.x + 400))]);
        this.checkPointReached = true;
      }
    }
    this.enemyList.forEach((enemy) => {
      enemy.drawEnemy();
      enemy.updateEnemy();
      this.collisionCheck();
    });
    this.checkArea();
  }

  renderBackground() {
    this.gameUI.canvasCtx.drawImage(this.background, this.sx + this.camera.x, this.sy, this.width, this.height, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  moveCamera() {
    this.camera.update(this.gameUI.canvas, this.character);
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

  renderBullet() {
    if (this.frame > 10 && this.bulletCount <= 10) {
      let bullet = new Bullet(this.character, this.camera);
      bullet.drawBullet();
      this.bulletList.push(bullet);
      this.frame = 0;
      this.bulletCount++;
    }
  }

  moveBullet() {
    this.bulletList.forEach((bullet) => {
      bullet.moveBullet();
      bullet.drawBullet();
    })
  }

  renderEnemies(enemyInformation) {
    let listObject = [];
    enemyInformation.forEach((data) => {
        let enemy = new Enemy(data['src'], data['x'], data['y'], data['width'], data['height']);
        listObject.push(enemy);
      }
    );
    this.enemyList = listObject;
  }

  collisionCheck() {
    let tempEnemyList = this.enemyList;
    let tempBulletList = this.bulletList;
    let characterLeft, characterRight;
    let enemyLeft, enemyRight, enemyTop, enemyBottom;
    let bulletLeft, bulletRight, bulletTop, bulletBottom;

    characterLeft = this.character.x - this.camera.x;
    characterRight = (this.character.x - this.camera.x) + this.character.width;

    for (let i = 0; i < tempEnemyList.length; i++) {
      enemyLeft = tempEnemyList[i].x;
      enemyRight = tempEnemyList[i].x + tempEnemyList[i].width;
      enemyTop = tempEnemyList[i].y;
      enemyBottom = tempEnemyList[i].y + tempEnemyList[i].height;

      if ((characterRight > enemyLeft) && (characterLeft < enemyRight)) {
        window.cancelAnimationFrame(this.animation);
      }

      for (let j = 0; j < tempBulletList.length; j++) {
        if (tempBulletList[j] !== null) {
          bulletLeft = tempBulletList[j].x;
          bulletRight = tempBulletList[j].x + tempBulletList[j].width;
          bulletTop = tempBulletList[j].y;
          bulletBottom = tempBulletList[j].y + tempBulletList[j].height;

          if ((bulletRight > (enemyLeft+(tempEnemyList[i].width)/1.5)) && (bulletLeft < enemyRight)) {
            tempEnemyList[i] = null;
            tempBulletList[i] = null;
          }
        }
      }
    }
    this.enemyList = this.utils.filterArray(tempEnemyList);
    this.bulletList = this.utils.filterArray(tempBulletList);
  }

  checkArea(){
    let tempBulletList=this.bulletList;
    let tempEnemyList=this.enemyList;
    for(let i=0; i<tempBulletList.length; i++){
      if(tempBulletList[i]!==null && tempBulletList[i].x>600){
        tempBulletList[i]=null;
      }
    }

    for(let i=0; i<tempEnemyList.length; i++){
      if(tempEnemyList[i]!==null && tempEnemyList[i].x<0){
        tempEnemyList[i]=null;
      }
    }

    this.bulletList=this.utils.filterArray(tempBulletList);
    this.enemyList=this.utils.filterArray(tempEnemyList);
  }

}