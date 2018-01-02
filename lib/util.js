var crypto = require('crypto');
var xml2js = require('xml2js');

exports.decrypt = function(encryptedData, key, iv = '') => {
  var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
      decipher.setAutoPadding(true);
  var decoded = decipher.update(encryptedData, 'base64', 'utf8');
      decoded += decipher.final('utf8');
  return decoded;
}

exports.md5 = function (str, encoding = 'utf8') {
  return crypto.createHash('md5').update(str, encoding).digest('hex');
}

exports.formatToWechatTime = function() {
  var str = new Date();
  var YYYY = str.getFullYear();
  var MM = ('0' + (str.getMonth() + 1)).substr(-2);
  var DD = ('0' + str.getDate()).substr(-2);
  return YYYY + MM + DD;
}

exports.toQueryString = function(obj) {
  return Object.keys(obj).filter(function (key) {
    return key !== 'sign' && obj[key] !== undefined && obj[key] !== '';
  }).sort().map(function (key) {
    return key + '=' + obj[key];
  }).join('&');
};

exports.generate = function(length = 16) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var noceStr = '', maxPos = chars.length;
  while (length--) noceStr += chars[Math.random() * maxPos |0];
  return noceStr;
};

exports.buildXML = function(obj, rootName = 'xml') {
  var opt = {rootName, allowSurrogateChars: true, cdata: true};
  return new xml2js.Builder(opt).buildObject(obj);
};

exports.parseXML = function(xml, callback) {
  var opt = {trim: true, explicitArray: false, explicitRoot: false};
  xml2js.parseString(xml, opt, function(err, res) {
    err ? callback(err) : callback(null, res || {});
  });
};
