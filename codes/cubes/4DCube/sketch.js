var points = [];
var distance = 3;

let angle = 0;
let scale = 1;

function setup() {
	let index = 0;
	for (var b = 0; b < 2; b++) {
		let w = ((b == 0) ? 1 : -1);
		for (var a = 0; a < 2; a++) {
			let z = ((a == 0) ? 1 : -1);
			points[index++] = new P4Vector(-1, 1, z, w);
			points[index++] = new P4Vector( 1, 1, z, w);
			points[index++] = new P4Vector( 1,-1, z, w);
			points[index++] = new P4Vector(-1,-1, z, w);
		}
	}

	createCanvas(windowWidth, windowHeight);
	scale = min(width,height);
}

function draw() {
	background(51);
	translate(width/2,height/2);

	let projected = [];
	for (let i = 0; i < points.length; i++) {
		let projected3d = points[i].rotateZW(angle).project();
		let projected2d = projected3d.rotateXZ(angle/4).rotateYZ(-PI/16).project().mult(scale*0.5);
		stroke(255);
		strokeWeight(16);
		noFill();
		point(projected2d.x,projected2d.y);
		projected[i] = projected2d;
	}

	for (var i = 0; i < 4; i++) {
		// stroke(255,0,0);
		connect(i,(i+1) % 4,projected);
		connect(i+4	,((i+1) % 4) + 4,projected);
		connect(i,i+4,projected);
		// stroke(0,0,255);
		connect(i+8	,((i+1) % 4) + 8,projected);
		connect(i+12,((i+1) % 4) + 12,projected);
		connect(i+8,i+12,projected);
		// stroke(255);
		connect(i,i+8,projected);
		connect(i+4,i+12,projected)
	}
	angle += 0.02;
}

function connect(a,b,mat) {
	strokeWeight(2);
	line(mat[a].x,mat[a].y,mat[b].x,mat[b].y);
}
