import React, { Component } from 'react';
import './App.css';
import Buttons from './buttonpanel.js'
import Screen from './screen.js'

const isNumber = /[0-9]/,
      isOperator = /[+-/*/]/,
      isDecimal = /\./;
      

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      currInput: '0',
      prevInput: ''
    }
    this.handleNumber = this.handleNumber.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEval = this.handleEval.bind(this);
  }
  handleNumber(e) {
    if(isNumber.test(this.state.prevInput) || (isDecimal.test(this.state.prevInput))) {
      this.setState({
        formula: this.state.formula + e.target.value,
        currInput: this.state.currInput + e.target.value,
        prevInput: e.target.value
      })} else if((!this.state.prevInput && e.target.value !== '0') || (isOperator.test(this.state.prevInput))) {
        this.setState({
          formula: this.state.formula + e.target.value,
          currInput: e.target.value,
          prevInput: e.target.value
        })
      } else if(this.state.prevInput === '=') {
        this.setState({
          formula: e.target.value,
          currInput: e.target.value,
          prevInput: e.target.value
        })
      }
    }
  handleDecimal(e) {
    if(!isDecimal.test(this.state.currInput)) {
      this.setState({
        formula: this.state.formula + e.target.value,
        currInput: this.state.currInput + e.target.value,
        prevInput: e.target.value
      })
    }
  }
  handleOperator(e) {
    if(isNumber.test(this.state.prevInput)) {
      this.setState({
        formula: this.state.formula + e.target.value,
        currInput: e.target.value,
        prevInput: e.target.value
      })
    }else if(isOperator.test(this.state.prevInput)) { 
      this.setState({
        formula: this.state.formula.slice(0, this.state.formula.length - 1) + e.target.value,
        currInput: e.target.value,
        prevInput: e.target.value
      })
    } else if(this.state.prevInput === '=') {
      this.setState({
        formula: this.state.currInput + e.target.value,
        currInput: e.target.value,
        prevInput: e.target.value
      })
    }
  }
  handleClear() {
    this.setState({
      formula: '',
      currInput: '0',
      prevInput: ''
    })
  }
  handleEval(e) {
    this.setState({
      currInput: eval(this.state.formula),
      formula: this.state.formula + e.target.value,
      prevInput: e.target.value
    })
  }
  render() {
    return (
      <div className = 'calculator'>
        <Screen formula = {this.state.formula} result = {this.state.currInput}/><br />
        <Buttons numbers = {this.handleNumber}
         decimal = {this.handleDecimal}
         operator = {this.handleOperator}
         clear = {this.handleClear}
         equals = {this.handleEval}/>
      </div>
    );
  }
}

export default Calculator;