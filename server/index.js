	var express = require("express");
	var app = express();
	var mysql = require("mysql");
	var bodyParser = require("body-parser")
	app.use(bodyParser.json());
	app.all('*',function(req,res,next){
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Headers',
		'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
		res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Credentials',true)
		if(req.method=='OPTIONS'){
			res.send(200);
		}else{
			next()
		}
	})
	var connection;
	env ={
	host:"localhost",
	user:"root",
	password:"root",
	database:"sannongejia"
	}
	function handleError(err){
	    if(err){
	        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
	            connect();
	        }else{
	            console.error(err.stack || err);
	        }
	    }
	}
	function connect(){
	    connection = mysql.createConnection(env);
	    connection.connect(handleError);
	    connection.on('error',handleError)
	}
	connect();
	app.post("/",(req,res)=>{
	    res.send("helloworld");
	});
	app.post("/index",(req,res)=>{
	   var type =req.body.type;
	   console.log(type)
	   var sql ="select * from news where article_type="+type+" order by datetime desc";
	   connection.query(sql,(err,result)=>{
	       if(err){
	           console.log("select error",err.message);
	       }
	       console.log(result)
	       res.json(result)
	   })
	});
	app.listen(3001,()=>{
	    console.log("server running at http://127.0.0.1:3001")
	})