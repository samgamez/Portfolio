function hashNewPassword() {
    let password = document.getElementById("password").value;
    let salt = generateSalt();
    let hashedPassword = SHA256(password + salt);
    document.getElementById("salt").value = salt;
    document.getElementById("hashedPassword").value = hashedPassword;

    // Debugging
    // console.log("Username: " + username);
    // console.log("Password: " + password);
    // console.log("Salt: " + salt);
    // console.log("Hashed Password: " + hashedPassword);
}

function generateSalt() {
    let allowedChars = "abcdefghijklmnopqrstuvwxyz" +
                       "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
                       "0123456789" + "!@#$%^&*";
    let salt = "";

    // Generate ten character, random salt string.
    for (let i = 0; i < 10; i++) {
        let randIndex = Math.floor(Math.random() * (allowedChars.length - 1));
        salt += allowedChars[randIndex];       
    }

    return salt;
}

function hashExistingPassword() {
    let password = document.getElementById("password").value;
    let salt = document.getElementById("salt").value;
    let hashedPassword = SHA256(password + salt);
    document.getElementById("hashedPassword").value = hashedPassword;
}