silentor
========
>Be a silentor,just focus on marking your words down!

开发缘由
===
第一次使用fritx同学的[silent](https://github.com/fritx/silent) 失败了，于是决定重复造下轮子
所以，silentor是受silent的启发，代码简单容读。

Features
===
* markdown only ,让你专注文章本身
* 无需后台,按照指定的地方写markdown就行了
* Github CSS
* 支持语法高亮

使用
===
### 第一步：配置根目录的config.json
```json
{
    "app_name": "{输入你的项目名}"
}

```

### 第二部步：创建gh-pages分支并 上传到Github
```shell
git init
git checkout -b gh-pages
git add --all 
git commit -m 'my website'
git push origin gh-pages
//然后输入你的github账号,密码
```

see [Demo](http://meizhuo.github.io/silentor/)

开发指南
===

### 设置图片
我们约定在根目录下的img/下放置所有图片文件

若markdown需要用到:
```markdown
![图片说明](./img/xxx.jpg)
```

### 根目录下的404.md就是找不页面时显示的内容
若有需要，可以改写里面的内容

### 更换语法高亮css
```html
//引入在vendor/highlight/styles下
<link rel="stylesheet" href="vendor/highlight/styles/github.css">
```

### 网站标题

首先网站只有2部分，一个Sidebar，左侧的菜单栏,另外一个是右侧，主页栏
网站标题默认是右侧内容页的第一行标题


### 网站分析
你可以在`index.html`中嵌入你的google an

License
===
    Copyright 2014 Meizhuo Lib

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
