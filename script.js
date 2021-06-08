screen.orientation.lock("portrait-primary");

let piecesArr = new Array(16);
let currentArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

let emptyIndex = 15;

let puzzleContainer = document.getElementsByClassName('sliding-container');
let startGameButton = document.getElementsByClassName('start-game');
startGameButton[0].addEventListener('click', () =>{
    createPuzzle();
});

(function () {
    for (let i = 0; i < 15; i++) {
        addPiece(i, 'piece');
    }
    let divText = document.createTextNode('');
    piecesArr[15] = document.createElement('div');
    piecesArr[15].className = 'empty';
    piecesArr[15].appendChild(divText);
    puzzleContainer[0].appendChild(piecesArr[15]);
})();

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function createPuzzle(){
    hideWinMessage();
    currentArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    for (let i = 0; i < 16; i++) {
        puzzleContainer[0].removeChild(piecesArr[i]);
    }
    shuffle(currentArr);
    currentArr.push('');

    for (let i = 0; i < 15; i++) {        
        addPiece(i, 'piece');
    }

    let divText = document.createTextNode('');
    piecesArr[15] = document.createElement('div');
    piecesArr[15].className = 'empty';
    piecesArr[15].appendChild(divText);
    puzzleContainer[0].appendChild(piecesArr[15]);
    emptyIndex = 15;
    piecesMover();
}

function addPiece(i, className){
    let divText = document.createTextNode(currentArr[i]);
    piecesArr[i] = document.createElement('div');
    piecesArr[i].className = className;
    piecesArr[i].appendChild(divText);
    puzzleContainer[0].appendChild(piecesArr[i]);
}

function mapPuzzle(){
    for (let i = 0; i < 16; i++) {
        puzzleContainer[0].removeChild(piecesArr[i]);
    }
    for (let i = 0; i < 16; i++) {
        if(currentArr[i] == ''){
            addPiece(i, 'empty');
        } else {
            addPiece(i, 'piece');
        }
    }
    piecesMover();
}

function piecesMover(){
    if(checkWin()){
        setTimeout(() =>{
            showWinMessage();
        }, 0);
    } else {
        for (let i = 0; i < 16; i++) {
            if(currentArr[i] == '') emptyIndex = i;
            piecesArr[i].addEventListener('click', () => {
                if(checkNextToEmpty(i)){
        
                    let cPiece = currentArr[i];
                    let cPos = i;
        
                    let nPos = emptyIndex;       
        
                    currentArr[cPos] = '';
                    currentArr[nPos] = cPiece;
                    emptyIndex = cPos;
                    mapPuzzle();
                }
            });
        }
    }
}

function checkNextToEmpty(index){
    switch(emptyIndex){
        case 0:
            if(index == 1 || index == 4) return true;
            break;
        case 1:
            if(index == 0 || index == 2 || index == 5) return true;
            break;
        case 2:
            if(index == 1 || index == 3 || index == 6) return true;
            break;
        case 3:
            if(index == 2 || index == 7) return true;
            break;
        case 4:
            if(index == 0 || index == 5 || index == 8) return true;
            break;
        case 5:
            if(index == 1 || index == 4 || index == 6 || index == 9) return true;
            break;
        case 6:
            if(index == 2 || index == 5 || index == 7 || index == 10) return true;
            break;
        case 7:
            if(index == 3 || index == 6 || index == 11) return true;
            break;
        case 8:
            if(index == 4 || index == 9 || index == 12) return true;
            break;
        case 9:
            if(index == 5 || index == 10 || index == 13 || index == 8) return true;
            break;
        case 10:
            if(index == 6 || index == 11 || index == 14 || index == 9) return true;
            break;
        case 11:
            if(index == 7 || index == 10 || index == 15) return true;
            break;
        case 12:
            if(index == 8 || index == 13) return true;
            break;
        case 13:
            if(index == 9 || index == 12 || index == 14) return true;
            break;
        case 14:
            if(index == 13 || index == 10 || index == 15) return true;
            break;
        case 15:
            if(index == 14 || index == 11) return true;
            break;
    }
}

function checkWin(){
    const orderedArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ''];
    for (let i = 0; i < orderedArray.length; i++) {
        if(orderedArray[i] != currentArr[i]) return false;
    }
    return true;
}

function showWinMessage(){
    let winMessage = document.getElementsByClassName('win-message');
    winMessage[0].style = 'display: flex';
}

function hideWinMessage(){
    let winMessage = document.getElementsByClassName('win-message');
    winMessage[0].style = 'display: none';
}