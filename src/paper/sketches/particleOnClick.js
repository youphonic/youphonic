/*eslint-disable id-length */
let num = 25;
let sparks = [];
let gravityX = [];
let gravityY = [];
let alphas = [];


function randomNum (low, high){
	let range = high - low;
	let randomNumber = low + (range) * Math.random();
	return randomNumber;
}

function onMouseUp(event) {

let colorSelect = Math.round(randomNum(1, 3));
let color = 'white';

if (colorSelect === 1) {
color = 'yellow';
}

if (colorSelect === 2) {
  color = 'blue';
}

for (let i = 0; i < num; i++) {
		let spark = new Path.Circle(new Point(event.point), 2);
		spark.fillColor = color;
		sparks.push(spark);
		let gX = randomNum(-2, 2);
		let gY = randomNum(-2, 2);
		gravityX.push(gX);
		gravityY.push(gY);
		alphas.push(1);
	}
}

function onFrame(event){

	//render and animate particles
	for (let i = 0; i < sparks.length; i++) {
		let gx = gravityX[i];
		let gy = gravityY[i];
		let alphaValue = alphas[i];
		sparks[i].fillColor.alpha = alphaValue;
		sparks[i].position.x += gx;
		sparks[i].position.y += gy;
	}

	//change opacity of particles
	for (let i = 0; i < sparks.length; i++) {
		if (alphas[i] > 0) {
			let alphaValue = alphas[i];
			alphas[i] = alphaValue -= 0.01;
		}
	}

	//remove particles based on age (alpha)
	for (let i = 0; i < sparks.length; i++) {
		if (alphas[i] <= 0) {
			sparks.splice(i, 1);
			gravityX.splice(i, 1);
			gravityY.splice(i, 1);
			alphas.splice(i, 1);
		}
	}
}
