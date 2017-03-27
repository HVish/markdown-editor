$(document).ready(function() {
    $('.markdown-body').html(marked('# Output comes here...'));
    $('textarea').keyup(function() {
        $('.markdown-body').html(marked($(this).val()));
        $('.markdown-body').stop().animate({
            scrollTop: $('.markdown-body')[0].scrollHeight
        }, 800);
        $.each($('.markdown-body code[class*="lang-"]'), function(index, dom) {
            Prism.highlightElement(dom);
        });
    });
    $('#source').click(function() {
        download($('.input textarea').val(), 'source.md', 'text/plain');
        $('#a')[0].click();
    });
    $('#output').click(function() {
        var html = $('<html/>');
        var head = $('<head/>');
        var body = $('<body/>');

        head.append('<meta charset="utf-8">');
        head.append('<title>Vaahika Documentation</title>');

        body.append('<div class="markdown-body">' + $('.markdown-body').html() + '</div>');

        $.when($.get("/libs/github-markdown.css")).done(function(response) {
            $('<style />').text(response).prepend('body{background: rgba(158, 158, 158, 0.1);} .markdown-body {background: #fff; box-sizing: border-box;min-width: 200px;max-width: 980px;margin: 0 auto;padding: 45px;}').appendTo(head);
            $.when($.get("/libs/prism.css")).done(function(response) {
                $('<style />').text(response).appendTo(head);
                html.append(head);
                $.when($.get("/libs/prism.min.js")).done(function(response) {
                    $('<script />').text(response).appendTo(body);
                    html.append(body);
                    download('<html>' + html.html() + '</html>', 'output.html', 'text/plain');
                    $('#a')[0].click();
                });
            });
        });
    });
});

function download(text, name, type) {
    var a = document.getElementById("a");
    var file = new Blob([text], {
        type: type
    });
    a.href = URL.createObjectURL(file);
    a.download = name;
}
