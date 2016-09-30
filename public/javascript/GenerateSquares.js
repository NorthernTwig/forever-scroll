'use strict'

// Github: https://github.com/NorthernTwig/forever-scroll

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

    constructor(link) {
        this.container = document.querySelector('.container')
        this.gS = new GenerateSquare()
        this.iC = new ImageCollection(link)
        this.rowAmount = 1
        this.squareAmount = 3
        this.pre = 3
        this.imageAmountLimit = 25
    }

    initialize(squaresPerRow, imageAmountLimit) {
        this.squareAmount = squaresPerRow
        this.imageAmountLimit = imageAmountLimit

        this.initializeListener()
        for(let i = 0; i < this.pre; i++) {
            this.generateMoreSquares()
        }
    }

    initializeListener() {
        this.container.addEventListener('scroll', this.generateMoreSquares.bind(this))
    }

    countSquares() {
        let count = 0
        for(let i = 0; i < this.container.children.length; i++) {
            count += this.container.children[i].children.length
        }
        return count
    }

    generateMoreSquares() {
        if(this.countSquares() < this.setImageLimit()) {
            if(this.setImageLimit() - this.countSquares() > this.squareAmount) {
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
        return this.imageAmountLimit
    }

}

class ImageCollection {

    constructor(link) {
        this.link = link
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

        // Adjust for your needs.
        fetch(this.link)
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

    constructor(squaresPerRow, imageAmountLimit, link) {
        const sC = new ScrollChecker(link)
        sC.initialize(squaresPerRow, imageAmountLimit)
    }

}

/**
 * Initializes the Forever Scroll
 * @constructor
 * @param {int} - Squares per row.
 * @param {int}  - The amount of images that should be loaded.
 * @param {string}  - Where to get the images (Only fetches one).
 */
const init = new Initializer(5, 2000, 'https://unsplash.it/450/450/?random')
