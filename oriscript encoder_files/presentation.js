// presentation layer generator
var test = [["alpha",1,2,3,4,5,6,7,8], ["num",2,4,6,8], [2,4,6,8], [2,4,6,8], [], [1,3,6], [1,3,6], [1,3,6], [], [], [8], [7], [6], [5], [4], [3], [2], [1]];

var containerHeight = document.body.clientHeight - document.querySelector("textarea").clientHeight;
var containerWidth = document.body.clientWidth;
var gridResolution = Math.ceil(test.length / 3);
var gridSize =  containerWidth < containerHeight ? containerWidth : containerHeight;
var cellSize = gridSize / gridResolution;
var draw = SVG('drawing').size(gridSize, gridSize);

function createCells(arr) {
  document.querySelector("svg").remove()
  var draw = SVG('drawing').size(gridSize, gridSize);
  gridResolution = Math.ceil(arr.length / 3);
  gridSize =  containerWidth < containerHeight ? containerWidth : containerHeight;
  cellSize = gridSize / gridResolution;

  var finalComputedValues = arr.map(function(cell) {
    var group = draw.group()
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
        var alpha = draw.polygon(convertToPercent([[0,0],[0,10],[100,100],[100,90]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(alpha)
        break;
        case "num":
        var number = draw.polygon(convertToPercent([[100,0],[100,10],[0,100],[0,90]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(number)
        break;
        case "punc":
        var punctuation = draw.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(punctuation)
        case "4":
        break;
        var one = draw.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(one)
        break;
        case 1:
        var one = draw.polygon(convertToPercent([[10,0],[10,20],[20,20],[20,0]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(one)
        break;
        case 2:
        var two = draw.polygon(convertToPercent([[30,0],[30,20],[40,20],[40,0]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(two)
        break;
        case 3:
        var three = draw.polygon(convertToPercent([[100,10],[80,10],[80,20],[100,20]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(three)
        break;
        case 4:
        var four = draw.polygon(convertToPercent([[100,30],[80,30],[80,40],[100,40]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(four)
        break;
        case 5:
        var five = draw.polygon(convertToPercent([[90,100],[90,80],[80,80],[80,100]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(five)
        break;
        case 6:
        var six = draw.polygon(convertToPercent([[60,100],[60,80],[70,80],[70,100]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(six)
        break;
        case 7:
        var seven = draw.polygon(convertToPercent([[0,90],[20,90],[20,80],[0,80]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(seven)
        break;
        case 8:
        var eight = draw.polygon(convertToPercent([[0,70],[20,70],[20,60],[0,60]]))
        .fill('black').stroke({ width: 1 }).addClass("deletion-target");
        group.add(eight)
        break;
        default:
        break;
      }
    })
    return group;
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
  var currentX = 0;
  var currentY = 0;
  var maxX = gridResolution;
  var maxY = gridResolution;
  var attrs = {fill: 'white'}
  // stripLength will decrement each time a length has been used and the grid has turned
  var stripLength = gridResolution
  var justChanged = false;

  for(i = 0; i < source.length; i++) {
    // if on right edge
    if(currentX === stripLength && currentY === stripLength) {
      //console.log("at the right edge")
      source[i].move(currentX * cellSize, currentY * cellSize)
      --currentX
      continue
    }
    //TODO: striplength is just looping here, get it to spiral correctly
    if(currentY === stripLength && currentX === 0) {
      if(justChanged){
        justChanged = false
      } else {
        stripLength--
        justChanged = true
        console.log("decremented")
      }

    }
    // if on left edge
    if(currentX === 0 && currentY > 0) {
      //console.log("going up")
      source[i].move(currentX * cellSize, currentY * cellSize)
      --currentY
      continue
    }
    // if along right edge
    else if(currentX === stripLength) {
      //console.log("going down")
      source[i].move((currentX -1) * cellSize, currentY * cellSize)
      ++currentY
      continue
    }
    // if along bottom edge
    else if(currentY === stripLength) {
      //console.log("going left")
      source[i].move(currentX * cellSize, (currentY -1) * cellSize)
      --currentX
      continue
    }
    // default, if travelling right
    else {
      //console.log("going right")
      source[i].move(currentX * cellSize, currentY * cellSize)
      ++currentX
      continue
    }
  }
}

drawGrid(test)
// function go(source) {
//   drawGrid(source)
//   createCell(source)
// }
// go(test)

//SVG.on(window, 'resize', function() { go() })
