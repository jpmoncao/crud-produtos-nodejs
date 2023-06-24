const http = require('http');

http
    .createServer((req, res) => {
        res.writeHead(200, { 'Content-type': 'application/json' });

        switch (req.url) {
            case '/usuarios':
                res.end(JSON.stringify({
                    message: 'Rota de usuários'
                }));
                break;
            case '/produtos':
                res.end(JSON.stringify({
                    message: 'Rota de produtos'
                }));
                break;
            default:
                res.end('Hello World!');
                break;
        }

    })
    .listen(3000, () => console.log('Server is running in port 3000!'));