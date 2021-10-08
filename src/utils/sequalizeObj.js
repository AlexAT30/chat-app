const sequalizeObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = sequalizeObj;