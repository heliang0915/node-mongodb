/**
 * Created by helia on 2016/3/6.
 */
exports.md5 = function md5(data) {
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(data);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    return crypto.createHash("md5").update(str).digest("hex");
}