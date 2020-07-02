import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return(
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNext: true
    }
  }

  handleClick(i) {
    let squares = this.state.squares.slice();
    squares[i] = this.state.isNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isNext: !this.state.isNext
    });
  }

  calculateWinner(squares) {
    let lines = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]
    for(let element of lines) {
      const [a,b,c] = element;
      if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]) {
        return squares[a];
      }
      else {
        return null;
      }
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }
  render() {
    let winner = this.calculateWinner(this.state.squares);
    let status = winner? `Winner is ${winner}`: `Next Player: ${this.state.isNext ? 'X':'O' }`;
    return (
      <div className="board">
        <div>{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return(
      <Board/>
    );
  }
}

ReactDOM.render(<Game/>, document.getElementById("root"));