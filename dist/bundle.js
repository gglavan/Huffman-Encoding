/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BinaryHeap__ = __webpack_require__(1);


function HuffmanEncoding(str) {
    this.str = str;
 
    const count_chars = {};
    for (let i = 0; i < str.length; i++) 
        if (str[i] in count_chars) 
            count_chars[str[i]] ++;
        else 
            count_chars[str[i]] = 1;
 
    const pq = new __WEBPACK_IMPORTED_MODULE_0__BinaryHeap__["a" /* BinaryHeap */](function(x){return x[0];});
    for (let ch in count_chars) 
        pq.push([count_chars[ch], ch]);
 
    while (pq.size() > 1) {
        const pair1 = pq.pop();
        const pair2 = pq.pop();
        pq.push([pair1[0]+pair2[0], [pair1[1], pair2[1]]]);
    }
 
    const tree = pq.pop();
    this.encoding = {};
    this._generate_encoding(tree[1], "");
 
    this.encoded_string = ""
    for (let i = 0; i < this.str.length; i++) {
        this.encoded_string += this.encoding[str[i]];
    }
}
 
HuffmanEncoding.prototype._generate_encoding = function(ary, prefix) {
    if (ary instanceof Array) {
        this._generate_encoding(ary[0], prefix + "0");
        this._generate_encoding(ary[1], prefix + "1");
    }
    else {
        this.encoding[ary] = prefix;
    }
}
 
HuffmanEncoding.prototype.inspect_encoding = function() {
    const myNode = document.getElementById("tbody");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    for (let ch in this.encoding) {
        const el = `<tr><td>'${ch}'</td><td>${this.encoding[ch]}</td></tr>`
        document.getElementById('tbody').insertAdjacentHTML( 'beforeend', el );
    }
}
 
HuffmanEncoding.prototype.decode = function(encoded) {
    const rev_enc = {};
    for (let ch in this.encoding) 
        rev_enc[this.encoding[ch]] = ch;
 
    let decoded = "";
    let pos = 0;
    while (pos < encoded.length) {
        var key = ""
        while (!(key in rev_enc)) {
            key += encoded[pos];
            pos++;
        }
        decoded += rev_enc[key];
    }
    return decoded;
}

document.getElementById('input').addEventListener('input', function() {
    const inputString = document.getElementById('input').value;
    if(inputString === "") {
        document.getElementById('tbody').style.display = 'none';
    } else {
        document.getElementById('tbody').style.display = '';
        const huff = new HuffmanEncoding(inputString);
        huff.inspect_encoding();
        const encodedString = huff.encoded_string;
        document.getElementById('output').innerHTML = encodedString;
        const t = huff.decode(encodedString);
        console.log(t);    
    }
});

 


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = BinaryHeap;
 function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }
  
  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },
  
    pop: function() {
      // Store the first element so we can return it later.
      const result = this.content[0];
      // Get the element at the end of the array.
      const end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },
  
    remove: function(node) {
      const length = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (let i = 0; i < length; i++) {
        if (this.content[i] != node) continue;
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        const end = this.content.pop();
        // If the element we popped was the one we needed to remove,
        // we're done.
        if (i == length - 1) break;
        // Otherwise, we replace the removed element with the popped
        // one, and allow it to float up or sink down as appropriate.
        this.content[i] = end;
        this.bubbleUp(i);
        this.sinkDown(i);
        break;
      }
    },
  
    size: function() {
      return this.content.length;
    },
  
    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      const element = this.content[n];
      const score = this.scoreFunction(element);
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        const parentN = Math.floor((n + 1) / 2) - 1,
        parent = this.content[parentN];
        // If the parent has a lesser score, things are in order and we
        // are done.
        if (score >= this.scoreFunction(parent))
          break;
  
        // Otherwise, swap the parent with the current element and
        // continue.
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
      }
    },
  
    sinkDown: function(n) {
      // Look up the target element and its score.
      const length = this.content.length,
      element = this.content[n],
      elemScore = this.scoreFunction(element);
  
      while(true) {
        // Compute the indices of the child elements.
        const child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        let swap = null;
        let child1Score;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          const child1 = this.content[child1N];
          child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          const child2 = this.content[child2N];
          const child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score))
            swap = child2N;
        }
  
        // No need to swap further, we are done.
        if (swap == null) break;
  
        // Otherwise, swap and continue.
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
    }
  };
  

/***/ })
/******/ ]);