'use strict'


class GenerateSquare {

    constructor() {
        this.container = document.querySelector('.container')
    }

    appendRowToContainer(row) {
        this.container.appendChild(row)
    }

    appendSquareToRow(row, square) {
        row.appendChild(square)
    }

    create(element) {
        return document.createElement(element)
    }

    generateSquare() {
        let square = this.create('div')
        square.classList.add('square')
        return square
    }

    generateRow() {
        let row = this.create('div')
        row.classList.add('row')
        return row
    }

    generateAll(rows, squares) {
        for(let i = 0; i < rows; i++) {
            let row = this.generateRow()
            for(let j = 0; j < squares; j++) {
                let square = this.generateSquare()
                this.appendSquareToRow(row, square)
            }
            this.appendRowToContainer(row)
        }
    }
}

class ScrollChecker {

    constructor() {
        this.container = document.querySelector('.container')
        this.gS = new GenerateSquare()
        this.iC = new ImageCollection()
        this.rowAmount = 1
        this.squareAmount = 3
        this.pre = 2
    }

    initialize(squaresPerRow) {
        this.squareAmount = squaresPerRow

        this.initializeListener()
        for(let i = 0; i < this.pre; i++) {
            this.generateMoreSquares()
        }
    }

    initializeListener() {
        this.container.addEventListener('scroll', this.generateMoreSquares.bind(this))
    }

    countSquares() {
        let count = 0;
        for(let i = 0; i < this.container.children.length; i++) {
            count += this.container.children[i].children.length
        }
        return count;
    }

    generateMoreSquares() {
        if(this.countSquares() < this.setImageLimit()) {
            if(this.setImageLimit() - this.countSquares() > 3) {
                if(this.getPositionBottomSquare() < this.getBottomPosition()) {
                    this.gS.generateAll(this.rowAmount, this.squareAmount)
                }
            } else {
                this.squareAmount = this.setImageLimit() - this.countSquares()
                this.gS.generateAll(this.rowAmount, this.squareAmount)
            }
        }
        this.iC.initialize(this.countSquares())
    }

    getPositionBottomSquare() {
        let squares = document.querySelectorAll('.square')
        if(this.countSquares() > 0) {
            return squares[squares.length - 1].offsetTop + squares[squares.length - 1].clientHeight - 200
        } else {
            return 0
        }
    }

    getBottomPosition() {
        return this.container.scrollTop + screen.height
    }

    setImageLimit() {
        return 50;
    }

}

class ImageCollection {

    constructor() {
        this.currentAmountOfImages = 0
    }

    initialize(imageAddAmount) {
        for(let sIx = this.currentAmountOfImages; sIx < imageAddAmount; sIx++) {
            this.getImages(sIx)
        }
        this.currentAmountOfImages = imageAddAmount
    }

    getImages(squareIndex) {
        let squareImage = document.querySelectorAll('.square')[squareIndex]

        fetch('https://unsplash.it/450/450/?random')
            .then(response => response.blob())
            .then(blobOfInformation => URL.createObjectURL(blobOfInformation))
            .then(imageURL => {
                squareImage.style.backgroundImage = 'url(' + imageURL + ')'
                squareImage.classList.add('display')
            })
            .catch(error => console.log(error))
    }

}

class Initializer {

    constructor(squaresPerRow) {
        const sC = new ScrollChecker()
        sC.initialize(squaresPerRow)
    }

}

const init = new Initializer(5)
