-- @start
-- @namespace       com.github.mounthuaguo.monkeyking.lua
-- @version         0.1
-- @name            Random
-- @description     Auto generate some random charactors.
-- @author          Heramerom
-- @type            action
-- @action          Insert Random Charactors
-- @action          Insert Hex Charactors
-- @action          Insert Digital Charactors
-- @action          Insert Lowercase Charactors
-- @action          Insert Uppercase Charactors
-- @end

local digital = '1234567890'
local lowercase = 'abcdefghijklmnopqrstuvwxyz'
local uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
local special = '!@#$%^&*()'
local hex = '1234567890abcdef'

local date = luajava.newInstance('java.util.Date')
local rand = luajava.newInstance('java.util.Random', date:getTime())

function gen(str, length)
    local ret = ''
    local bounds = string.len(str)
    for i = 1,length do 
        local offset = rand:nextInt(bounds) + 1
        ret = ret .. string.sub(str, offset, offset)
    end
    return ret
end

function inputLength() 
    local ret = dialog.show({field = 'Length', type = 'text', default = '32'})
    if not ret.success then
        return nil
    end
    return tonumber(ret.data.Length)
end

function insert(str)
    event.document.insertString(event.selectionModel.selectionStart, str)
end

local menus = {
    {menu = 'Insert Hex Charactors', str = hex},
    {menu = 'Insert Digital Charactors', str = digital},
    {menu = 'Insert Lowercase Charactors', str = lowercase},
    {menu = 'Insert Uppercase Charactors', str = uppercase}, 
}

for i, m in ipairs(menus) do
    if m.menu == menu then
        local length  = inputLength()
        if length == nil then
           return
        end
        local str = gen(m.str, length)
        insert(str)
    end
end

if menu == 'Insert Random Charactors' then
    local r = dialog.show({
            field = 'Length', 
            type = 'text',
            default = 32
        },
        {
            field = 'Charactors', 
            type = 'checkbox',
            default = {'Digital', 'Lowercase'},
            options = {'Digital', 'Lowercase', 'Uppercase', 'Special Charactors'}
        })
    if not r.success then
        return
    end
    local length = tonumber(r.data['Length'])
    if length == nil then
        return
    end
    if r.data.Charactors == nil then
        return
    end
    local str = ''
    for i, v in ipairs(r.data.Charactors) do
        if v == 'Digital' then
            str = str .. digital
        end
        if v == 'Lowercase' then
            str = str .. lowercase
        end
        if v == 'Uppercase' then
            str = str .. uppercase
        end
        if v == 'Special Charactors' then
            str = str .. special
        end
    end
    insert(gen(str, length))
end


