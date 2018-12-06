
class P5Vector {
  constructor(x,y,z,w, u) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.u = u;
  }

  matrix() {
    return [
      [this.x],
      [this.y],
      [this.z],
      [this.w],
      [this.u],
    ];
  }

  project() {
    let u = 1/(distance - this.u) * 2;
    let proj4d = [
      [u,0,0,0,0],
      [0,u,0,0,0],
      [0,0,u,0,0],
      [0,0,0,u,0]
    ];
    let mat = matmul(proj4d, this.matrix());
    return new P4Vector(mat[0], mat[1], mat[2], mat[3]);
  }

  rotate(axis,angle) {
    let rotMats = {
      "XU" : [
        [cos(angle), 0, 0, 0, -sin(angle)],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [sin(angle), 0, 0, 0, cos(angle)]
      ],
      "YU" : [
        [1, 0, 0, 0, 0],
        [0, cos(angle), 0, 0, -sin(angle)],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, sin(angle), 0, 0, cos(angle)]
      ],
      "ZU" : [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, cos(angle), 0, -sin(angle)],
        [0, 0, 0, 1, 0],
        [0, 0, sin(angle), 0, cos(angle)]
      ],
      "WU" : [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, cos(angle), -sin(angle)],
        [0, 0, 0, sin(angle), cos(angle)]
      ]
    }
    let rotation = rotMats[axis];
    let mat = matmul(rotation,this.matrix());
    return new P5Vector(mat[0],mat[1],mat[2], mat[3], mat[4]);
  }
}
