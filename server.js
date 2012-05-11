var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    
    if(path === "css" || path === "/css") {
        var css = fs.createReadStream("css.css");
        css.pipe(res);
    } else if(path === "new" || path === "/new" ) {
        getNewDomains(res);
    } else if(path === "img.png" || path === "/img.png") {
        res.writeHead(200, {"Content-Type": "image/png"});
        var img = fs.createReadStream("img.png");
        img.pipe(res);
    } else {
        var home = fs.createReadStream("home.html");
        home.pipe(res);
    }
    
    
}).listen(process.env.PORT || 3000);

function getNewDomains(resp) {
    http.get({ host: "www.wegnerdesign.com", path: "/compoundWord/index.php"}, function(res) {
        var data = "";
        
        res.on('data', function(chunk) {
            data += chunk; 
        });
        
        res.on('end', function() {  resp.end(data); });
    });
}