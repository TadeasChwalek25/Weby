function clearScreen() {
    document.getElementById('screen').innerText = '';
}

function deleteLast() {
    let screen = document.getElementById('screen');
    screen.innerText = screen.innerText.slice(0, -1);
}

function appendCharacter(character) {
    let screen = document.getElementById('screen');
    screen.innerText += character;
}

function calculateResult() {
    let screen = document.getElementById('screen');
    try {
        screen.innerText = eval(screen.innerText);
    } catch (e) {
        screen.innerText = 'Error';
    }
}