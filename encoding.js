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
    // preprocess
    source=source
    .replace(/DEL/g,         "\x08")
    .replace(/<ET>/g,        "\x10")
    .replace(/<GT>/g,        "\x11")
    .replace(/<RT>/g,        "\x12")
    .replace(/<AT>/g,        "\x13")
    .replace(/<HT>/g,        "\x14")
    .replace(/<CT>/g,        "\x15")
    .replace(/<ET2>/g,       "\x16")
    .replace(/<GT2>/g,       "\x17")
    .replace(/<RT2>/g,       "\x18")
    .replace(/<AT2>/g,       "\x19")
    .replace(/<HT2>/g,       "\x1a")
    .replace(/<CT2>/g,       "\x1b")
    .replace(/\.com/g,       "\x1c")
    .replace(/ESC/g,         "\x1e")
    .replace(/(^|\s)left(\s|$)/ig,       "\x80")
    .replace(/(^|\s)here(\s|$)/ig,       "\x81")
    .replace(/(^|\s)false(\s|$)/ig,      "\x82")
    .replace(/(^|\s)enter(\s|$)/ig,      "\x83")
    .replace(/(^|\s)yes(\s|$)/ig,        "\x84")
    .replace(/(^|\s)share(\s|$)/ig,      "\x85")
    .replace(/(^|\s)destroy(\s|$)/ig,    "\x86")
    .replace(/(^|\s)sooner(\s|$)/ig,     "\x87")
    .replace(/(^|\s)space(\s|$)/ig,      "\x88")
    .replace(/(^|\s)e-?mail(\s|$)/ig,    "\x89")
    .replace(/(^|\s)name(\s|$)/ig,       "\x8a")
    .replace(/(^|\s)phone(\s|$)/ig,      "\x8b")
    .replace(/(^|\s)pin(\s|$)/ig,        "\x8c")
    .replace(/(^|\s)sos(\s|$)/ig,        "\x8d")
    .replace(/(^|\s)right(\s|$)/ig,      "\x8e")
    .replace(/(^|\s)not \x81(\s|$)/ig,   "\x8f")
    .replace(/(^|\s)opposite(\s|$)/ig,   "\x90")
    .replace(/(^|\s)exit(\s|$)/ig,       "\x91")
    .replace(/(^|\s)no(\s|$)/ig,         "\x92")
    .replace(/(^|\s)don'?t \x85(\s|$)/ig,"\x93")
    .replace(/(^|\s)protect(\s|$)/ig,    "\x94")
    .replace(/(^|\s)later(\s|$)/ig,      "\x95")
    .replace(/(^|\s)time(\s|$)/ig,       "\x96")
    .replace(/(^|\s)address(\s|$)/ig,    "\x97")
    .replace(/(^|\s)username(\s|$)/ig,   "\x98")
    .replace(/(^|\s)IP(\s|$)/ig,         "\x99")
    .replace(/(^|\s)password(\s|$)/ig,   "\x9a")
    ;
    var text="";
    // introduce \x1f as a sign of switched case
    var lowercase=true;
    for(var i=0;i<source.length;i++){
      var c=source.charAt(i);
      if(c.match(/[a-zA-Z]/)){
        if(!c.match(/[a-z]/)===lowercase){
          text+="\x1f";
          lowercase=!!c.match(/[a-z]/);
        }
        c=c.toLowerCase();
      }
      text+=c;
    }
    text=text
    .split("")
    .map((char)=>{
      if(char===' ') return {table:true,glyph:0};
      var ret={table:false,glyph:-1};
      for(var i=0;i<encoding.length;i++){
        if((ret.glyph=encoding[i].indexOf(char))!==-1){
          ret.table=encoding[i][0];
          break;
        }
      }
      return ret;
    })
    .filter(elem => elem.table);
    var table="alpha";
    source=[];
    for(var i=0;i<text.length;i++){
      var elem=text[i];
      if(elem.table===true&&elem.glyph===0){
        source.push("alpha");
        continue;
      }
      if(elem.table!==table){
          source.push(elem.table);
          table=elem.table;
      }
      var max=15;
      if(table==="punc"||table==="spec"){
          max=14;
      }else if(table==="tags"){
          max=13;
      }
      if(elem.glyph>max){
          source.push([1,elem.glyph-max]);
      }else{
          source.push(elem.glyph+1);
      }
    }
    return source;
  }

  function flatten(arr) {
     var x = [].concat.apply([], arr);
     return x;
  }

  function cellify(input) {
    let tissue = [[]]
    let total=1;
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
    console.log(tissue);
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
