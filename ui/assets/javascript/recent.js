function Recent() {}

// Appending new records to table
Recent.prototype.getRecords = function(records) {
    records = JSON.parse(records);
    var htmls = [];
    
    var pattern = '<tr><td><i class="calendar icon"></i>{when}</td><td>{ip}</td><td><i class="time icon"></i>{time}</td><td><a class="ui tiny black button" href="#">Open</a></td></tr>';
    
    for (var i in records) {
        var html = pattern;
        var record = records[i];
        
        html = html.replace('{when}', record.when);
        html = html.replace('{ip}', record.ip);
        html = html.replace('{time}', record.time);
        
        htmls.push(html)
    }
    return htmls;
};