require('dotenv').config()
const express=require('express')
const app=express()
const fs=require('fs')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public')) 

db=JSON.parse(fs.readFileSync('db.json'))
console.log('db initialized')
/*bot.on('message', (msg) => {

  //anything

});*/


bot.onText(/\/start/, (msg) => {
if (msg.text.toString().toLowerCase().indexOf('/start') === 0) {
    bot.sendMessage(msg.from.id, "Welcome " + msg.from.first_name+" Verify Yourself To Recieve Books");
}
bot.sendMessage(msg.chat.id, "Services", {
"reply_markup": {
    "keyboard":[ ["Books"], ["Videos"],   ["Tutorials"], ["Sheets"]]
    }
});

});

app.post('/post',(req,res)=>{
console.log('post route')
console.log(req.body)
db.push({
	tel:req.body.tel,
	code:req.body.code
})
fs.writeFile("db.json", JSON.stringify(db), (err) => {

  if (err){

    console.log(err);}

});
})
app.get('/admin',(req,res)=>{
res.json(db)
})

app.listen(8080,console.log('server running'))
