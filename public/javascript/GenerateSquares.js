'use strict'

class SquareGenerator {

  constructor () {
    this.container = document.querySelector('.container')
    this.existingSquares = []
  }

  insertSquareIntoArray (square) {
    this.existingSquares.push(square)
  }

  generateSquare () {
    let square = document.createElement('div')
    square.classList.add('square')
    return square
  }

  appendSquares () {
    for (let square of this.existingSquares) {
      this.container.appendChild(square)
    }
  }

  insertMultipleSquares (amount) {
    for (let i = 0; i < amount; i++) {
      this.insertSquareIntoArray(this.generateSquare())
    }
  }

}

let sg = new SquareGenerator()
sg.insertMultipleSquares(10)
sg.appendSquares()
