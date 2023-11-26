let length = 8;
let bigCharacters = true;
let numberCharacters = true;
let specialCharacters = false;


function setPasswordLength(passwordLength) {
    if (passwordLength < 4) {
        console.log("Пароль не может быть меньше 4 символов");
        return;
    }
    length = passwordLength;
}

function withBigCharacters() {
    bigCharacters = true;
}

function withoutBigCharacters() {
    bigCharacters = false;
}

function withNumberCharacters() {
    numberCharacters = true;
}

function withoutNumberCharacters() {
    numberCharacters = false;
}

function withSpecialCharacters() {
    specialCharacters = true;
}

function withoutSpecialCharacters() {
    specialCharacters = false;
}


function generatePassword() {
    const bigSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberSet = '0123456789';
    const specialSet = '!@#$%^&*(){}[]?<>';

    const charsetArray = ['abcdefghijklmnopqrstuvwxyz'];
    if (bigCharacters) charsetArray.push(bigSet);
    if (numberCharacters) charsetArray.push(numberSet);
    if (specialCharacters) charsetArray.push(specialSet);

    let result = '';
    let currentTypeCharacter = 0;
    for (let i = 0; i < length; i++) {
        if ((currentTypeCharacter === charsetArray.length)) {
            currentTypeCharacter = 0;
        }
        result += charsetArray[currentTypeCharacter]
                  .charAt(Math.floor(Math.random() * charsetArray[currentTypeCharacter].length));
        currentTypeCharacter++;
    }
    return [...result].sort(() => Math.random() - 0.5).join('');
}

module.exports = {
  setPasswordLength,
  withBigCharacters,
  withoutBigCharacters,
  withNumberCharacters,
  withoutNumberCharacters,
  withSpecialCharacters,
  withoutSpecialCharacters,
  generatePassword,
};