import React from "react";
import ReactDom from "react-dom";
import "./index.css";

const Square = (props) => {
    // controlled components
    return (
        <button
            className="square"
            onClick={() => {
                props.onClick();
            }}
        >
            {props.value}
        </button>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
};

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            XisNext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
        // https://www.notion.so/Why-Immutability-is-important-542e3dca878b409dab0af5a9ec09ff6b

        if (calculateWinner(squares)) {
            return;
        }

        squares[i] = this.state.XisNext === true ? "X" : "O";
        this.setState({
            history: history.concat([{ squares }]),
            // concat does not mutate the original object
            XisNext: !this.state.XisNext,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = "Winner : " + winner;
        } else {
            status = "Next Player : " + (this.state.XisNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => this.handleClick(i)}
                        squares={current.squares}
                    ></Board>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <div>{/* TODO */}</div>
                </div>
            </div>
        );
    }
}

ReactDom.render(<Game></Game>, document.getElementById("root"));
