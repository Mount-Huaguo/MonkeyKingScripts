// @start
// @namespace               com.github.mounthuaguo.mongkeyking.js
// @version                 0.1
// @name                    Mysql And Go Struct Transform
// @type                    action
// @action                  Mysql 2 Go Struct
// @action.notImplement     Go Struct 2 Mysql
// @end 

(function () {
    
    var conf = {
        orm: 'gorm', // support gorm and sqlx
        json: true, // auto generate json tag, this option is conflict with jsonWithOmit
        jsonWithOmit: false, // auto generate json omitempty tag，this option is conflict with json
        comment: true, // auto generate comment
    }

    var stmt = event.selectionModel().selectedText()
    if (!stmt) {
        toast.warn('Please select some text!')
        return
    }

    var parse = function (input) {
        var count = 0
        var quota = ''
        var parentheses = false // '('
        var lines = []
        var line = ''
        for (var i in input) {
            var char = input[i]
            if (char == '\'' && !quota) {
                quota = '\''
                line = line + char
                continue
            }
            if (char == '"' && !quota) {
                quota = '"'
                line = line + char
                continue
            }
            if (char == '`' && !quota) {
                quota = '`'
                line = line + char
                continue
            }
            if (char == quota) { // todo 转义
                quota = ''
                line = line + char
                continue
            }
            if (char == '(' && !quota) {
                count = count + 1
                if (!parentheses) {
                    parentheses = true
                    line = ''
                    continue
                }
            }
            if (char == ')' && !quota) {
                count = count - 1
                if (count == 0 && parentheses) {
                    lines.push(line)
                    break;
                }
            }
            if (!parentheses) {
                continue
            }
            if (char == ',' && !quota && count == 1) {
                lines.push(line)
                line = ''
                continue
            }
            line = line + char
        }
        return lines
    };

    var parseLine = function (line) {
        var m = {
            field: '',
            type: '',
            notNull: false,
            default: '',
            comment: '',
        }
        line = line.trim()
        if (!line) {
            return null
        }
        // scan field
        if (line[0] == '`' || line[0] == '\'' || line[0] == '"') {
            var quota = line[0]
            for (var i in line) {
                if (i == 0) {
                    continue
                }
                var char = line[i]
                if (char == quota) {
                    break
                }
                m.field = m.field + char
            }
        } else {
            m.field = line.split(' ')[0]
        }

        // scan type
        var types = {
            tinyint: 'int',
            int: 'int',
            smallint: 'int',
            mediumint: 'int',
            bigint: 'int',
            decimal: 'int',
            float: 'float64',
            double: 'float64',
            datetime: 'time.Time',
            time: 'time.Time',
            date: 'time.Time',
            timestamp: 'time.Time',
            var: 'string',
            enum: 'int',
            varchar: 'string',
            longtext: 'string',
            mediumtext: 'string',
            text: 'string',
            tinytext: 'string',
            binary: 'string',
            blob: 'string',
            longblob: 'string',
            mediumblob: 'string',
            varbinary: 'string',
            json: 'string',
        }
        for (var typ in types) {
            var r = new RegExp('\\s+' + typ + '\\s+', 'ig')
            if (r.test(line)) {
                m.type = types[typ]
                break
            }
            r = new RegExp('\\s+' + typ + '\\s*[(]', 'ig')
            if (r.test(line)) {
                m.type = types[typ]
                break
            }
        }

        // not null
        if (/\s+not\s+null\s+/ig.test(line)) {
            m.notNull = true
        }

        // scan default 
        // todo

        // scan comment
        if (/\s+comment\s+/ig.test(line)) {
            line.match(/\s+comment\s+'(.*)'/ig)
            m.comment = RegExp.$1
            if (!m.comment) {
                line.match(/\s+comment\s+"(.*)"/ig)
                m.comment = RegExp.$1
            }
        }
        if (!m.type) {
            m.type = 'interface{}'
        }
        return m
    }

    var processField = function (field) {
        var r = replaceAll(field, /^\s*[a-z]/g, function (v) { return v.toUpperCase() })
        r = replaceAll(r, /\s+[a-z]/g, function (v) { return v.toUpperCase() })
        r = replaceAll(r, /_+[a-z]/g, function (v) { return v.toUpperCase() })
        r = replaceAll(r, /_+/g, '')
        r = replaceAll(r, /\s+/g, '')
        return r
    }

    var replaceAll = function (txt, reg, rep) {
        var r = txt
        while (reg.test(r)) {
            r = r.replace(reg, rep)
        }
        return r
    }

    var lines = parse(stmt);
    var fields = []
    for (var i in lines) {
        var line = lines[i]
        if (/^\s*constraint\s+/ig.test(line)) {
            continue
        }
        var field = parseLine(line)
        fields.push(field)
    }

    // processs table name
    stmt.match(/create\s+table\s+[`'"]?((\w|[.])+)[`'"]?/ig)
    var tableName = RegExp.$1
    tableName = tableName.split('.').pop()

    var str = 'type ' + processField(tableName) + ' struct {' + '\n'
    for (var i in fields) {
        var field = fields[i]
        if (field.comment && conf.comment) {
            str = str + '\t// ' + field.comment + '\n'
        }
        var tag = '`'
        if (conf.json) {
            tag = tag + 'json:"' + field.field + '" '
        } else if (conf.jsonWithOmit) {
            tag = tag + 'json:"' + field.field + ',omitempty" '
        }
        if (conf.orm == 'gorm') {
            tag = tag + 'gorm:"column:' + field.field + '"'
        } else if (conf.orm == 'sqlx') {
            tag = tag + 'db:"' + field.field + '"'
        }
        tag = tag + '`'
        str = str + '\t' + processField(field.field) + '\t' + field.type + '\t' + tag + '\n'
    }

    str = str + '}\n'

    if (conf.orm == 'gorm') {
        str = str + '\n'
        str = str + 'func (' + processField(tableName) + ') TableName() string { \n' 
        str = str + '\treturn "' + tableName + '"\n'
        str = str + '}'
    }

    event.document().replaceString(
        event.selectionModel().selectionStart(),
        event.selectionModel().selectionEnd(),
        str)

})()
