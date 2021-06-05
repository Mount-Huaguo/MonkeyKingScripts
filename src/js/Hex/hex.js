// @start
// @namespace com.github.mounthuaguo.mongkeyking
// @version 0.1
// @name Hexadecimal encode and decode
// @type action
// @action Decimal To Hexadecimal
// @action Hexadecimal To Decimal
// @action Encode String To Hexadecimal
// @action Decode Hexadecimal To String
// @end 


(function(){
    var Integer = Java.type('java.lang.Integer')
    var String = Java.type('java.lang.String')
    var Hex = Java.type('org.apache.commons.codec.binary.Hex')

    var input = event.selectionModel().selectedText()
    if (!input) {
        toast.warn('Select text is needed.')
        return 
    }
    var start = event.selectionModel().selectionStart()
    var end = event.selectionModel().selectionEnd()

    if (menu === 'Decimal To Hexadecimal') {
        var n = Integer.parseInt(input)
        event.document().replaceString(start, end, Integer.toHexString(n))
    }

    if (menu === 'Hexadecimal To Decimal') {
        var n = Integer.parseInt(input, 16)
        event.document().replaceString(start, end, Integer.toString())
    }

    if (menu === 'Encode String To Hexadecimal') {
        var s = new String(input)
        var hexStr = Hex.encodeHexString(s.getBytes())
        event.document().replaceString(start, end, hexStr)
    }

    if (menu === 'Decode Hexadecimal To String') {
        var hexStr = new String(input)
        var s = Hex.decodeHex(s).toString()
        event.document().replaceString(start, end, s)
    }

})()