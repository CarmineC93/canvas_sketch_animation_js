const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

//5 creo due istanze di oggetti dalla classe Agent
const agentA = new Agent(800, 400);
const agentB = new Agent(300, 700);

//6 ora posso generare le figure
agentA.draw(context);
agentB.draw(context);

  };
};



canvasSketch(sketch, settings);

//1 creo una classe Point, per fissare la posizione degli oggetti sferici, con coordinate come proprietà
class Point {
  constructor (x, y){
    this.x = x;
    this.y = y;
  }
}

//4 creo una nuova classe con all'interno il punto di prima(posizione) che sarà la vera sfera
class Agent {
  constructor (x, y){
    this.pos = new Point(x, y);
    this.radius = 10; //il raggio sarà uguale per tutte le figure
  }
  //do un metodo alla classe per generare le figure sferiche
  draw(context){
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();

  }

}