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
        for (let i = 0; i < this._arr.length; i++) {
            this._arr[i].push('\n')
        }
        let gameField = (this._arr.toString()).replaceAll(',', '');
        return gameField;
    }
}
  
const myField = new Field([
    ['*', '░', 'O', 'O', 'O'],
    ['░', 'O', '░', '░', '░'],
    ['░', '░', '░', 'O', '^'],
    ['O', '░', 'O', 'O', 'O'],
])

let game = new Field(Field.generateField(8, 20, .1))

function playGame() {
    while (alive) {
        console.log(game.print())
        let input = prompt('Please enter input: ');
        if (input === 'x') {
            game = new Field(Field.generateField(8, 20, .1))
            console.log(game.print())
        } else if (input === 'd') {
            alive = false;
        }
    }
}

playGame();
