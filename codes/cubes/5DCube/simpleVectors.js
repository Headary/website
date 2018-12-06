class P2Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  mult(scale) {
    return new P2Vector(this.x*scale, this.y*scale);
  }
}

class P3Vector {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

  matrix() {
    return [
      [this.x],
      [this.y],
      [this.z],
    ];
  }

  project() {
    let z = 1/(distance - this.z) * 2;
    let proj2d = [
    	[z,0,0],
    	[0,z,0]
    ];
    let mat = matmul(proj2d, this.matrix());
    return new P2Vector(mat[0], mat[1]);
  }

  rotate(axis, angle) {
    let rotMats = {
      "XY" : [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1]
      ],
      "XZ" : [
        [cos(angle), 0, -sin(angle)],
        [0, 1, 0],
        [sin(angle), 0, cos(angle)]
      ],
      "YZ" : [
        [1, 0, 0],
        [0,cos(angle), -sin(angle)],
        [0,sin(angle), cos(angle)]
      ]
    }
    let rotation = rotMats[axis];
    let mat = matmul(rotation,this.matrix());
    return new P3Vector(mat[0],mat[1],mat[2]);
  }
}
