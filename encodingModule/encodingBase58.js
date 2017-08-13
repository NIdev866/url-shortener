const base58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const baseLength = base58.length;

const encode = function(number){
  let encoded = '';
  while (number){
    const remainder = number % baseLength;
    number = Math.floor(number / baseLength);
    encoded = base58[remainder].toString() + encoded;
  }
  return encoded;
}
module.exports.encode = encode;

const decode = function(string){
  let decoded = 0;
  while (string){
    const index = base58.indexOf(string[0]);
    const power = string.length - 1;
    decoded += index * (Math.pow(baseLength, power));
    string = string.substring(1);
  }
  return decoded;
}
module.exports.decode = decode;
