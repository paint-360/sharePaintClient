class DPAlgorithm {
    constructor(points, tolerance) {
      this.tolerance = tolerance
    }
    vacuate(points) {
      this.points = points
      if(!this.points.length) {
        throw new Error('没有传入待抽稀数组')
      }
      if (this.points.length < 3) return this.points
  
      let spIndex = 0
      let epIndex = this.points.length -1
      let indexArr = []
      indexArr.push(spIndex)
      indexArr.push(epIndex)
  
      while(this.points[spIndex].x == this.points[epIndex].x && this.points[spIndex].y == this.points[epIndex].y) {
        epIndex --
      }
  
      this.reduce(spIndex, epIndex, indexArr)
  
      indexArr.sort((a, b) => a - b);
      return indexArr.map(index => this.points[index])
  
    }
    reduce(spIndex, epIndex, indexArr) {
      let maxDist = 0, idxFarthest = 0
      for (let i = spIndex, dist; i < epIndex; i++) {
        dist = this.verticalDimension(this.points[spIndex], this.points[epIndex], this.points[i]) //获取当前点到起点与
        if (dist > maxDist) { //保存最远距离
            maxDist = dist
            idxFarthest = i
        }
      }
      if (maxDist > this.tolerance && idxFarthest != 0) { //如果最远距离大于临界值
          indexArr.push(idxFarthest);
          this.reduce(spIndex, idxFarthest, indexArr)
          this.reduce(idxFarthest, epIndex, indexArr)
      }
    }
    verticalDimension(startPoint, endPoint, comparePoint) {
      const x1 = endPoint[0] - startPoint[0]
      const y1 = endPoint[1] - startPoint[1]
      const x2 = endPoint[0] - comparePoint[0]
      const y2 = endPoint[1] - comparePoint[1]  
  
      const beDist = Math.sqrt((startPoint[0] - endPoint[0]) ** 2 + (startPoint[1] - endPoint[1]) ** 2)
      return Math.abs(x1 * y2 - x2 * y1) / beDist
    }
  }