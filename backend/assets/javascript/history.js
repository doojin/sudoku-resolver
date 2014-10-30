function Recent(tableId) {
    this.table = tableId;
}

// Appending new records to table
Recent.prototype.loadMore = function(records) {
    records = JSON.parse(records);
    
    var pattern = '<tr><td>{when}</td><td>{ip}</td><td>{time}</td></tr>';
    
    for (var i in records) {
        var html = pattern;
        var record = records[i];
        
        html.replace('{when}', record.when);
        html.replace('{ip}', record.ip);
        html.replace('{time}', record.time);
        
        $(this.table).append(html);
    }
};