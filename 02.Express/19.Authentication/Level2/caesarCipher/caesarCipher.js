// Function to encrypt the message using Caesar Cipher
function caesarCipherEncrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            // Determine if the letter is uppercase or lowercase
            let code = char.charCodeAt(0);
            let base = (char === char.toLowerCase()) ? 97 : 65;  // ASCII values for 'a' and 'A'
            let newChar = String.fromCharCode((code - base + shift) % 26 + base);
            result += newChar;
        } else {
            result += char; // Keep non-alphabet characters unchanged
        }
    }
    return result;
}

// Function to decrypt the message using Caesar Cipher
function caesarCipherDecrypt(text, shift) {
    return caesarCipherEncrypt(text, 26 - shift);  // Decrypt by shifting in the opposite direction
}

// Example usage:
const plaintext = "HELLO World!";
const shift = 3;

const encrypted = caesarCipherEncrypt(plaintext, shift);
console.log("Encrypted:", encrypted); // KHOOR Zruog!

const decrypted = caesarCipherDecrypt(encrypted, shift);
console.log("Decrypted:", decrypted); // HELLO World!
