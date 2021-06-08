// @start
// @namespace com.github.mounthuaguo.mongkeyking
// @version 0.1
// @name SHA
// @type action
// @action Encode to SHA1 Hex
// @action Encode to SHA1 Base64
// @action Encode to SHA224 Hex
// @action Encode to SHA224 Base64
// @action Encode to SHA256 Hex
// @action Encode to SHA256 Base64
// @action Encode to SHA384 Hex
// @action Encode to SHA384 Base64
// @action Encode to SHA512 Hex
// @action Encode to SHA512 Base64
// @end 

(function () {

    var text = event.selectionModel().selectedText()
    if (!text) {
        toast.warn('Please select some text!')
        return
    }

    var MessageDigest = Java.type('java.security.MessageDigest')
    var String = Java.type('java.lang.String')

    var bytes = new String(text).getBytes('UTF-8')
    
    var m = [{
        menu: 'Encode to SHA1 Hex',
        encode: 'hex',
        digest: 'SHA1',
    }, {
        menu: 'Encode to SHA1 Base64',
        encode: 'base64',
        digest: 'SHA1',
    }, {
        menu: 'Encode to SHA224 Hex',
        encode: 'hex',
        digest: 'SHA-224',
    }, {
        menu: 'Encode to SHA224 Base64',
        encode: 'base64',
        digest: 'SHA-224',
    }, {
        menu: 'Encode to SHA256 Hex',
        encode: 'hex',
        digest: 'SHA-256',
    }, {
        menu: 'Encode to SHA256 Base64',
        encode: 'base64',
        digest: 'SHA-256',
    }, {
        menu: 'Encode to SHA384 Hex',
        encode: 'hex',
        digest: 'SHA-384',
    }, {
        menu: 'Encode to SHA384 Base64',
        encode: 'base64',
        digest: 'SHA-384',
    }, {
        menu: 'Encode to SHA512 Hex',
        encode: 'hex',
        digest: 'SHA-512',
    }, {
        menu: 'Encode to SHA512 Base64',
        encode: 'base64',
        digest: 'SHA-512',
    }];

    for (var i in m) {
        var o = m[i]
        if (o.menu !== menu) {
            continue
        }
        var sha = MessageDigest.getInstance(o.digest)
        if (o.encode === 'hex') {
            var Integer = Java.type('java.lang.Integer')
            var StringBuffer = Java.type('java.lang.StringBuffer')
            var bytes = sha.digest(bytes)
            var buf = new StringBuffer()
            for (var b in bytes) {
                var hex = Integer.toHexString(0xFF & bytes[b]);
                if(hex.length() == 1) {
                    buf.append('0')
                }
                buf.append(hex)
            }
            print(buf.toString())
            return
        }
        if (o.encode === 'base64') {
            var Base64 = Java.type('java.util.Base64')
            var encoder = Base64.getEncoder()
            print(encoder.encodeToString(sha.digest(bytes)))
            return
        }
    }

})()
