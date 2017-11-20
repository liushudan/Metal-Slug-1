class GameUI {
  constructor(){
    this.canvas = document.getElementById('game');
    this.canvasCtx = this.canvas.getContext('2d');
  }

  setWidth(width) {
    this.canvasCtx.width = width;
  }

  setHeight(height){
    this.canvasCtx.height = height;
  }

  getCanvas(){
    return this.canvas;
  }

  show(){
    this.canvas.style.display = "block";
  }

  hide(){
    this.canvas.style.display = "none";
  }

  clear(x, y, width, height) {
    this.ctx.clearRect(x, y, width, height);
  }
}