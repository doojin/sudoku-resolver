function initMenu() {
    var menuItem = $('.menu a.item, .menu .link.item');
    var dropdown = $('.menu .dropdown');

    var handler = {
        activate: function () {
            if (!$(this).hasClass('dropdown')) {
                $(this).addClass('active').closest('.ui.menu').find('.item').not($(this)).removeClass('active');
            }
        }
    };

    dropdown.dropdown({on: 'hover'});
    menuItem.on('click', handler.activate);
}

$(document).ready(function() {
   initMenu(); 
});