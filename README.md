# MonkeyKingScripts [中文文档](/README_zh.md)

> Scripts repository for Intellij IDEA [MonkeyKing](https://plugins.jetbrains.com/plugin/16949-monkeyking) plugin

This repository is used for collect [MonkeyKing](https://plugins.jetbrains.com/plugin/16949-monkeyking) scripts. Everyone can publish theirself scritps.

## 1. How to use
In Idea MonkeyKing configrue page. Click *Browser* tab, the list will show all scripts in this repository. Choose what you want and click *use* button.

![usage](/demo1.jpg)


## 2. How to publish a script.
You must fork this repository, implement the script in your forked repository, and then submit a pr.

## 3. Specification

* Different languages ​​must be in their own directory. 
* Script must have their own directory.
* Intro is recommend. You can use text or HTML. HTML is best.
* Add the scritp in index.lua file at root directory. Like bellow

```lua
    ......

    {
        name = 'Bson ObjectID Convert', 
        language = 'lua',
        intro = '/src/lua/ObjectID/intro.html', 
        source = '/src/lua/ObjectID/id.lua',
    },

    .....
```

## 4. Online Scripts


|Script Name|Intro|Author|
:--|:--|:--
[Base64 Encode And Decode](/src/lua/Base64)|Base64 encode and decode|[heramerom](https://github.com/heramerom)
[Bson ObjectID Convert](/src/lua/ObjectID)|Bson ObjecetID and timestamp convert|[heramerom](https://github.com/heramerom)
[Hex Encode And Decode](/src/js/Hex)|Hex Encode And Decode|[heramerom](https://github.com/heramerom)
[Random Strings](/src/lua/Random)|Insert a Random string. Multi chars and different length|[heramerom](https://github.com/heramerom)
[AES Encrypt](/src/js/AES)|AES encrypt and decrypt. You need set your own key in script.|[heramerom](https://github.com/heramerom)
[MD5 Encode](/src/js/MD5)|MD5 encrypt|[heramerom](https://github.com/heramerom)
[SHA Encode](/src/js/SHA)|SHA encrypt，support SHA1,SHA224,SHA256,SHA384,SHA512|[heramerom](https://github.com/heramerom)
[Request Convert to cUrl](/src/js/Request)|Sometimes we want exec http request at server，<br/>This Script can convert http request to cUrl command|[heramerom](https://github.com/heramerom)
[Color Transform](/src/lua/ColorTransform)|Color Format #RRGGBB and rgb(r, g, b) convert|[heramerom](https://github.com/heramerom)
[RSA Encrypt Demo](/src/js/RSA)|RSA encrypt and decrypt. <br>You must set your own private and public key in script.|[heramerom](https://github.com/heramerom)
[Mysql And Go Struct Transform](/src/js/Mysql2GoStruct)|Convert Mysql create table statments to Go Struct defination|[heramerom](https://github.com/heramerom)

*More fun and useful scripts, look forward to your participation*
