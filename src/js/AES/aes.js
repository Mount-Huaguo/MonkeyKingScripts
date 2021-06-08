// @start
// @namespace com.github.mounthuaguo.mongkeyking
// @version 0.1
// @name AES Encrypt And Decrypt
// @type action
// @action AES Encrypt
// @action AES Decrypt
// @end 


(function () {

    // you should modify this key
    var encryptKey = '2bc73dw20ebf4d46'

    var Cipher = Java.type('javax.crypto.Cipher')
    var SecretKeySpec = Java.type('javax.crypto.spec.SecretKeySpec')
    var IvParameterSpec = Java.type('javax.crypto.spec.IvParameterSpec')
    var String = Java.type('java.lang.String')
    var Arrays = Java.type('java.util.Arrays')
    var Base64 = Java.type('java.util.Base64')

    var IV_PARAMETER_SPEC = new IvParameterSpec('0000000000000000'.getBytes())
    var encoder = Base64.getEncoder()
    var decoder = Base64.getDecoder()

    function encrypt(str) {
        var cipher = Cipher.getInstance('AES/CBC/PKCS5Padding')
        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(encryptKey.getBytes(), 'AES'), IV_PARAMETER_SPEC)
        var bytes = cipher.doFinal(Arrays.copyOf(str.getBytes(), 16 * ((str.getBytes().length / 16) + 1)))
        return encoder.encodeToString(bytes)
    }

    function decrypt(str) {
        var data = decoder.decode(new String(str).trim())
        var cipher = Cipher.getInstance('AES/CBC/PKCS5Padding')
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(encryptKey.getBytes(), 'AES'), IV_PARAMETER_SPEC)
        var bytes = cipher.doFinal(data)
        for (var i in bytes){
            if (bytes[i] === 0) {
                break
            }
        }
        return new String( Arrays.copyOfRange(bytes, 0, i), 'utf-8')
    }

    if (menu === 'AES Encrypt') {
        var input = event.selectionModel().selectedText()
        if (!input) {
            toast.warn('Please select some text!')
            return
        }
        print(encrypt(input))
        return
    } 

    if (menu === 'AES Decrypt') {
        var input = event.selectionModel().selectedText()
        if (!input) {
            toast.warn('Please select some text!')
            return
        }
        print(decrypt(input))
    } 
})()