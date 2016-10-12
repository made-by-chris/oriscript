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
      let tissue = [[]]
      let tmpCellTotal = 0
      let thisValAdded = 0
      let tmpCellEmptySpaces = 0
      let previousSymbolIndicator
      let total = 0;

      input.forEach(function(thisVal) {
        // if(thisVal !== previousSymbolIndicator) {
        //   previousSymbolIndicator = thisVal
        //   tissue.push(tmpCell)
        //   tmpCell = [thisVal]
        //   continue
        // }
        if(tissue[tissue.length - 1].length) {
          tmpCellTotal = tissue[tissue.length - 1].reduce((a, b, c) => a + b)
          thisValAdded = [tissue[tissue.length - 1].length - 1] + thisVal
          tmpCellEmptySpaces = 8 - tmpCellTotal
        }
        numberOfBlankArraysToInsert = Math.floor(thisVal / 8)
        if(thisValAdded <= 8) {
          tissue[tissue.length - 1].push(thisValAdded)
        } else {
          for( i = 0; i <= numberOfBlankArraysToInsert; i++) {
            tissue.push([])
          }
          tissue[tissue.length - 1] = [(thisVal - tmpCellEmptySpaces)]
        }
        total += thisVal
        console.log();
        console.log("total ", total, "cells ", Math.floor(total / 8), "remainder ", total % 8);
      })
      return tissue
    }

    return chain(directConvert, flatten, cellify)
}
