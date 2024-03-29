const canvasSketch = require('canvas-sketch');
//10 importo con require la funzione random
const random = require('canvas-sketch-util/random');
//23 importo da libreria funzione math per usare metodo mapRange
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [ 1080, 1080 ],
  //18 specifico nei setting che voglio animazione in modo che non si veda più un solo frame a caricamento (60 fps)
  animate: true
  /*const animate = () => {
    requestAnimationFrame(animate);
  }*/

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

  //20 voglio collegare gli agenti con delle rette. Prima li faccio interagire l'uno con l'altro con dei nested loop
  for(let i = 0; i< agents.length; i++){
    const agent = agents[i];
    
    for(let j=i+1; j<agents.length; j++){ 
      //refactoring: con i+1 anzichè 0 evito le iterazioni inutili( prima c'era una linea da A a B e un'altra sovrapposta da B ad A)
      //ora anzichè 1600 iterazioni per frame, sono 870 per frame
      const other  =agents[j];

      //22 avendo la distanza tra i Vector, posso creare un controllo che nega la creazione di linee sopra una certa distanza
      const dist = agent.pos.getDistance(other.pos);
      if(dist > 200) continue; //continue fa saltare l'iterazione successiva e va alla successiva

      //24 con mapRange posso cambiare valori (spessore delle linee) in base variazione (in questo caso la distanza) 
      context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

      //21 ora con i metodi moveTo(punto di partenza) e lineTo(punto di arrivo) creo una retta con beginPath 
      context.beginPath();
      context.moveTo(agent.pos.x, agent.pos.y);
      context.lineTo(other.pos.x, other.pos.y);
      context.stroke();
    }
  }
  

    //12 ora generaro le figure dall'array agents con draw
    agents.forEach(agent => {
      //17 aggiungo velocità con metodo update
      agent.update();
      agent.draw(context);
      //20 aggiungo limiti al foglio
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

//1 creo una classe Vector ( più adatto di Point ora che c'è la velocità), per fissare la posizione degli oggetti sferici, con coordinate come proprietà
class Vector {
  constructor (x, y){
    this.x = x;
    this.y = y;
  }

  //21 metodo che collega con linee solo gli agenti vicini
  getDistance(otherVector){
    //mi serve la distanza, si presta bene il teorema di Pitagora 
    //calcolo cateti (differenza tra coordinate X e Y dei due vettori) e l'ipotenuta sarà la distanza tra i vettori
    const dx = this.x - otherVector.x;
    const dy = this.y - otherVector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

//4 creo una nuova classe con all'interno il punto di prima(posizione) che sarà la vera sfera
class Agent {
  constructor (x, y){
    this.pos = new Vector(x, y);
    this.radius = random.range(4, 12); //il raggio sarà variabile
    //15 per far muovere i cerche mi serve una nuova proprietà 'velocità' con coordinate casuali tra 1 e -1
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));

  }
  //do un metodo alla classe per generare le figure sferiche
  draw(context){

    context.save();
    //14 refactoring: sostituisco lo 0 in context.arc e creo un translate che si occupi di settare coordinate.
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }

  //16 per usare la velocità devo aggiungere la velocità alla posizione, in un nuovo metodo
  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  //19 i cerchi escono dalla pagina perchè non ci sono limiti al foglio. Li creo con un nuovo metodo, che va a determinare il comportamento quando i cerchi sono in una certa posizione
  bounce(width, height){
    //se le coordinate dei cerchi sono uguali alla posizione di inizio (0) e fine(width/height) del foglio, inverto la velocità in modo che 'rimbalzino' tornando indietro
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    // N.B. if(this.pos.y >= 0 || this.pos.x >= height) this.vel.y *= -1; //con questo settaggio riesco a farli muovere in una sola direzione


  }
}