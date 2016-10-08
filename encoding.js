document.querySelector("textarea").addEventListener("keyup", update)
document.querySelector("textarea").focus()

Math.trunc = Math.trunc || function(x) {
  return x - x % 1;
}

function update(el) {
  var readyToDraw = encode(el.currentTarget.value)
  createCells(readyToDraw)
}

var chain = function(){
  var argArray = Array.prototype.slice.apply(arguments)
  var tmp;
  argArray.forEach(function(arg){
    tmp = arg(tmp)
  })
  return tmp;
}

function encode(source) {

    function directConvert(val) {
      return source.split("").map(function(char) {
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
      var tissue = []
      var total = 0
      var tmpCellTotal;

      // a,b,c,d
      // [2,3,4,5]
      // [[2,3],[1,6]]

      // just do this
      // each time there is a new value,
      // i want to compare it to the total value
      // i want to add it to the total value

      // then after
      // [add spaces]
      // [add markers]

      input.forEach(function(thisVal) {
        // for each new value, add it to total
        // x = divide total by eight
        // put modulo value in tissue[x]
        tissue.push([thisVal])
        total += thisVal
      })

      return tissue
      return [[2,3],[1,6],[4,5],[7,8]]

      //   console.log(tmpCellTotal);
      //   if(thisVal < 8) {
      //     tmpCell.push(thisVal)
      //   } else {
      //     tissue.push(tmpCell)
      //     tmpCell = []
      //     // push thisVal minus the empty spaces in the last cell
      //     tmpCell.push(thisVal)
      //   }
      // })
      // console.log(tissue);
    }
    // var parentArray = []
    // var tmpSubArray = [];
    // var total = 0;
    // var currentCellTotal = 0;
    // var modulo;
    //
    // // group new array into subarrays to represent cells
    // firstFlat.forEach(function(current) {
    //     // console.log("total: " + total + ", current: ", current + ", currentCellTotal: ", currentCellTotal);
    //     currentCellTotal = total % 8
    //     let difference = current
    //     total += current
    //     if (current + total > 8 || current + currentCellTotal > 8) {
    //     // current value is greater than 8
    //     // total value is greater than 8
    //     // currentCellTotal is greater than 8
    //     // calculate blank spaces and begin new cell
    //     } else if (current <= 8) {
    //     // total value is less than 8
    //     }
    //     // modulo is under 8
    //     if(modulo <= 8) {
    //       var x = Math.round(current / 8)
    //       // add x empty arrays
    //       tmpSubArray.length = 0
    //       modulo = 0
    //     }
    //     // modulo is over 8
    //     if(modulo > 8) {
    //       var x = Math.round(current / 8)
    //       // add x empty arrays
    //       tmpSubArray.length = 0
    //       modulo = 0
    //     }
    //     // current alone is over 8
    //     if(current > 8) {
    //     parentArray.push([])
    //     parentArray.push(current % 8)
    //     }
    // })

    return chain(directConvert, flatten, cellify)
}
//TODO add complete table
var charTable = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
