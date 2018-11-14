var encoding = [
    ["alpha","a","b","c","d","e","f","g","h","i","j","k","l","m","ä","ü","n","o","p","q","r","s","t","u","v","w","x","y","z","ß","ö","æ"],
    ["num","1","2","3","4","5","6","7","8","9","0","(","[","{","mod","φ","=","+","−","×","÷","%",">","<","^",".","#",")","]","}","π","∥"],
    //                              <ET>   <GT>   <RT>   <AT>   <HT>   <CT>                                       <ET2>  <GT2>  <RT2>  <AT2>  <HT2>  <CT2>      empty?
    ["punc",".","!","?","”","«",":","\x10","\x11","\x12","\x13","\x14","\x15","ą","ñ"," ",",","¡","¿","„","»",";","\x16","\x17","\x18","\x19","\x1a","\x1b","ę",""],
    //                  RETURN                                        case   .com       DEL    ESC
    ["spec","@","-","~","\r","≥","∞","\\","€","£","°","¦","⟨","⁄","‰","\x1f","\x1c","_","\x08","\x1e","≤","*","¤","$","¥","•","|","⟩","/","‱"],
    //      left   here   false  enter  yes    share  destroy sooner space  email  name   phone  pin    SOS    right  !here  opposite exit   no    !share protect later  time  address username IP    password
    ["tags","\x80","\x81","\x82","\x83","\x84","\x85","\x86", "\x87","\x88","\x89","\x8a","\x8b","\x8c","\x8d","\x8e","\x8f","\x90",  "\x91","\x92","\x93","\x94","\x95","\x96","\x97","\x98",  "\x99","\x9a"]
];
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
    source = source.toLowerCase()
    return source
    .split("")
    .filter((char) => {
      return charTable.indexOf(char) === -1 ? false : true;
    })
    .map((char) => {
      var ind = charTable.indexOf(char) + 1
      if (char === " ") {
        return ["space"]
      }
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
    let total=0;
    input.forEach(function(thisVal) {
      let currentCell;
      let newTotal = total + thisVal;
      if(typeof thisVal==="string"){
        total += Math.abs((total % 8) - 8)
        tissue[Math.floor(total / 8)] = [thisVal];
      }else{
        if(Number.isInteger(newTotal / 8)){
          currentCell = (newTotal / 8) - 1
        } else {
          currentCell = Math.floor(newTotal / 8)
        }
        remainder = (newTotal % 8 === 0 ? 8 : newTotal % 8)
        tissue[currentCell] ? tissue[currentCell].push(remainder) : tissue[currentCell] = [remainder];
        total += thisVal
      }
    });
    for(var i = 0; i < tissue.length; i++) {
      if(tissue[i] === undefined) {
        tissue[i] = []
      }
    }
    return tissue;
  }

  return chain(directConvert, flatten, cellify)
}
input = document.querySelector("textarea")
input.innerText = "All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood."
function triggerEvent(el, type){
if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on'+e.eventType, e);
    }
}
triggerEvent(input, "keyup")
