var CryptoJS = require("../../node_modules/crypto-js/index");
const PASSWORD = "";

function enc(plainText) {
	var b64 = CryptoJS.AES.encrypt(plainText, PASSWORD).toString();
	var e64 = CryptoJS.enc.Base64.parse(b64);
	var eHex = e64.toString(CryptoJS.enc.Hex);
	return eHex;
}

function dec(cipherText) {
	var reb64 = CryptoJS.enc.Hex.parse(cipherText);
	var bytes = reb64.toString(CryptoJS.enc.Base64);
	var decrypt = CryptoJS.AES.decrypt(bytes, PASSWORD);
	var plain = decrypt.toString(CryptoJS.enc.Utf8);
	return plain;
}

export function encryptJson(text) {
	return enc(JSON.stringify(text));
}

export function decryptJson(text) {
	return JSON.parse(dec(text));
}

export function test(json) {
	let x = encryptJson(json);
	console.log("Encriptado");
	console.log(x);
	console.log("Desencriptado");
	console.log(decryptJson(x));
}
