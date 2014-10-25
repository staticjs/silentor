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
* 友好的移动端支持

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


### 加入社会化评论框
**以多说为例**

首先到`http://duoshuo.com/` 申请有账号
然后进入后台获得通用评论框代码，放到index.html的`#main-page下`

e.g:
```html
     <!-- main -->
    <div class="main" id="main">
        <div class="main-inner">
            <div class="main-page markdown-body" id="main-page"></div>
        </div>
        <!-- 多说评论框 start -->
        <div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>
        <!-- 多说评论框 end -->
        <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
        <script type="text/javascript">
        var duoshuoQuery = {
            short_name: "jayin"
        };
        (function() {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
        </script>
        <!-- 多说公共JS代码 end -->
    </div>
```

**如果想在网站首页不显示评论,如何做？**
```javascript
//blog.js
function init() {
    read_config(function() {
        load('#sidebar-page', 'sidebar.md', true);

        if (cur_md_path === '') {
            load('#main-page', 'home.md');
            console.log("load main~");
            //多说评论,若想不在首页显示评论框 那么：取消这一句注释
            //$('.ds-thread').removeClass('ds-thread');
        }
    });
}
```

### 导航栏动画
//注释掉下面的可以删除该动画
```html
<!-- 可选的动画 -->
<script src="vendor/anim.js"></script>
```

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
