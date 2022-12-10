const canvasSketch = require('canvas-sketch');
//10 importo con require la funzione random
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

//13 poichè mi serve la width e l'height per impostare il parametro MAX nelle coordinate di random.range, le passo come parametri nello schetch
const sketch = ({ context, width, height }) => {

  //7 Voglio più figure, creo un array vuoto dove le andrò a inserire
  const agents = [];
  //8 con un loop lo riempio di 40 figure
    for(let i = 0; i<40; i++){
      //9voglio che le coordinate delle figure sulla pagina siano casuali, importo la libreria canvas-sketch-util che ha funzione random
      //11 con funzione random creo valori casuali
      const x = random.range(0, width); 
      const y = random.range(0, height);

      agents.push(new Agent (x, y));
    }

return ({ context, width, height }) => {
  context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //5 creo due istanze di oggetti dalla classe Agent
    const agentA = new Agent(800, 400);
    const agentB = new Agent(300, 700);

    //12 ora generaro le figure dall'array agents
    agents.forEach(agent => {
      agent.draw(context);
    });
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
    this.radius = random.range(4, 12); //il raggio sarà variabile
  }
  //do un metodo alla classe per generare le figure sferiche
  draw(context){



    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

  }
}