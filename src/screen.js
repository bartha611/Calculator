import React, { Component } from 'react';



class Screen extends Component {
  render() {
    return(
      <div className = 'screen'>
        <div className = 'formula'>
          {this.props.formula}
        </div>
        <div className = 'result' id = 'display'>
          {this.props.result}
        </div>
      </div>
    );
  }
}

export default Screen;