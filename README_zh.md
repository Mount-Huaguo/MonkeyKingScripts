
# MonkeyKingScripts

> Intellij IDEA插件[MonkeyKing](https://plugins.jetbrains.com/plugin/16949-monkeyking)的脚本版本库。

这个版本库是用于收集IDEA插件[MonkeyKing](https://plugins.jetbrains.com/plugin/16949-monkeyking)脚本。方便大家重用脚本。任何人都可以发布自己的脚本。

## 1. 如何使用
在IDEA的MonkeyKing插件中，选择Browser选项卡，在下面的插件列表即为本版本库的所有脚本，点击use即可安装使用。

![使用示例](/demo1.jpg)


## 2. 如何发布自己的脚本
首先需要Fork本项目，然后在Fork的版本库中添加需要发布的脚本。然后提交PR。

## 3. 编写脚本的一些约定。
* 首先需要明确脚本实现的语言，然后在根据不同的语言，在对应的语言文件夹下创建相关脚本文件夹，最后开发相关脚本。
* 添加完脚本后，需要添加描述信息，描述信息可以是Text文件格式，也可以是HTML格式，推荐使用HTML格式
* 最后将编写的脚本添加到根目录的index.lua文件中，如下所示。
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

## 4. 已发布的脚本

|脚本名|描述|作者|
:--|:--|:--
[Base64 Encode And Decode](/src/lua/Base64)|Base64编码和解码|[heramerom](https://github.com/heramerom)
[Bson ObjectID Convert](/src/lua/ObjectID)|Bson Objecet和时间之间的快速转换|[heramerom](https://github.com/heramerom)
[Hex Encode And Decode](/src/js/Hex)|十六进制编码和解码|[heramerom](https://github.com/heramerom)
[Random Strings](/src/lua/Random)|生产随机字符串|[heramerom](https://github.com/heramerom)
[AES Encrypt](/src/js/AES)|AES加解密，脚本需要二次开发，添加加解密的秘钥|[heramerom](https://github.com/heramerom)
[MD5 Encode](/src/js/MD5)|MD5加密|[heramerom](https://github.com/heramerom)
[SHA Encode](/src/js/SHA)|SHA加密，支持SHA1,SHA224,SHA256,SHA384,SHA512，按需使用|[heramerom](https://github.com/heramerom)
[Request Convert to cUrl](/src/js/Request)|有时需要将http里的request放到服务器上执行，<br/>这个脚本可以将http请求转换成cUrl命令|[heramerom](https://github.com/heramerom)
[Color Transform](/src/lua/ColorTransform)|颜色格式#RRGGBB和rgb(r, g, b)格式之间的互相转换，<br>前端开发应该常用到这个功能|[heramerom](https://github.com/heramerom)
[RSA Encrypt Demo](/src/js/RSA)|RSA加解密，需要二次开发，添加自己加解密的公钥与私钥|[heramerom](https://github.com/heramerom)
[Mysql And Go Struct Transform](/src/js/Mysql2GoStruct)|将MySql的建表语句转换成Go Struct定义|[heramerom](https://github.com/heramerom)

*更多的好玩有用的脚本，期待你的参与*