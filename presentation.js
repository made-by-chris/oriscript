// presentation layer generator
var containerHeight = document.body.clientHeight - (document.querySelector("textarea").clientHeight);
var containerWidth = document.body.clientWidth;
var gridResolution;
var gridSize =  containerWidth < containerHeight ? containerWidth : containerHeight;
var cellSize = gridSize / gridResolution;
var store = []
var draw = SVG('drawing').size(gridSize, gridSize);


function createCells(arr) {
  var x = document.querySelectorAll(".deleteme");
  [].forEach.call(x, function(div) {
    div.parentNode.removeChild(div);
  });
  containerHeight = document.body.clientHeight - document.querySelector("textarea").clientHeight;
  containerWidth = document.body.clientWidth;
  gridResolution = Math.ceil(Math.sqrt(arr.length))
  gridSize =  containerWidth < containerHeight ? containerWidth : containerHeight;

  cellSize = gridSize / gridResolution;
  drawGrid(arr.length)

  arr.length=Math.min(arr.length,gridResolution*gridResolution);
  const finalComputedValues = arr.map(function(cell) {
    function convertToPercent(arrarr) {
      return arrarr.map(function(arr) {
        return arr.map(function(num) {
          return num * cellSize / 100
        })
      })
    }
    var tmpParent = draw.group()
    cell.forEach(function(num) {
      var tmpChild = draw.group().addClass("deleteme")
      switch (num) {
        case "alpha":
        var alpha = tmpChild.polygon(convertToPercent([[5,0],[0,0],[0,5],[95,100],[100,100],[100,95]])).fill('black')
        tmpChild.add(alpha)
        break;
        case "num":
        var number = tmpChild.polygon(convertToPercent([[95,0],[100,0],[100,5],[5,100],[0,100],[0,95]])).fill('black')
        tmpChild.add(number)
        break;
        case "punc":
        var punctuation = tmpChild.polygon(convertToPercent([[0,0],[5,0],[20,15],[0,35],[0,45],[20,25],[95,100],[100,100],[100,95],[25,20],[45,0],[35,0],[15,20],[0,5]])).fill('black')
        tmpChild.add(punctuation)
        break;
        case "spec":
        var special = tmpChild.polygon(convertToPercent([[100,0],[95,0],[80,15],[100,35],[100,45],[80,25],[5,100],[0,100],[0,95],[75,20],[55,0],[65,0],[85,20],[100,5]])).fill('black')
        tmpChild.add(special)
        break;
        case "tags":
        var tags = tmpChild.polygon(convertToPercent([[0,0],[5,0],[50,45],[95,0],[100,0],[100,5],[55,50],[100,95],[100,100],[95,100],[50,55],[5,100],[0,100],[0,95],[45,50],[0,5]])).fill('black');
        tmpChild.add(tags)
        break;
        case 1:
        var one = tmpChild.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]])).fill('black')
        tmpChild.add(one)
        break;
        case 2:
        var two = tmpChild.polygon(convertToPercent([[30,0],[30,20],[40,20],[40,0]])).fill('black')
        tmpChild.add(two)
        break;
        case 3:
        var three = tmpChild.polygon(convertToPercent([[100,10],[80,10],[80,20],[100,20]])).fill('black')
        tmpChild.add(three)
        break;
        case 4:
        var four = tmpChild.polygon(convertToPercent([[100,30],[80,30],[80,40],[100,40]])).fill('black')
        tmpChild.add(four)
        break;
        case 5:
        var five = tmpChild.polygon(convertToPercent([[90,100],[90,80],[80,80],[80,100]])).fill('black')
        tmpChild.add(five)
        break;
        case 6:
        var six = tmpChild.polygon(convertToPercent([[60,100],[60,80],[70,80],[70,100]])).fill('black')
        tmpChild.add(six)
        break;
        case 7:
        var seven = tmpChild.polygon(convertToPercent([[0,90],[20,90],[20,80],[0,80]])).fill('black')
        tmpChild.add(seven)
        break;
        case 8:
        var eight = tmpChild.polygon(convertToPercent([[0,70],[20,70],[20,60],[0,60]])).fill('black')
        tmpChild.add(eight)
        break;
      }
       tmpParent.add(tmpChild)
    })
    return tmpParent
  })
  drawSquares(finalComputedValues)
}

function drawGrid() {
  for(i = 0; i < gridResolution + 1; i++) {
    draw.line(0, i * cellSize, gridSize, i * cellSize).stroke({ width: 1 }).addClass("deleteme")
    draw.line(i * cellSize, 0, i * cellSize, gridSize, i * cellSize).stroke({ width: 1 }).addClass("deleteme")
  }
}

function drawSquares(source) {
  var x = 0
  var y = 0
  var dimensionMaxLength = gridResolution -1;
  var bottomRightMax = dimensionMaxLength
  var topLeftMin = 0
  for(i = 0; i < source.length; i++) {
    // right side
    /* if x is equal to bottomRightMax and y is less than bottomRightMax, increment y */
    if ( x === bottomRightMax && y < bottomRightMax) {
      source[i].move(x * cellSize, y * cellSize)
      y++;
    } else
    // bottom side
    /* if x is equal to topLeftMin and y is equal to bottomRightMax plus one, decrement x */
    if ( x > topLeftMin && y === (bottomRightMax + 1)) {
      source[i].move(x * cellSize, y * cellSize)
      --x;
    } else
    // bottom right
    /* if x is equal to bottomRightMax and y is equal to bottomRightMax, decrement x, decrement bottomRightMax */
    if ( x === bottomRightMax && y === bottomRightMax) {
      source[i].move(x * cellSize, y * cellSize)
      x--;
      bottomRightMax--;
    } else
    // bottom left
    /* if x is equal to topLeftMin and y is equal to bottomRightMax plus 1, decrement y */
    if ( x === topLeftMin && y === bottomRightMax + 1 ) {
      source[i].move(x * cellSize, y * cellSize)
      y--;
    } else
    // left side
    /* if x is equal to topLeftMin and y is greater than topLeftMin, decrement y */
    if ( x === topLeftMin && y > topLeftMin ) {
      source[i].move(x * cellSize, y * cellSize)
      y--;
      if(y === topLeftMin + 1){
        topLeftMin++
      }
    } else
    // top left
    /* if x is equal to topLeftMin and y is equal topLeftMin, increment x, decrement topLeftMin */
    if ( x === topLeftMin && y === topLeftMin ) {
      source[i].move(x * cellSize, y * cellSize)
      x++;
    } else
    // top side
    /* if x is less than bottomRightMax ( and no other cases apply ) increment x */
    if ( x < bottomRightMax ) {
      source[i].move(x * cellSize, y * cellSize)
      x++;
    }
  }
}
