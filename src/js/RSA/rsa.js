// @start
// @namespace com.github.mounthuaguo.mongkeyking
// @version 0.1
// @name RSA Decrypt And Decrypt Demo
// @type action
// @action RSA Encrypt
// @action RSA Decrypt
// @end 


(function () {

    var input = event.selectionModel().selectedText()
    if (!input) {
        toast.warn('Please select some text!')
        return
    }

    var _privateKey = '-----BEGIN PRIVATE KEY-----\n' +
        'the private key entry\n' +
        '-----END PRIVATE KEY-----'
    var _publickKey = '-----BEGIN PUBLIC KEY-----\n' +
        'the key entry\n' +
        '-----END PUBLIC KEY-----\n'

    var Files = Java.type('java.nio.file.Files')
    var Paths = Java.type('java.nio.file.Paths')
    var String = Java.type('java.lang.String')
    var X509EncodedKeySpec = Java.type('java.security.spec.X509EncodedKeySpec')
    var PKCS8EncodedKeySpec = Java.type('java.security.spec.PKCS8EncodedKeySpec')
    var KeyFactory = Java.type('java.security.KeyFactory')
    var Base64 = Java.type('java.util.Base64')
    var System = Java.type('java.lang.System')
    var Cipher = Java.type('javax.crypto.Cipher')
    var Arrays = Java.type('java.util.Arrays')

    function readFile(pth) {
        return new String(Files.readAllBytes(Paths.get(pth)))
    }

    function encrypt(key, text) {
        var publicKeyPEM = key
            .replace("-----BEGIN PUBLIC KEY-----", "")
            .replaceAll(System.lineSeparator(), "")
            .replace("-----END PUBLIC KEY-----", "");

        var encoded = Base64.getDecoder().decode(publicKeyPEM);
        var x509KeySpec = new X509EncodedKeySpec(encoded);
        var keyFactory = KeyFactory.getInstance('RSA');
        var public = keyFactory.generatePublic(x509KeySpec);
        var cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(1, public);
        var bytes = new String(text).getBytes('UTF-8')
        var partLen = public.getModulus().bitLength() / 8 - 11
        var start = 0
        var r = []
        while (bytes.length > start) {
            var end = start + partLen
            if (bytes.length < end) {
                end = bytes.length
            }
            var part = Arrays.copyOfRange(bytes, start, end)
            start = start + partLen
            r = r.concat(cipher.doFinal(part))
        }
        return Base64.getEncoder().encodeToString(r)
    }

    function decrypt(key, text) {
        var privateKeyPEM = key
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replaceAll(System.lineSeparator(), "")
            .replace("-----END PRIVATE KEY-----", "");
        var encoded = Base64.getDecoder().decode(privateKeyPEM);
        var pkcs8KeySpec = new PKCS8EncodedKeySpec(encoded);
        var keyFactory = KeyFactory.getInstance('RSA');
        var privateK = keyFactory.generatePrivate(pkcs8KeySpec);
        var cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(2, privateK);
        var bytes = Base64.getDecoder().decode(text)
        var partLen = privateK.getModulus().bitLength() / 8
        var start = 0
        var arr = []
        while (bytes.length > start) {
            var end = start + partLen
            if (bytes.length < end) {
                end = bytes.length
            }
            var part = Arrays.copyOfRange(bytes, start, end)
            start = start + partLen
            arr = arr.concat(cipher.doFinal(part))
        }
        return new String(Base64.getDecoder().decode(Base64.getEncoder().encodeToString(arr)))
    }

    if (menu === 'RSA Encrypt') {
        print(encrypt(_publickKey, input))
        return
    }

    if (menu === 'RSA Decrypt') {
        print(decrypt(_privateKey, input))
        return
    }

})()


