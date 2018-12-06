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
    let w = 1/(distance - this.w) * 2;
    let proj3d = [
      [w,0,0,0],
      [0,w,0,0],
      [0,0,w,0]
    ];
    let mat = matmul(proj3d, this.matrix());
    return new P3Vector(mat[0], mat[1], mat[2]);
  }

  rotate(axis,angle) {
    let rotMats = {
      "XW" : [
        [cos(angle), 0, 0, -sin(angle)],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [sin(angle), 0, 0, cos(angle)],
      ],
      "YW" : [
        [1, 0, 0, 0],
        [0, cos(angle), 0, -sin(angle)],
        [0, 0, 1, 0],
        [0, sin(angle), 0, cos(angle)],
      ],
      "ZW" : [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, cos(angle), -sin(angle)],
        [0, 0, sin(angle), cos(angle)],
      ]
    }
    let rotation = rotMats[axis];
    let mat = matmul(rotation,this.matrix());
    return new P4Vector(mat[0],mat[1],mat[2], mat[3]);
  }
}
