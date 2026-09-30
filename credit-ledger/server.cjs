'use strict';
// Local preview only. A static host can serve the same HTML/CSS/JS directly.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end('Method not allowed')}
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 if(pathname==='/')pathname='/index.html';
 const allowed=['/index.html','/terms.html','/dashboard.html','/assets/styles.css','/assets/terms.js','/assets/dashboard.js'];
 if(!allowed.includes(pathname)){res.writeHead(404);return res.end('Not found')}
 fs.readFile(path.join(root,pathname),(error,body)=>{if(error){res.writeHead(500);return res.end('Unable to read asset')}
 res.writeHead(200,{'Content-Type':types[path.extname(pathname)],'X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"});res.end(req.method==='HEAD'?undefined:body)});
}).listen(port,'127.0.0.1',()=>console.log(`Credit Ledger: http://localhost:${port}`));
