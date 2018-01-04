import { BinaryHeap } from './BinaryHeap';

function HuffmanEncoding(str) {
    this.str = str;
 
    const count_chars = {};
    for (let i = 0; i < str.length; i++) 
        if (str[i] in count_chars) 
            count_chars[str[i]] ++;
        else 
            count_chars[str[i]] = 1;
 
    const pq = new BinaryHeap(function(x){return x[0];});
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
        let key = ""
        while (!(key in rev_enc)) {
            key += encoded[pos];
            pos++;
        }
        decoded += rev_enc[key];
    }
    return decoded;
}

document.getElementById('input').addEventListener('input', function(e) {
    const inputString = e.target.value;
    if(!inputString) {
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

 
