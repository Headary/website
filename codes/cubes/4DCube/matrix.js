function matmul(a,b) {
  let colsA = a[0].length;
  let rowsA = a.length;
  let colsB = b[0].length;
  let rowsB = b.length;

  var result = new Array(rowsA);
  for (var i = 0; i < result.length; i++) {
    result[i] = [];
  }

  if(colsA != rowsB) {
    console.log("ColsA not match rowsB");
    return null;
  }

  for (var i = 0; i < rowsA; i++) {
    for (var j = 0; j < colsB; j++) {
      let sum = 0;
      for (var k = 0; k < colsA; k++) {
        sum += a[i][k] * b [k][j]
      }
      result[i][j] = sum;
    }
  }
  return result;
}
