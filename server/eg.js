const app = express();
app.get('/test', (req, res) => res.send('Hello World!'))

app.get('/favicon', function(req, res) {
    res.sendFile(path.join(path.join(__dirname + '/WebContent/image/host-icon.png')));
});

app.get('/', function(req, res) {
    res.redirect("/home");
});

//### API and info ###
app.get('/getInfo', function(req, res) {
    res.json(
      {'info': InfoArray,
      'info2': info2Array
    });
});


} else {
        serverLogger('Un-Handled actionID: ' + actionID);
        serverLogger('Agent process attempted but wrong action ID given');
        res.redirect("/agents");
    }
