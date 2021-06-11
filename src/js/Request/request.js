// @start
// @namespace com.github.mounthuaguo.mongkeyking.js
// @version 0.1
// @name Convert Request to cUrl command
// @type action
// @action Copy Request as cUrl command
// @action Show Request as cUrl command
// @end 


(function() {
    var input = event.selectionModel().selectedText()
    if (!input) {
        toast.warn('Please select a request')
        return
    }
    
    var lines = input.split('\n')
    var r = {
        method: '',
        url: '',
        headers: [],
        body: '',
    }
    var scanHeader = true
    for (i in lines) {
        var line = lines[i]
        if (!r.method) {
            line = line.trim()
            if (!line) {
                continue
            }
            var sep = line.split(' ')
            r.method = sep[0]
            r.url = sep[1]
            continue
        }
        scanHeader = scanHeader && (line.trim())
        if (scanHeader) {
                r.headers.push(line)
        } else {
            r.body = r.body + line + '\n'
        }
    }
    var command = 'curl -X ' + r.method
    if (r.headers) {
        command = command + ' --header \'' + r.headers.join('\' --header \'') + '\''
    }
    if (r.body) {
        command = command + ' -d \'' + r.body.trim('\n') + '\''
    }
    command = command + ' \'' + r.url + '\''

    if (menu === 'Copy Request as cUrl command') {
        clipboard.setContents(command)
        toast.info('Copied!')
        return
    } 
    if (menu === 'Show Request as cUrl command') {
        print(command)
        return
    }

})()

