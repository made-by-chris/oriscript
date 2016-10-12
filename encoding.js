var charTable = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
document.querySelector("textarea").addEventListener("keyup", update)
document.querySelector("textarea").focus()

Math.trunc = Math.trunc || function(x) {
  return x - x % 1;
}

function update(el) {
  var readyToDraw = encode(el.currentTarget.value)
  createCells(readyToDraw)
}

function chain(){
  var argArray = Array.prototype.slice.apply(arguments)
  var tmp;
  argArray.forEach(function(arg){
    tmp = arg(tmp)
  })
  return tmp;
}

function encode(source) {
  function directConvert(val) {
    return source
    .split("")
    .filter((char) => {
      return charTable.indexOf(char) === -1 ? false : true;
    })
    .map((char) => {
      var ind = charTable.indexOf(char) + 2
      if (ind > 14) {
        return [1, ind - 14]
      }
      return ind
    })
  }

  function flatten(arr) {
     var x = [].concat.apply([], arr);
     return x
  }

  function cellify(input) {
    let tissue = [[]]
    let total = 0;

    input.forEach(function(thisVal) {
      newTotal = total + thisVal
      if(Number.isInteger(newTotal / 8)){
        currentCell = (newTotal / 8) - 1
      } else {
        currentCell = Math.floor(newTotal / 8)
      }
      remainder = (newTotal % 8 === 0 ? 8 : newTotal % 8)
      tissue[currentCell] ? tissue[currentCell].push(remainder) : tissue[currentCell] = [remainder];
      total += thisVal
    })
    for(var i = 0; i < tissue.length; i++) {
      if(tissue[i] === undefined) {
        tissue[i] = []
      }
    }
    return tissue
  }

  return chain(directConvert, flatten, cellify)
}
