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
        this.rowAmount = 1;
        this.squareAmount = 5;
    }

    initialize() {
        this.appendCheckerToContainer(this.generateCheckElement())
        this.generateMoreSquares()
    }

    generateCheckElement() {
        let checker = document.createElement('div')
        checker.classList.add('checker')
        checker.addEventListener('click', this.generateMoreSquares.bind(this))
        return checker
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
            if(this.setImageLimit() - this.countSquares() > 5) {
                this.gS.generateAll(this.rowAmount, this.squareAmount)
            } else {
                this.squareAmount = this.setImageLimit() - this.countSquares()
                this.gS.generateAll(this.rowAmount, this.squareAmount)
            }
        }
        this.iC.initialize(this.countSquares())
    }

    appendCheckerToContainer(checker) {
        this.container.appendChild(checker)
    }

    setImageLimit() {
        return 18;
    }

}

class ImageCollection {

    constructor() {
        this.currentAmountOfImages = 0
    }

    initialize(imageAddAmount) {
        for(let iIx = this.currentAmountOfImages; iIx < imageAddAmount; iIx++) {
            this.getImages(iIx)
        }
        this.currentAmountOfImages = imageAddAmount
    }

    getImages(squareIndex) {
        let squareImage = document.querySelectorAll('.square')[squareIndex]

        fetch('https://unsplash.it/500/500/?random')
            .then(response => response.blob())
            .then(blobOfInformation => URL.createObjectURL(blobOfInformation))
            .then(finalResponse => squareImage.style.backgroundImage = 'url(' + finalResponse + ')')
            .catch(error => console.log(error))
    }

}

const sC = new ScrollChecker()
sC.initialize()
