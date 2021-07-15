-- @start
-- @namespace       com.github.mounthuaguo.monkeyking.lua
-- @version         0.1
-- @name            Bson Object ID
-- @description     Bson Object ID method suit
-- @author          Heramerom
-- @type            action
-- @action          Generate ObjectID
-- @action          Show ObjectID datetime
-- @end

local Integer = luajava.bindClass('java.lang.Integer')

if menu == 'Generate ObjectID' then
    local date = luajava.newInstance('java.util.Date')
    local timestamp = date:getTime()
    local id = Integer:toString(timestamp/1000, 16) .. '0000000000000000'
    event.document.insertString(event.selectionModel.selectionStart, id)
end

if menu == 'Show ObjectID datetime' then
    local text = event.selectionModel.selectedText
    if text == nil or input == '' then
        toast.warn('Please select a bson objectId!')
        return
    end
    if string.len(text) < 8 then
        toast.warn('Object is too short!')
        return
    end
    local timestamp = Integer:parseInt(string.sub(text, 1, 8), 16)
    local date = luajava.newInstance('java.util.Date', timestamp * 1000)
    local format = luajava.newInstance('java.text.SimpleDateFormat', 'yyyy-MM-dd HH:mm:ss.SSSZ')
    toast.info(format:format(date))
end
