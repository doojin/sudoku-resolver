$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function() {
    
    var current = 0;
    
    var records = [
        '[{"when":"1 year(s) ago", "ip":"11.111.111....", "time":"3 hour(s)"},{"when":"1 year(s) ago", "ip":"11.111.111....", "time":"3 hour(s)"},{"when":"1 year(s) ago", "ip":"11.111.111....", "time":"3 hour(s)"},{"when":"1 year(s) ago", "ip":"11.111.111....", "time":"3 hour(s)"},{"when":"1 year(s) ago", "ip":"11.111.111....", "time":"3 hour(s)"}]',
        '[{"when":"2 year(s) ago", "ip":"22.222.222....", "time":"3 hour(s)"},{"when":"2 year(s) ago", "ip":"22.222.222....", "time":"3 hour(s)"},{"when":"2 year(s) ago", "ip":"22.222.222....", "time":"3 hour(s)"},{"when":"2 year(s) ago", "ip":"22.222.222....", "time":"3 hour(s)"},{"when":"2 year(s) ago", "ip":"22.222.222....", "time":"3 hour(s)"}]'
    ];
    
    var recent = new Recent();
    
    $(window).scroll(function() {
       if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            if (current < records.length) {
                var newRows = recent.getRecords(records[current++]);
                for (var i in newRows) {
                    var newRow = newRows[i];
                    $('#history > tbody:last').append(newRow);
                }
            }
       }
    });
});