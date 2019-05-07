const crypto = require('crypto');

module.exports={
  md5(buffer){
    let obj = crypto.createHash('md5');
    obj.updata(buffer);

    return obj.digest('hex');
  }
}