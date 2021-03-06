-- @start
-- @namespace   com.github.mounthuaguo.mongkeyking.lua
-- @version     0.1
-- @name        Base64 Encode
-- @description Base64 encode and decode
-- @author      heramerom
-- @type        action
-- @action      Copy With Base64 Encode
-- @action      Copy With Base64 Decode
-- @action      Replace With Base64 Encode
-- @action      Replace With Base64 Decode
-- @action      Output With Base64 Encode
-- @action      Output With Base64 Decode
-- @require     https://raw.githubusercontent.com/toastdriven/lua-base64/master/base64.lua
-- @end

function inputText() 
    local text = event.selectionModel.selectedText
    if text == nil or text == '' then
        toast.warn('Please select text')
        return nil
    end
    return text
end


if menu == 'Copy With Base64 Encode' then
    local text = inputText()
    if not text then
        return
    end
    clipboard.setContents(to_base64(text))
    toast.info('Copied!')
end

if menu == 'Copy With Base64 Decode' then
    local text = inputText()
    if not text then
        return
    end
    clipboard.setContents(from_base64(text))
    toast.info('Copied!')
end

if menu == 'Replace With Base64 Encode' then
    local text = inputText()
    if not text then
        return
    end
    event.document.replaceString(
        action.selectionModel.selectionStart, 
        action.selectionModel.selectionEnd, 
        to_base64(text))
end

if menu == 'Replace With Base64 Decode' then
    local text = inputText()
    if not text then
        return
    end
    event.document.replaceString(
        action.selectionModel.selectionStart, 
        action.selectionModel.selectionEnd, 
        from_base64(text))
end

if menu == 'Output With Base64 Encode' then
    local text = inputText()
    if not text then
        return
    end
    print(to_base64(text))
end

if menu == 'Output With Base64 Decode' then
    local text = inputText()
    if not text then
        return
    end
    print(from_base64(text))
end

