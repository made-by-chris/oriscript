// presentation layer generator
var test = [["alpha",1,2,3,4,5,6,7,8], ["num",2,4,6,8], [2,4,6,8], [2,4,6,8], [], [1,3,6], [1,3,6], [1,3,6], [], [], [8], [7], [6], [5], [4], [3], [2], [1]];
var numberTest = function(ln){
  var base = []
  for(var i = 0; i <= ln; i++) {
    base.push([i])
  }
  return base
}

var containerHeight = document.body.clientHeight - document.querySelector("textarea").clientHeight;
var containerWidth = document.body.clientWidth;
var gridResolution = Math.ceil(test.length / 3);
var gridSize =  containerWidth < containerHeight ? containerWidth : containerHeight;
var cellSize = gridSize / gridResolution;
var store = []
var draw = SVG('drawing').size(gridSize, gridSize);

drawGrid(numberTest(30))
drawSquares(numberTest(30))

function createCells(arr) {
  var x = document.querySelectorAll(".deleteme")
  console.log(x);
  [].forEach.call(x, function(div) {
    div.parentNode.removeChild(div);
  });

  var tmpChild = draw.group()

  var finalComputedValues = arr.map(function(cell) {
    function convertToPercent(arrarr) {
      return arrarr.map(function(arr) {
        return arr.map(function(num) {
          return num * cellSize / 100
        })
      })
    }

    cell.map(function(num) {
      switch (num) {
        case "alpha":
        var alpha = tmpChild.polygon(convertToPercent([[0,0],[0,10],[100,100],[100,90]])).fill('black').addClass("deleteme")
        tmpChild.add(alpha)
        break;
        case "num":
        var number = tmpChild.polygon(convertToPercent([[100,0],[100,10],[0,100],[0,90]])).fill('black').addClass("deleteme")
        tmpChild.add(number)
        break;
        case "punc":
        var punctuation = tmpChild.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]])).fill('black').addClass("deleteme")
        tmpChild.add(punctuation)
        case "4":
        break;
        var one = tmpChild.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]])).fill('black').addClass("deleteme")
        tmpChild.add(one)
        break;
        case 1:
        var one = tmpChild.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]])).fill('black').addClass("deleteme")
        tmpChild.add(one)
        break;
        case 2:
        var two = tmpChild.polygon(convertToPercent([[30,0],[30,20],[40,20],[40,0]])).fill('black').addClass("deleteme")
        tmpChild.add(two)
        break;
        case 3:
        var three = tmpChild.polygon(convertToPercent([[100,10],[80,10],[80,20],[100,20]])).fill('black').addClass("deleteme")
        tmpChild.add(three)
        break;
        case 4:
        var four = tmpChild.polygon(convertToPercent([[100,30],[80,30],[80,40],[100,40]])).fill('black').addClass("deleteme")
        tmpChild.add(four)
        break;
        case 5:
        var five = tmpChild.polygon(convertToPercent([[90,100],[90,80],[80,80],[80,100]])).fill('black').addClass("deleteme")
        tmpChild.add(five)
        break;
        case 6:
        var six = tmpChild.polygon(convertToPercent([[60,100],[60,80],[70,80],[70,100]])).fill('black').addClass("deleteme")
        tmpChild.add(six)
        break;
        case 7:
        var seven = tmpChild.polygon(convertToPercent([[0,90],[20,90],[20,80],[0,80]])).fill('black').addClass("deleteme")
        tmpChild.add(seven)
        break;
        case 8:
        var eight = tmpChild.polygon(convertToPercent([[0,70],[20,70],[20,60],[0,60]])).fill('black').addClass("deleteme")
        tmpChild.add(eight)
        break;
        default:
        break;
      }
    })
    return tmpChild;
  })
  drawSquares(finalComputedValues)
}

// createCell(test)
function draw(cells){
  cells.forEach(function(cell){createCell(cell)})
}

function drawGrid(source) {
  for(i = 0; i < gridResolution + 1; i++) {
    draw.line(0, i * cellSize, cellSize * source.length / 2 + 50, i * cellSize).stroke({ width: 1 })
    draw.line(i * cellSize, 0, i * cellSize, gridSize, i * cellSize).stroke({ width: 1 })
  }
}

function drawSquares(source) {
  var x = 0
  var y = 0
  var dimensionMaxLength = gridResolution -1;
  var bottomRightMax = dimensionMaxLength
  var topLeftMin = 0
  for(i = 0; i < source.length; i++) {
    // console.log(
    //   "step: ", i,
    //   "x: ", x,
    //   "y: ", y,
    //   "bottomRightMax", bottomRightMax,
    //   "topLeftMin", topLeftMin
    // );
    // right side
    /* if x is equal to bottomRightMax and y is less than bottomRightMax, increment y */
    if ( x === bottomRightMax && y < bottomRightMax) {
      console.log("right side");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      y++;
    } else
    // bottom side
    /* if x is equal to topLeftMin and y is equal to bottomRightMax plus one, decrement x */
    if ( x > topLeftMin && y === (bottomRightMax + 1)) {
      console.log("bottom side");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      --x;
    } else
    // bottom right
    /* if x is equal to bottomRightMax and y is equal to bottomRightMax, decrement x, decrement bottomRightMax */
    if ( x === bottomRightMax && y === bottomRightMax) {
      console.log("bottom right");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      x--;
      bottomRightMax--;
    } else
    // bottom left
    /* if x is equal to topLeftMin and y is equal to bottomRightMax plus 1, decrement y */
    if ( x === topLeftMin && y === bottomRightMax + 1 ) {
      console.log("bottom left");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      y--;
    } else
    // left side
    /* if x is equal to topLeftMin and y is greater than topLeftMin, decrement y */
    if ( x === topLeftMin && y > topLeftMin ) {
      console.log("left side");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      y--;
    } else
    // top left
    /* if x is equal to topLeftMin and y is equal topLeftMin, increment x, decrement topLeftMin */
    if ( x === topLeftMin && y === topLeftMin ) {
      console.log("top left");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      x++;
      if(i > 0){topLeftMin++};
    } else
    // top side
    /* if x is less than bottomRightMax ( and no other cases apply ) increment x */
    if ( x < bottomRightMax ) {
      console.log("top side");
      store["cell" + i] = draw.text(JSON.stringify(source[i][0])).move(x * cellSize, y * cellSize)
      x++;
    }
    console.log("loopstep", i, "x", x, "topLeftMin", topLeftMin, "y", y, "bottomRightMax", bottomRightMax);
  }
}

drawGrid(test)
