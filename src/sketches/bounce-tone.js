var x, y;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height;
}

var yDirection = -2
var xDirection = -2

var synth = new Tone.Synth().toMaster();

function draw() {
  background(200);

  stroke(50);
  fill(150);
  ellipse(x, y, 24, 24);

  if (y < 0 || y > height) {
    yDirection *= -1
    synth.triggerAttackRelease('C4', '8n')
  }

  if (x < 0 || x > width) {
    xDirection *= -1
    synth.triggerAttackRelease('G4', '8n')
  }
  x += xDirection
  y += yDirection
}