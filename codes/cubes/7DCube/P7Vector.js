class P7Vector {
  constructor(x, y, z, w, u, t, s) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.u = u;
    this.t = t;
    this.s = s;
  }

  matrix() {
    return [
      [this.x],
      [this.y],
      [this.z],
      [this.w],
      [this.u],
      [this.t],
      [this.s]
    ];
  }

  project() {
    let s = 1 / (distance - this.s) * 2;
    let proj6d = [
      [s, 0, 0, 0, 0, 0, 0],
      [0, s, 0, 0, 0, 0, 0],
      [0, 0, s, 0, 0, 0, 0],
      [0, 0, 0, s, 0, 0, 0],
      [0, 0, 0, 0, s, 0, 0],
      [0, 0, 0, 0, 0, s, 0]
    ];
    let mat = matmul(proj6d, this.matrix());
    return new P6Vector(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5]);
  }

  rotate(axis, angle) {
    let rotMats = {
      "XS": [
        [cos(angle), 0, 0, 0, 0, 0, -sin(angle)],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [sin(angle), 0, 0, 0, 0, 0, cos(angle)]
      ],
      "YS": [
        [1, 0, 0, 0, 0, 0, 0],
        [0, cos(angle), 0, 0, 0, 0, -sin(angle)],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, sin(angle), 0, 0, 0, 0, cos(angle)]
      ],
      "ZS": [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, cos(angle), 0, 0, 0, -sin(angle)],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, sin(angle), 0, 0, 0, cos(angle)]
      ],
      "WS": [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, cos(angle), 0, 0, -sin(angle)],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, sin(angle), 0, 0, cos(angle)]
      ],
      "US": [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, cos(angle), 0, -sin(angle)],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, sin(angle), 0, cos(angle)]
      ],
      "TS": [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, cos(angle), -sin(angle)],
        [0, 0, 0, 0, 0, sin(angle), cos(angle)]
      ]
    }
    let rotation = rotMats[axis];
    let mat = matmul(rotation, this.matrix());
    return new P7Vector(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5], mat[6]);
  }
}
