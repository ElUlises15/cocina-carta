import http from 'node:http';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync, mkdirSync} from 'node:fs';
import {resolve, extname} from 'node:path';
import {menu} from './public/menu.js';
const root=resolve('public'); mkdirSync('data',{recursive:true});
const db=new DatabaseSync(process.env.DB_PATH || 'data/cocina.sqlite');
db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY, table_number INTEGER NOT NULL, items TEXT NOT NULL, notes TEXT NOT NULL, total INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'nuevo', paid INTEGER NOT NULL DEFAULT 0, done INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL);`);
const decode=r=>({...r,items:JSON.parse(r.items),paid:!!r.paid,done:!!r.done});
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json','X-Robots-Tag':'noindex, nofollow'});res.end(JSON.stringify(data));};
const server=http.createServer(async(req,res)=>{
try {
const path=new URL(req.url,'http://localhost').pathname;
if(path.startsWith('/api/')) {
if(req.method==='GET'&&path==='/api/menu')return json(res,200,menu);
if(req.method==='GET'&&path==='/api/orders')return json(res,200,db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all().map(decode));
let body={}; if(['POST','PATCH'].includes(req.method)){let raw=''; for await(const chunk of req){raw+=chunk;if(raw.length>20000)return json(res,413,{error:'El pedido es demasiado grande.'});}try{body=JSON.parse(raw);}catch{return json(res,400,{error:'Datos inválidos.'});}}
if(req.method==='POST'&&path==='/api/orders'){
if(!Number.isInteger(body.table_number)||body.table_number<1||body.table_number>99)return json(res,400,{error:'Elegí una mesa del 1 al 99.'});
if(!Array.isArray(body.items)||!body.items.length||body.items.length>40)return json(res,400,{error:'Agregá un plato a tu pedido.'});
const items=[];for(const item of body.items){const dish=menu.find(m=>m.id===item.id);if(!dish||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>20)return json(res,400,{error:'Revisá los platos y las cantidades.'});items.push({id:dish.id,name:dish.name,price:dish.price,quantity:item.quantity});}
const id=crypto.randomUUID(); db.prepare('INSERT INTO orders(id,table_number,items,notes,total,created_at) VALUES(?,?,?,?,?,?)').run(id,body.table_number,JSON.stringify(items),String(body.notes||'').slice(0,500),items.reduce((s,i)=>s+i.price*i.quantity,0),new Date().toISOString());
return json(res,201,decode(db.prepare('SELECT * FROM orders WHERE id=?').get(id)));
}
if(req.method==='PATCH'&&path.startsWith('/api/orders/')){const id=path.split('/').pop();const old=db.prepare('SELECT * FROM orders WHERE id=?').get(id);if(!old)return json(res,404,{error:'No encontramos ese pedido.'});if(body.status!==undefined&&!['nuevo','preparando','listo'].includes(body.status))return json(res,400,{error:'Estado inválido.'});for(const k of ['paid','done'])if(body[k]!==undefined&&typeof body[k]!=='boolean')return json(res,400,{error:'Valor inválido.'});db.prepare('UPDATE orders SET status=?,paid=?,done=? WHERE id=?').run(body.status??old.status,body.paid===undefined?old.paid:Number(body.paid),body.done===undefined?old.done:Number(body.done),id);return json(res,200,decode(db.prepare('SELECT * FROM orders WHERE id=?').get(id)));}
return json(res,404,{error:'Ruta no encontrada.'});
}
const filename=resolve(root,'.'+decodeURIComponent(path==='/'?'/index.html':path));if(!filename.startsWith(root+'/')){res.writeHead(403);return res.end();}
try{const data=readFileSync(filename);res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain'})[extname(filename)]||'application/octet-stream','X-Robots-Tag':'noindex, nofollow'});res.end(data);}catch{res.writeHead(404);res.end('No encontramos esta página.');}
}catch(e){console.error(e);json(res,500,{error:'No pudimos completar la acción. Probá de nuevo.'});}
});
server.listen(Number(process.env.PORT||3851),'0.0.0.0',()=>console.log('Lo de Mabel · http://localhost:'+ (process.env.PORT||3851)));
