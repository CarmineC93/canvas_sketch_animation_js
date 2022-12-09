const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
//2 creo due istanze di oggetti dalla classe Point
const pointA = new Point(800, 400, 10);
const pointB = new Point(300, 700, 10);

//3 creo la prima figura con le proprietà dell'oggetto A
context.beginPath();
context.arc(pointA.x, pointA.y, pointA.radius, 0, Math.PI * 2);
context.fillStyle = 'black';
context.fill();

//  e la seconda con le proprietà del Point B
context.beginPath();
context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI * 2);
context.fill();


  };
};



canvasSketch(sketch, settings);

//1 creo una classe Point, per creare oggetti sferici, con coordinate e raggio come proprietà
class Point {
  constructor (x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}