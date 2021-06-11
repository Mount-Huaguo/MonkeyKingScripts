// @start
// @namespace com.github.mounthuaguo.mongkeyking.js
// @version 0.1
// @name Base64 Decode and Encode
// @type action
// @action Base64 Encode
// @action Base64 Decode
// @end 


(function () {
    var Base64 = Java.type('java.util.Base64')
    var String = Java.type('java.lang.String')

    var input = event.selectionModel().selectedText()
    if (!input) {
        var str = event.document().scanString()
        if (str.start != -1) {
            input = str.value
        }
    }
    if (!input) {
        toast.warn('Please select some text!')
        return
    }

    if (menu === 'Base64 Encode') {
        var decode = Base64.getEncoder().encodeToString(input.getBytes())
        print('Base64.encode(' + input + '): ')
        print(decode)
        print('')
        return
    }

    if (menu === 'Base64 Decode') {
        var decode = new String(Base64.getDecoder().decode(input))
        print('Base64.decode(' + input + '): ')
        print(decode)
        print('')
        return
    }
})()