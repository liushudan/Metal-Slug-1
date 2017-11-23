class Enemy{

	constructor(src,x,y,width,height){
		this.x = x;
		this.y =y;
		this.width = width;
		this.sx = 0;
		this.sy=100;
		this.height = height;
		this.gameUI = new GameUI();
		this.enemeyElement = new Image();
		this.enemeyElement.src =src;
		this.frame = 0;
		this.enemyTurnLeft=true;
	}

	drawEnemy() {
    this.gameUI.canvasCtx.drawImage(this.enemeyElement, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width * 2, this.height * 2);
  }

	updateEnemy(){
		// this.checkEnemyPosition();
		this.frame ++;
		if(this.frame >2 ){
      if(!this.enemyTurnLeft){
        this.x+=3;
        this.sy=150;
			}
			else{
        this.x -=3;
        this.sy=100;
			}

			this.sx +=50;
			if (this.sx >= 700) {
				this.sx = 0;
			}
			this.frame = 0;
		}
	}


	// checkEnemyPosition(){
   //  if(this.x<0){
   //  	this.enemyTurnLeft=false;
   //  }
   //  if(this.x>550){
   //  	this.enemyTurnLeft=true;
	// 	}
	// }
}