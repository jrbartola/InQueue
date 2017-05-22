/**
 * Generate.js
 * 
 * Functions used for generating hashes and string randomization
 */

// Generates random 6-character session string
var generateSessionCode = function() {
    var text = "";
    var bank = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for(var i = 0; i < 6; i++)
        text += bank.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.generateSessionCode = generateSessionCode;