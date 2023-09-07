const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let alive = true;

class Field {
    constructor(arr) {
        this._arr = arr;
    }

    get arr() {
        return this._arr;
    }

    static generateField(height, width, percentage) {
        // Height = how many arrays
        // Width = how many letters in each array
        // Percentage = max amount of holes = Math.floor(20% of the array)
        let generatedField = [];
        let hatFound = false;

        // Creates a new array for each number of height
        for (let i = 0; i < height; i++) {
            generatedField.push([]);
            let holeCount = 0;

            // In the newly created array, adding width
            for (let j = 0; j < width; j++) {
                // First time: add the player (star)
                // Hat isn't added until i is greater than half the height and greater than half the width
                // Find a way to not add the hat again once it's added
                let character = '';
                // Adds star to beginning of array
                if (i === 0 && j === 0) {
                    character = '*';
                    generatedField[i].push(character)
                // Adds field below and to the right of player
                } else if (i === 0 && j === 1 || i === 1 && j === 0) {
                    character = fieldCharacter;
                    generatedField[i].push(character);
                // If the field height is greater than half and width is greater than half
                } else if (i >= (Math.floor(height / 2)) && j >= (Math.floor(width / 2))) {
                    let randNum = Math.floor(Math.random() * 3);
                    // If num = 0 and there are less holes than percentage
                    if (randNum === 0 && holeCount <= (Math.floor(width * percentage))) {
                        character = hole;
                        generatedField[i].push(character);
                        holeCount ++;
                    // If num = 1 and hat isn't on the field yet
                    } else if (randNum === 1 && hatFound === false) {
                        character = hat;
                        generatedField[i].push(character);
                        hatFound = true;
                    } else {
                        character = fieldCharacter;
                        generatedField[i].push(character);
                    }
                // If field isn't halfway built yet
                } else {
                    let randNum = Math.floor(Math.random() * 2);
                    // If num = 0 and there are less holes than percentage
                    if (randNum === 0 && holeCount <= (Math.floor(width * percentage)) && generatedField[i][j - 1] != 'O' && generatedField[i][j + 1] != 'O' && generatedField[i][j - 2] != 'O' && generatedField[i][j + 2] != 'O' && generatedField[i][j - 3] != 'O' && generatedField[i][j + 3] != 'O') {
                        character = hole;
                        generatedField[i].push(character);
                        holeCount ++;
                    } else {
                        character = fieldCharacter;
                        generatedField[i].push(character);
                    }
                }
                // let randNum = Math.floor(Math.random() * 3);
            }
        };
        return generatedField;
    }

    print() {
        let gameField = '';
        let str = '';
        // Loops through each array in field
        this._arr.forEach(item => {
            for (let i = 0; i < item.length; i++) {
                // If new array is being looped through, reset str
                if (i === 0) {
                    str = '';
                    str += item[i];
                // If array is at last item, add a new line and add str to gameField
                } else if (i === item.length - 1) {
                    str += item[i];
                    str += '\n';
                    gameField += str;
                } else {
                    str += item[i]
                }
            }
        })
        return gameField;
    }
}

let game = new Field(Field.generateField(8, 20, .1))
let h = 0;
let w = 0;

function setCoordinates(item, h, w) {
    if (item._arr[h][w] === hole) {
        console.log('GAME OVER!')
        alive = false;
    } else if (item._arr[h][w] === hat) {
        console.log('YOU WIN!')
        alive = false;
    } else {
        item._arr[h][w] = '*';
        console.log(item.print());
    }
}

console.log(game.print());

function playGame() {
    while (alive) {
        let input = (prompt('Please enter input: ')).toLowerCase();

        if (input === 'x') {
            game = new Field(Field.generateField(8, 20, .1));
            h = 0;
            w = 0;
            console.log(game.print());
        } else if (input === 'q') {
            alive = false;
        } else if (input === 'd') {
            w += 1;
            if (w > (game._arr[0].length - 1)) {
                w -= 1;
                console.log("Out of bounds, please enter another input")
            }
            setCoordinates(game, h, w);
        } else if (input === 'a') {
            w -= 1;
            if (w < 0) {
                w += 1;
                console.log("Out of bounds, please enter another input")
            }
            setCoordinates(game, h, w);
        } else if (input === 'w') {
            h -= 1;
            if (h < 0) {
                h += 1;
                console.log("Out of bounds, please enter another input")
            }
            setCoordinates(game, h, w);
        } else if (input === 's') {
            h += 1;
            if (h > (game._arr.length - 1)) {
                h -= 1;
                console.log("Out of bounds, please enter another input")
            }
            setCoordinates(game, h, w);
        }
    }
}

playGame();
