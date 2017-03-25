$(document).ready(function() {
    $('.markdown-body').html(marked('# Enter your markdown here...'));
    $('textarea').keyup(function() {
        $('.markdown-body').html(marked($(this).val()));
        $('.markdown-body').stop().animate({
            scrollTop: $('.markdown-body')[0].scrollHeight
        }, 800);
    });
});
