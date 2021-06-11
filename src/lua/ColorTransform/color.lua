-- @start
-- @namespace       com.github.mounthuaguo.monkeyking.lua
-- @version         0.1
-- @name            Color Transform
-- @author          Heramerom
-- @type            action
-- @action.hide     Convert To Hex Color
-- @action.hide     Convert To RGB Color
-- @action          Color Format Toggle
-- @end

local hexPatterns = {
    '^%s*%x%x%x%x%x%x%s*$', -- rrggbb
    '^%s*0[xX]%x%x%x%x%x%x%s*$', -- 0xrrggbb
    '^%s*#%x%x%x%x%x%x%s*$', -- #rrggbbaa

    '^%s*%x%x%x%s*$', -- rgb
    '^%s*0[xX]%x%x%x%s*$', -- 0xrgb
    '^%s*#%x%x%x%s*$', -- #rgb

    '^%s*%x%x%x%x%s*$', -- rgba
    '^%s*0[xX]%x%x%x%x%s*$', -- 0xrgba
    '^%s*#%x%x%x%x%s*$', -- #rgba

    '^%s*%x%x%x%x%x%x%x%x%s*$', -- rrggbbaa
    '^%s*0[xX]%x%x%x%x%x%x%x%x%s*$', -- 0xrrggbbaa
    '^%s*#%x%x%x%x%x%x%x%x%s*$' -- #rrggbbaa
}

local rgbPatterns = {
    '^%s*%d+%s*,%s*%d+%s*,%s*%d+%s*$', -- r, g, b
    '%s*%d+%s*,%s*%d+%s*,%s*%d+%s*,%s*%d+%s*', -- r, g, b, a

    '^%s*rgb%s*[(]%s*%d+%s*,%s*%d+%s*,%s*%d+%s*[)]%s*$', -- rgb(r, g, b)
    '^%s*RGB%s*[(]%s*%d+%s*,%s*%d+%s*,%s*%d+%s*[)]%s*$', -- RGB(r, g, b)

    '^%s*rgba%s*[(]%s*%d+%s*,%s*%d+%s*,%s*%d+%s*,%s*%d+%s*[)]%s*$', -- rgba(r, g, b, a)
    '^%s*RGBA%s*[(]%s*%d+%s*,%s*%d+%s*,%s*%d+%s*,%s*%d+%s*[)]%s*$' -- RGBA(r, g, b, a)
}

local input = event.selectionModel.selectedText

if not input then
    toast.warn('Please select a color!')
    return
end

function parseHexColor(hex)
    local color = {}
    for k, p in pairs(hexPatterns) do
        local x = string.match(hex, p)
        if not x then
            goto continue
        end
        x = string.gsub(x, '0[xX]', '')
        x = string.match(x, '%x+')
        if string.len(x) == 3 then
            color.r = string.sub(x, 1, 1)
            color.g = string.sub(x, 2, 2)
            color.b = string.sub(x, 3, 3)
            return color
        end
        if string.len(x) == 4 then
            color.r = string.sub(x, 1, 1)
            color.g = string.sub(x, 2, 2)
            color.b = string.sub(x, 3, 3)
            color.a = string.sub(x, 4, 4)
            return color
        end
        if string.len(x) == 6 then
            color.r = string.sub(x, 1, 2)
            color.g = string.sub(x, 3, 4)
            color.b = string.sub(x, 5, 6)
            return color
        end
        if string.len(x) == 8 then
            color.r = string.sub(x, 1, 2)
            color.g = string.sub(x, 3, 4)
            color.b = string.sub(x, 5, 6)
            color.a = string.sub(x, 7, 8)
            return color
        end
        ::continue::
    end
    return color
end

function parseRGBColor(hex)
    local color = {}
    for k, p in pairs(rgbPatterns) do
        local x = string.match(hex, p)
        if not x then
            goto continue
        end
        local index = 0
        for v in string.gmatch(x, '%d+') do
            index = index + 1
            if index == 1 then
                color.r = v
            end
            if index == 2 then
                color.g = v
            end
            if index == 3 then
                color.b = v
            end
            if index == 4 then
                color.a = v
            end
        end
        if color.r ~= nil then
            return color
        end
        ::continue::
    end
end

function hex2int(hex, max)
    if not hex then
        return nil
    end
    local Integer = luajava.bindClass('java.lang.Integer')
    local i = Integer:parseInt(hex, 16)
    if string.len(hex) == 1 then
        i = i / 16 * max
    end
    if max == 100 then
        i = i / 255 * 100
    end
    return string.format('%d', i)
end

function int2hex(i, max)
    if not i then
        return nil
    end
    local Integer = luajava.bindClass('java.lang.Integer')
    local i = Integer:parseInt(i, 10)
    if max == 100 then
        i = i / 100 * 255
    end
    return string.format('%02x', i)
end

function convertToHexColor()
    local color = parseRGBColor(input)
    if color.r == nil then
        toast.error('Color Format error')
        return
    end
    color.r = int2hex(color.r, 255)
    color.g = int2hex(color.g, 255)
    color.b = int2hex(color.b, 255)
    color.a = int2hex(color.a, 100)
    local str = ''
    if string.find(input, '[rR]') ~= nil then
        str = str .. '#'
    end
    str = str .. color.r
    str = str .. color.g
    str = str .. color.b
    if color.a ~= nil then
        str = str .. color.a
    end
    event.document.replaceString(event.selectionModel.selectionStart, event.selectionModel.selectionEnd, str)
end

function convertToRGBColor()
    local color = parseHexColor(input)
    if color.r == nil then
        toast.error('Color Format error')
        return
    end
    color.r = hex2int(color.r, 255)
    color.g = hex2int(color.g, 255)
    color.b = hex2int(color.b, 255)
    color.a = hex2int(color.a, 100)
    local str = ''
    if string.find(input, '#') ~= nil then
        if color.a ~= nil then
            str = str .. 'rgba('
        else
            str = str .. 'rgb('
        end
    end
    str = str .. color.r .. ', '
    str = str .. color.g .. ', '
    str = str .. color.b
    if color.a ~= nil then
        str = str .. ', ' .. color.a
    end
    if string.find(input, '#') ~= nil then
        str = str .. ')'
    end
    event.document.replaceString(event.selectionModel.selectionStart, event.selectionModel.selectionEnd, str)
end

if menu == 'Convert To Hex Color' then
    convertToHexColor()
end

if menu == 'Convert To RGB Color' then
    convertToRGBColor()
end

if menu == 'Color Format Toggle' then
    if string.find(input, ',') ~= nil then
        convertToHexColor()
    else
        convertToRGBColor()
    end
end
