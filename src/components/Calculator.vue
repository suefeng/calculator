<template>
    <form method="get" action="" @keydown="keyEvent" tabindex="-1">
      <div class="calculator">
      <div class="display" @click="copy" data-shortcut="click to copy">
        <span class="copied" v-show="copied">Copied!</span>
        <input class="input" name="calculate" v-model="number" type="text" disabled="true" autocomplete="off" />
      </div>
      <div>
        <button class="big other" id="h" @click="getHistory" data-shortcut="h" aria-expanded="false" aria-haspopup="true">History</button>
        <button class="other" id="help" @click="help" data-shortcut="q">?</button>
        <button class="other" id="back" @click="back" data-shortcut="backspace | delete">←</button>
      </div>
      <div>
        <button class="memory" id="mAdd" @click="mAdd" data-shortcut="ma">m+</button>
        <button class="memory" id="mSubtract" @click="mSubtract" data-shortcut="ms">m-</button>
        <button class="operation" id="plusMinus" @click="plusMinus" data-shortcut="pm">±</button>
        <button class="operation" id="divide" @click="clickedNumber('/')" data-shortcut="/">÷</button>
      </div>
      <div>
        <button class="memory" id="mClear" @click="mClear" data-shortcut="mc">mc</button>
        <button class="memory" id="mRecall" @click="mRecall" data-shortcut="mr">mr</button>
        <button class="operation" id="clear" @click="clickedClear" data-shortcut="c">c</button>
        <button class="operation" id="multiply" @click="clickedNumber('*')" data-shortcut="* | x">×</button>
      </div>
      <div>
        <button class="number" id="n7" @click="clickedNumber(7)">7</button>
        <button class="number" id="n8" @click="clickedNumber(8)">8</button>
        <button class="number" id="n9" @click="clickedNumber(9)">9</button>
        <button class="operation" id="subtract" @click="clickedNumber('-')" data-shortcut="-">–</button>
      </div>
      <div>
        <button class="number" id="n4" @click="clickedNumber(4)">4</button>
        <button class="number" id="n5" @click="clickedNumber(5)">5</button>
        <button class="number" id="n6" @click="clickedNumber(6)">6</button>
        <button class="operation" id="add" @click="clickedNumber('+')" data-shortcut="shift +">+</button>
      </div>
      <div>
        <button class="number" id="n1" @click="clickedNumber(1)">1</button>
        <button class="number" id="n2" @click="clickedNumber(2)">2</button>
        <button class="number" id="n3" @click="clickedNumber(3)">3</button>
        <button class="equal" id="equal" @click="clickedSubmit" data-shortcut="= | enter">=</button>
      </div>
      <div>
        <button class="number zero" id="n0" @click="clickedNumber(0)">0</button>
        <button class="number" id="decimal" @click="clickedNumber('.')">.</button>
      </div>
      </div>
      <div class="history-container hide">
        <div id="history" class="history"><table v-html="history" @click="copyPaste"></table></div>
        <button class="close-button" @click="closeHistory" data-shortcut="esc">×</button>
        <button class="clear-button" @click="clearHistory" data-shortcut="d">Clear history</button>
      </div>
    </form>
</template>
<script>
export default {
  name: "Calculator",
  data() {
    return {
      number: "",
      history: "",
      map: {},
      timerId: null,
      copied: false
    };
  },
  methods: {
    keyEvent: function(event) {
      this.removeKeydownClass();
      let allowedValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*", "."];
      let currChar = event.key.replace(/x/, '*');
      this.map[event.key] = true;
      let keySelected = event.key.replace(/\*/, '×').replace(/x/, '×').replace('/', '÷').replace('-', '–');
      if (allowedValues.indexOf(currChar) > -1) {
        if(event.key == '/') {
          event.preventDefault();
        }
        this.number = this.verification(this.number, currChar);
        this.animateButtonPress(keySelected);
      } else if (this.map['d']) {
        this.clearHistory();
        this.addKeydownClass('.clear-button');
      } else if (this.map['m'] && this.map['a']) {
        this.mAdd();
        this.addKeydownClass('#mAdd');
      } else if (this.map['m'] && this.map['s']) {
        this.mSubtract();
        this.addKeydownClass('#mSubtract');
      } else if (this.map['m'] && this.map['c']) {
        this.mClear();
        this.addKeydownClass('#mClear');
      } else if (this.map['m'] && this.map['r']) {
        this.mRecall();
        this.addKeydownClass('#mRecall');
      } else if (this.map['p'] && this.map['m']) {
        this.plusMinus();
        this.addKeydownClass('#plusMinus');
      } else if (currChar == '=' || event.key == 'Enter') {
        this.addKeydownClass('.equal');
      } else if(event.key == 'Backspace') {
        event.preventDefault();
        this.back();
        this.addKeydownClass('#back');
      } else if (currChar == 'c') {
        this.clickedClear();
        this.addKeydownClass('#clear');
      } else if (currChar == 'q') {
        this.help();
      } else if (currChar == 'h') {
        this.getHistory();
        this.addKeydownClass('#h');
      } else if (event.key == 'Escape') {
        this.closeHistory();
        this.addKeydownClass('.close-button');
      } else if ((this.map['Control'] && this.map['v']) || (this.map['Meta'] && this.map['v'])) {
        document.querySelector('.input').disabled = false;
        document.querySelector('.input').focus();
        setTimeout(function(){
          let pasteValue = document.querySelector('.input').value.split("");
          function arrayContainsArray (superset, subset) {
            return subset.every(function (value) {
              return (superset.indexOf(value) >= 0);
            });
          }
          if(!arrayContainsArray(allowedValues, pasteValue)) {
            document.querySelector('.input').value = "";
          }
          document.querySelector('.input').disabled = true;
          document.querySelector('form').focus();
        }, 500);
        this.number = document.querySelector('.input').value;
      }
    },
    clickedNumber: function(num) {
      let currChar = num;
      this.number = this.verification(this.number, currChar);
      return num;
    },
    clickedClear: function(num = this.number) {
      this.number = '';
      return this.number;
    },
    clickedSubmit: function(event, num = "") {
      let solve = num;
      if(num == "") {
        solve = this.number;
      }
      if(solve !== "") {
        num = eval(solve).toString();
        this.number = num;
        this.appendToStorage('history', `<tr><td><span class="count" title="delete"></span></td><td><button class="copyPaste">${solve}</button></td><td>=</td><td><button class="copyPaste">${num}</button></td></tr>`);
        return num;
      }
    },
    mAdd: function(event, num = "") {
      if(num == "") {
        num = this.number;
      }
      localStorage.setItem('calculatorValue', num);
    },
    mSubtract: function() {
      localStorage.removeItem('calculatorValue');
    },
    mClear: function() {
      localStorage.clear();
    },
    mRecall: function(event, num = "") {
      let recall = localStorage.getItem('calculatorValue');
      if(recall) {
        num = this.number + recall;
      } else {
        num = "";
      }
      this.number = num;
      return num;
    },
    back: function(num = "") {
      this.number = this.number.toString().slice(0, -1);
      num = num.toString().slice(0, -1);
      return num;
    },
    plusMinus: function(num = "") {
      this.number = 0 - this.number;
      return 0 - num;
    },
    verification: function(number, currChar) {
      let operations = ["+", "-", "/", "*"];
      if(number.length > 0) {
        let prevChar = number.charAt(number.length - 1);
        if (operations.indexOf(prevChar) > -1 && operations.indexOf(currChar) > -1) {
          number = number.slice(0, -1);
          number += currChar;
        } else if ( (prevChar == 0 && currChar == 0 ) ||
                    (prevChar == '.' && currChar == '.' )) {
          number = number;
        } else if (number.indexOf('.') > -1 && currChar == '.') {
          number = number;
        } else {
          number += currChar;
        }
      } else if(operations.indexOf(currChar) > -1) {
        number == '';
      } else {
        number += currChar;
      } 
      return number;
    },
    appendToStorage: function(name, data){
      let existing = localStorage.getItem('history');
      existing = existing ? existing.split(',') : [];
      existing.push(data);
      localStorage.setItem('history', existing.join("").trim());
    },
    getHistory: function(ui = true) {
      this.history = localStorage.getItem('history');
      if(ui) {
        document.querySelector('.history-container').classList.remove('hide');
      }
    },
    clearHistory: function() {
      localStorage.clear();
      this.history = localStorage.getItem('history');
    },
    // UI related
    closeHistory: function() {
      document.querySelector('.history-container').classList.add('hide');
    },
    copy: function(item) {
      if(this.number) {
        let input = document.querySelector('.input');
        input.disabled = false;
        input.select();
        input.setSelectionRange(0, 99999);
        document.execCommand("copy");
        input.disabled = true;
        this.copied = true;
        this.timerId = setTimeout(() => {
          this.copied = false;
        }, 2000);
        document.querySelector('form').focus();
      }
    },
    copyPaste: function(item) {
      if (item.target.matches('.copyPaste')) {
        this.number = item.target.innerText;
        this.closeHistory();
      } else if (item.target.matches('.count')) {
        item.target.closest('tr').remove();
        localStorage.setItem('history', document.querySelector('.history tbody').innerHTML);
      }
    },
    help: function() {
      document.getElementById('help').classList.toggle('keydown');
      let buttons = document.querySelectorAll('button');
      Array.prototype.forEach.call(buttons, function(el, i){
        el.classList.toggle('shortcuts');
      });
      document.querySelector('form').focus();
      document.querySelector('.display').classList.toggle('shortcuts');
    },
    removeKeydownClass: function() {
      let buttons = document.querySelectorAll('button');
      Array.prototype.forEach.call(buttons, function(el, i){
        el.classList.remove('keydown');
      });
    },
    addKeydownClass: function(className) {
      this.map = {};
      document.querySelector(className).focus();
      document.querySelector(className).classList.add('keydown');
        setTimeout(() => {
        document.querySelector(className).classList.remove('keydown')
      }, 500);
    },
    animateButtonPress: function(keySelected) {        
      this.map = {};
      let buttons = document.querySelectorAll('button');
      Array.prototype.forEach.call(buttons, function(el, i){
        if(el.innerText == keySelected) {
          el.classList.add('keydown');
          el.focus();
              setTimeout(() => {
            el.classList.remove('keydown')
          }, 500)
        } 
      });
    }
  }
};
</script>