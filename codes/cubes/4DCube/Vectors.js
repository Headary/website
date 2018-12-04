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
    let proj2d = [
    	[1,0,0],
    	[0,1,0]
    ];
    let mat = matmul(proj2d, this.matrix());
    return new P2Vector(mat[0], mat[1]);
  }

  rotateXY(angle) {
    let rotation = [
      [cos(angle), -sin(angle), 0],
      [sin(angle), cos(angle), 0],
      [0, 0, 1]
    ]
    let mat = matmul(rotation,this.matrix());
    return new P3Vector(mat[0],mat[1],mat[2]);
  }
  rotateXZ(angle) {
    let rotation = [
      [cos(angle), 0, -sin(angle)],
      [0, 1, 0],
      [sin(angle), 0, cos(angle)]
    ]
    let mat = matmul(rotation,this.matrix());
    return new P3Vector(mat[0],mat[1],mat[2]);
  }
  rotateYZ(angle) {
    let rotation = [
      [1, 0, 0],
      [0,cos(angle), -sin(angle)],
      [0,sin(angle), cos(angle)]
    ]
    let mat = matmul(rotation,this.matrix());
    return new P3Vector(mat[0],mat[1],mat[2]);
  }
}

class P4Vector {
  constructor(x,y,z,w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  matrix() {
    return [
      [this.x],
      [this.y],
      [this.z],
      [this.w],
    ];
  }

  project() {
    let w = 1/(distance - this.w);
    let proj3d = [
      [w,0,0,0],
      [0,w,0,0],
      [0,0,w,0]
    ];
    let mat = matmul(proj3d, this.matrix());
    return new P3Vector(mat[0], mat[1], mat[2]);
  }

  rotateXW(angle) {
    let rotation = [
      [cos(angle), 0, 0, -sin(angle)],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [sin(angle), 0, 0, cos(angle)],
    ]
    let mat = matmul(rotation,this.matrix());
    return new P4Vector(mat[0],mat[1],mat[2], mat[3]);
  }

  rotateYW(angle) {
    let rotation = [
      [1, 0, 0, 0],
      [0, cos(angle), 0, -sin(angle)],
      [0, 0, 1, 0],
      [0, sin(angle), 0, cos(angle)],
    ]
    let mat = matmul(rotation,this.matrix());
    return new P4Vector(mat[0],mat[1],mat[2], mat[3]);
  }

  rotateZW(angle) {
    let rotation = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)],
    ]
    let mat = matmul(rotation,this.matrix());
    return new P4Vector(mat[0],mat[1],mat[2], mat[3]);
  }

}
