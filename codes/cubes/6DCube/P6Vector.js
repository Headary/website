
class P6Vector {
  constructor(x,y,z,w,u,t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.u = u;
    this.t = t;
  }

  matrix() {
    return [
      [this.x],
      [this.y],
      [this.z],
      [this.w],
      [this.u],
      [this.t]
    ];
  }

  project() {
    let t = 1/(distance - this.t) * 2;
    let proj5d = [
      [t,0,0,0,0,0],
      [0,t,0,0,0,0],
      [0,0,t,0,0,0],
      [0,0,0,t,0,0],
      [0,0,0,0,t,0]
    ];
    let mat = matmul(proj5d, this.matrix());
    return new P5Vector(mat[0], mat[1], mat[2], mat[3], mat[4]);
  }

  rotate(axis,angle) {
    let rotMats = {
      "XT" : [
        [cos(angle), 0, 0, 0, 0, -sin(angle)],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [sin(angle), 0, 0, 0, 0, cos(angle)]
      ],
      "YT" : [
        [1, 0, 0, 0, 0, 0],
        [0, cos(angle), 0, 0, 0, -sin(angle)],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, sin(angle), 0, 0, 0, cos(angle)]
      ],
      "ZT" : [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, cos(angle), 0, 0, -sin(angle)],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, sin(angle), 0, 0, cos(angle)]
      ],
      "WT" : [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, cos(angle), 0, -sin(angle)],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, sin(angle), 0, cos(angle)]
      ],
      "UT" : [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, cos(angle), -sin(angle)],
        [0, 0, 0, 0, sin(angle), cos(angle)]
      ]
    }
    let rotation = rotMats[axis];
    let mat = matmul(rotation,this.matrix());
    return new P6Vector(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5]);
  }
}
