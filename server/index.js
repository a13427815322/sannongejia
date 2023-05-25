var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser")
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers',
		'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', true)
	if (req.method == 'OPTIONS') {
		res.send(200);
	} else {
		next()
	}
})
var connection;
env = {
	host: "localhost",
	user: "root",
	password: "rroott",
	database: "sannongejia"
}

function handleError(err) {
	if (err) {
		if (err.code == 'PROTOCOL_CONNECTION_LOST') {
			connect();
		} else {
			console.error(err.stack || err);
		}
	}
}

function connect() {
	connection = mysql.createConnection(env);
	connection.connect(handleError);
	connection.on('error', handleError)
}
connect();
app.post("/", (req, res) => {
	res.send("helloworld");
});
app.post("/index", (req, res) => {
	var type = req.body.type;
	console.log(type)
	var sql = "select * from news where article_type=" + type + " order by datetime desc";
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/shop", (req, res) => {
	var type = req.body.type;
	console.log(type)
	var sql = "select * from shop where type=" + type;
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/getshop", (req, res) => {
	var id = req.body.id;
	console.log(id)
	var sql = "select * from shop where shopid=" + id;
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/updatenickname", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var nickname = req.body.nickname
	var sql = "update userinfo set nickname='" + nickname + "' where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/updatesex", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var sex = req.body.sex
	var sql = "update userinfo set sex='" + sex + "' where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/updatebirthday", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var birthday = req.body.birthday
	var sql = "update userinfo set birthday='" + birthday + "' where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/updeteheadSculpture", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var headSculpture = req.body.headSculpture;
	console.log(headSculpture)
	var sql = "update userinfo set headSculpture='" + headSculpture + "' where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		var sql2 = "select * from userinfo where _id='" + _id + "'"
		connection.query(sql2, (err1, result2) => {
			if (err1) {
				console.log("select error", err1.message);
			}
			console.log(result2)
			res.json(result2)
		})
	})
});
app.post("/getuserinfo", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var sql = "select * from userinfo where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/getshopcard", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var sql = "select * from shopcart where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/deleteshopcard", (req, res) => {
	var _id = req.body._id;
	var shopcart=JSON.stringify(req.body.shopcart) 
	console.log(_id)
	var sql = "update shopcart set shopcart =? where _id=?"
	var sql2 = "select * from shopcart where _id='" + _id + "'"
	connection.query(sql,[shopcart,_id],(err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		connection.query(sql2,(err2,result2)=>{
			if (err2) {
				console.log("select error", err2.message);
			}
			res.json(result2)
		})
	})
});
app.post("/todingdan", (req, res) => {
	var _id = req.body._id;
	var shopcart=JSON.stringify(req.body.shopcart) 
	console.log(_id)
	var cjtime=new Date
	var sql = "insert into dingdan (_id,shopcart,status,cjtime) values(?,?,?,?)"
	connection.query(sql,[_id,shopcart,1,cjtime],(err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
		
	})
});
app.post("/toshopcart", (req, res) => {
	var _id = req.body.id;
	// console.log(_id)
	var shopid= req.body.shopid
	// console.log(shopid)
	
	var sql = "select * from shopcart where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
	var sql1="select * from shop where shopid=" + shopid;
	connection.query(sql1,(err1,result1)=>{
		if (err1){
			console.log(err1.message)
		}
		let shopbox=[{}]
		// console.log(result1[0].shopname)
		let shop={}
		shop.shopname=result1[0].shopname
		shop.jiage=result1[0].jiage
		shop.count=1
		shop.changpingimg=result1[0].changpingimg
		shop.shopid=result1[0].shopid
		shopbox[0].shopname=result1[0].shopname
		shopbox[0].jiage=result1[0].jiage
		shopbox[0].count=1
		shopbox[0].changpingimg=result1[0].changpingimg
		shopbox[0].shopid=result1[0].shopid
		if (result == '') {
			// console.log(shop)
			shopbox=JSON.stringify(shopbox)
			sql2="insert into shopcart (_id,shopcart) values (?,?)"
			connection.query(sql2,[_id,shopbox],(err2,result2)=>{
				if (err2) {
					console.log("select error", err2.message);
				}
				
			})
		}else{
			var a=0
			var shop1=result[0].shopcart
		shop1=JSON.parse(shop1)
		// console.log(shop1)
		for(var i in shop1){
			if(shop1[i].shopid==shop.shopid){
				shop1[i].count++
				a=1
				break;
			}else{
				a=0
			}
		}
		if(a==0){shop1.push(shop)}
		
		// shop1.push(shop)
			console.log(shop1)
			var sql3="update shopcart set shopcart =? where _id=?"
			shop1=JSON.stringify(shop1)
			connection.query(sql3,[shop1,_id],(err3,result3)=>{
				if (err3) {
					console.log("select error", err3.message);
				}
			})
		}
		
	})
			
	})
});
app.post('/updatelike',(req,res)=>{
    var id=req.body.id;
    // console.log(id)
    var sql ="select * from helpcommunity where id=" + id;
    connection.query(sql,(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        // 
        // console.log(result[0].likestatus)
        if (result[0].likestatus == 0) {
            result[0].likestatus = 1
            var a = result[0].likestatus
            result[0].likecount += 1
            var b = result[0].likecount
        } else {
            result[0].likestatus = 0
            var a = result[0].likestatus
            result[0].likecount -= 1
            var b = result[0].likecount
            
        }
        console.log(a,b)
        var sql1 = 'update helpcommunity set likestatus=?,likecount=? where id=?';
        connection.query(sql1,[a,b,id],(error,result1)=>{
            if(error){
                console.log("select error",error.message);
            }
            // console.log(result1)
            // res.json(result1)
        })
    })
    connection.query(sql,(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        console.log(result)
        res.json(result)
    })
});
app.post('/community',(req,res)=>{
    var sql="select * from helpcommunity order by creattime desc";
    connection.query(sql,(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        console.log(result)
        res.json(result)
    })
});
app.post('/addcom',(req,res)=>{
    console.log(req.body)
    var title = req.body.content
	var _id=req.body._id
    var nickname =req.body.nickname
	var headSculpture=req.body.headSculpture
    var imgs=JSON.stringify(req.body.imgs)
    var createtime =new Date
    var address = req.body.address
    var likestatus = req.body.likestatus
    var likecount = req.body.likecount
    // console.log(imgs);
    var sql ="insert into helpcommunity (_id,nickname,headSculpture,imgurls,creattime,address,title,likestatus,likecount) values (?,?,?,?,?,?,?,?,?)"
    connection.query(sql,[_id,nickname,headSculpture,imgs,createtime,address,title,likestatus,likecount],(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        // console.log(result)
        // res.json(result)
    })
});
app.post('/addvideo',(req,res)=>{
    // console.log(req.body)
	var title = req.body.content
	var _id=req.body._id
	var nickname =req.body.nickname
	var headSculpture=req.body.headSculpture
	var createtime =new Date
	var address = req.body.address
	var likestatus = req.body.likestatus
	var likecount = req.body.likecount
    var videourls=JSON.stringify(req.body.video)
    // console.log(videourls);
    var sql ="insert into helpcommunity (_id,nickname,headSculpture,videourls,creattime,address,title,likestatus,likecount) values (?,?,?,?,?,?,?,?,?)"
     connection.query(sql,[_id,nickname,headSculpture,videourls,createtime,address,title,likestatus,likecount],(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        // console.log(result)
        // res.json(result)
    })
});
app.post('/update',(req,res)=>{
    var id = parseInt( req.body.id)
    console.log(typeof(id))
    var comdata =JSON.stringify(req.body.comdata)
    console.log( comdata)
    var sql = 'update helpcommunity set comdata=? where id=?';
    connection.query(sql,[comdata,id],(err,result)=>{
        
        if(err){
            console.log("select error",err.message);
        }
        // console.log(result)
        res.json(result)       
        
    })
    
});
app.post('/detail',(req,res)=>{
    var id=req.body.id;
    // console.log(id)
    var sql="select * from helpcommunity where id="+id;
    connection.query(sql,(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        console.log(result)
        res.json(result)
    })
});

app.post("/userinfo", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var sql = "select * from userinfo where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		if (result != '') {
			res.json(result)
		}
		if (result == '') {
			var username = req.body.username;
			var nickname = req.body.nickname;
			var headSculpture = req.body.headSculpture;
			var phone = req.body.phone
			console.log(phone)
			var sql1 = "insert into userinfo (_id,username,nickname,headSculpture,phone) values ('" +
				_id + "','" + username + "','" + nickname + "','" + headSculpture + "','" + phone +
				"')"
			connection.query(sql1, (error, result1) => {
				if (error) {
					console.log("select error", error.message);
				}
				console.log(result1)
				var sql2 = "select * from userinfo where _id='" + _id + "'"
				connection.query(sql2, (err1, result2) => {
					if (err1) {
						console.log("select error", err1.message);
					}
					console.log(result2)
					res.json(result2)
				})
			})

		}

	})
});
app.post('/newsdetail',(req,res)=>{
    var id=req.body.id;
    console.log(id)
    var sql="select * from news where id="+id;
    connection.query(sql,(err,result)=>{
        if(err){
            console.log("select error",err.message);
        }
        console.log(result)
        res.json(result)
    })
});
app.listen(3001, () => {
	console.log("server running at http://127.0.0.1:3001")
})
