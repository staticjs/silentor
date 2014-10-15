(function($) {
    $._config = {
            'app_name': 'silentor',
            'blog_base': '/silentor/p/', //博文相对url
        }
        //当前请求的markdown文件
    var cur_md_path = '';

    function isAbsolute(url) {
        return url.indexOf('//') !== -1;
    }

    function hasFolder() {
        //false :`xxx.md` 
        // true : `yy/xx.md`
        var path = location.search.slice(1, location.search.length);
        return path.indexOf('/') !== -1;
    }

    function getPageBase(url) {
        return url.slice(0, url.lastIndexOf('/') + 1);
    }

    function isMarkdownFile(url) {
        return url.toLowerCase().indexOf('.md') !== -1 || url.toLowerCase().indexOf('.markdown') !== -1;
    }


    // TODO callback support
    function load(selector, file_path, isSidebar, baseUrl) {
        baseUrl = baseUrl || $._config['blog_base'];
        isSidebar = isSidebar || false;

        var p_url = baseUrl + file_path;
        console.log(p_url);

        $.get(p_url, function(data) {
            marked.setOptions({
                highlight: function(code) {
                    return hljs.highlightAuto(code).value;
                }
            });

            $(selector).html(marked(data));
            // hljs.initHighlightingOnLoad();
            //处理所有scr
            $(selector).find('[href]').each(function() {
                var $element = $(this);
                var url = $element.attr('href');

                if (isAbsolute(url)) {
                    $element.attr('target', '_blank');
                }

                // sidebar
                if (isSidebar && isMarkdownFile(url)) {
                    $element.attr('href', '?' + url);
                }

                //main page
                if (!isAbsolute(url) && !isSidebar && isMarkdownFile(url) && hasFolder(url)) {
                    $element.attr('href', '?' + getPageBase(cur_md_path) + url);
                }

            });
        }).fail(function(err) {
            if (err.status === 404) {
                load('#main-page', '404.md', false, '/' + $._config.app_name + '/');
            }
        });
    }

    function read_config(callback) {
        $.getJSON('config.json', {}, function(data) {
            $._config.app_name = data.app_name || $._config.app_name;
            $._config['blog_base'] = '/' + $._config.app_name + '/p/';
            callback();
        }).fail(function(err) {
            console.log('错误码: ' + err.status);
        });
    }

    function init() {
        read_config(function() {
            load('#sidebar-page', 'sidebar.md', true);

            if (cur_md_path === '') {
                load('#main-page', 'home.md');
                console.log("load main~");
            }
        });

    }

    function main() {
        if (location.search) {
            cur_md_path = location.search.slice(1, location.search.length);
            if (cur_md_path) {
                load('#main-page', cur_md_path);
            }
        }
        init();
    }

    main();


})(jQuery);
