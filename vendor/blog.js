(function($) {
    var app_name = 'silentor'
        //博文相对url
    var blogBase = '/' + app_name + '/p/';
    var pageBase = '';
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
        baseUrl = baseUrl || blogBase;
        isSidebar = isSidebar || false;

        var p_url = baseUrl + file_path;

        $.get(p_url, function(data) {
            $(selector).html(marked(data));
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
                load('#main-page', '404.md', false, '/'+app_name+'/');
            }
        });


    }

    function init() {
        load('#sidebar-page', 'sidebar.md', true);

        if (cur_md_path === '') {
            load('#main-page', 'home.md');
        }
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
