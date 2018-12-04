var points = [];
var distance = 3;

let angle = 0;

function setup() {
	points[0]  = new P4Vector(-1, 1,-1,-1);
	points[1]  = new P4Vector( 1, 1,-1,-1);
	points[2]  = new P4Vector( 1,-1,-1,-1);
	points[3]  = new P4Vector(-1,-1,-1,-1);
	points[4]  = new P4Vector(-1, 1, 1,-1);
	points[5]  = new P4Vector( 1, 1, 1,-1);
	points[6]  = new P4Vector( 1,-1, 1,-1);
	points[7]  = new P4Vector(-1,-1, 1,-1);
	points[8]  = new P4Vector(-1, 1,-1, 1);
	points[9]  = new P4Vector( 1, 1,-1, 1);
	points[10] = new P4Vector( 1,-1,-1, 1);
	points[11] = new P4Vector(-1,-1,-1, 1);
	points[12] = new P4Vector(-1, 1, 1, 1);
	points[13] = new P4Vector( 1, 1, 1, 1);
	points[14] = new P4Vector( 1,-1, 1, 1);
	points[15] = new P4Vector(-1,-1, 1, 1);

	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(51);
	translate(width/2,height/2);

	let projected = [];
	for (let i = 0; i < points.length; i++) {
		let projected3d = points[i].rotateZW(angle).project();
		let projected2d = projected3d.rotateXZ(angle/4).rotateYZ(-PI/16).project().mult(300);
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
