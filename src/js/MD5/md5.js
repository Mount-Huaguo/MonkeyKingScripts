// @start
// @namespace com.github.mounthuaguo.mongkeyking.js
// @version 0.1
// @name MD5
// @type action
// @action Encode to MD5 Hex
// @action Encode to MD5 Base64
// @end 

(function() {

    var text = event.selectionModel().selectedText()
    if (!text) {
        toast.warn('Please select some text!')
        return
    }

    var MessageDigest = Java.type('java.security.MessageDigest')
    var String = Java.type('java.lang.String')

    var bytes =  new String(text).getBytes('UTF-8')
    var md = MessageDigest.getInstance('MD5')

    if (menu === 'Encode to MD5 Hex') {
        var BigInteger = Java.type('java.math.BigInteger')
        var bigInteger = new BigInteger(1, md.digest(bytes))
        print(String.format('%032x', bigInteger))
        return 
    }

    if (menu === 'Encode to MD5 Base64') {
        var Base64 = Java.type('java.util.Base64')
        var encoder = Base64.getEncoder()
        print(encoder.encodeToString(md.digest(bytes)))
        return 
    }

})()
