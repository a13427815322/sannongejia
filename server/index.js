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
app.post("/updateusername", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var username = req.body.username
	var sql = "update userinfo set username='" + username + "' where _id='" + _id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post("/updatephone", (req, res) => {
	var _id = req.body._id;
	console.log(_id)
	var phone = req.body.phone
	var sql = "update userinfo set phone='" + phone + "' where _id='" + _id + "'"
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
    var sql ="select * from helpcommunity where id=" + id+ " order by creattime desc";
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
app.post('/getdingdan',(req,res)=>{
    var _id=req.body._id;
	var status=req.body.status;
    console.log(status)
	if(status==0){
    var sql="select * from dingdan where _id='"+_id+"'" + " order by cjtime desc";
	}else{
	var sql="select * from dingdan where _id='"+_id+"' and status="+status+ " order by cjtime desc";
	}
	
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
app.post('/addressdetail', (req, res) => {
	var _id = req.body._id;
	// console.log(_id)
	var sql = "select * from address where _id='" + _id + "'"
	
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/payaddress', (req, res) => {
	var id = req.body.id;
	// console.log(_id)
	var sql = "select * from address where id='" + id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
//添加付款时间和付款信息
app.post('/addpaydata', (req, res) => {
	console.log(req.body)
	var fukuantime = new Date
	var dingdanid = req.body.dingdanid
	var phone = req.body.phone
	var sjr = req.body.sjr
	var adress = req.body.adress
	
	var sql = "update dingdan set adress=?,fukuantime=?,phone=?,sjr=?,status=2 where dingdanid=?"
	connection.query(sql,[adress,fukuantime,phone,sjr,dingdanid],(err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		console.log(result)
		res.json(result)
	})
});
app.post('/addaddress',(req,res)=>{
	var _id = req.body._id
	var sjr = req.body.sjr
	var useraddress = req.body.useraddress
	var phone = req.body.phone
	// console.log(_id)
	// console.log(useraddress)
	var sql = "insert into address (_id,useraddress,phone,sjr) values (?,?,?,?)"
	connection.query(sql,[_id,useraddress,phone,sjr],(err,result)=>{
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/updateadddetail', (req, res) => {
	var id = req.body.id;
	// console.log(_id)
	var sql = "select * from address where id='" + id + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/getadmin', (req, res) => {
	var status = req.body.status;
	// console.log(_id)
	var sql = "select * from dingdan where status=" + status
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/pingjia', (req, res) => {
	var dingdanid=req.body.dingdanid
	var shopid=req.body.shopid
	var pingjia=JSON.stringify(req.body.pingjia) 
	// console.log(dingdanid,shopid,pingjia)
	var sql = 'update shop set pingjia=? where shopid=?';
	connection.query(sql,[pingjia,shopid],(err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
	var sql1='select shopcart from dingdan where dingdanid='+dingdanid
		connection.query(sql1,(err1, result1) => {
			if (err1) {
				console.log("select error", err.message);
			}
			result1=JSON.parse(result1[0].shopcart)
			// console.log(result1)
			var all=1
			for(var i in result1){
				if(result1[i].shopid==shopid){
					result1[i].pinglunzhuantai=1
					
				}
			}
			for(var j in result1){
				if(result1[j].pinglunzhuantai==0){
					all=0
				}
			}
			if(all!=0){
				var sql4='update dingdan set status=5 where dingdanid='+dingdanid
				connection.query(sql4,(err4, result4) => {
					if (err4) {
						console.log("select error", err4.message);
					}
					})
			}
			// console.log(all)
			// console.log(result1)
			result1=JSON.stringify(result1)
			var sql2='update dingdan set shopcart=? where dingdanid=?'
		connection.query(sql2,[result1,dingdanid],(err2, result2) => {
			if (err2) {
				console.log("select error", err2.message);
			}
			res.json(result2)
			})
			})
	})
});
app.post('/fahuo', (req, res) => {
	var dingdanid = req.body.dingdanid;
	// console.log(_id)
	var fahuotime=new Date
   var sql = 'update dingdan set status=?,fahuotime=? where dingdanid=?';
    connection.query(sql,[3,fahuotime,dingdanid],(err,result)=>{
        
        if(err){
            console.log("select error",err.message);
        }
        // console.log(result)
          var sql2 = "select * from dingdan where status=2" 
          connection.query(sql2, (err1, result1) => {
          	if (err1) {
          		console.log("select error", err1.message);
          	}
          	// console.log(result)
          	res.json(result1)
          })
        
    })
});
app.post('/updateaddress',(req,res) => {
	var id = req.body.id
	var sjr = req.body.sjr
	var useraddress = req.body.useraddress
	var phone = req.body.phone
	console.log(req.body)
	var sql = "update address set sjr=?,useraddress=?,phone=? where id=?"
	connection.query(sql,[sjr,useraddress,phone,id],(err,result) =>{
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	});
	
});
app.post('/dingdandetail', (req, res) => {
	var dingdanid = req.body.dingdanid;
	// console.log(_id)
	var sql = "select * from dingdan where dingdanid='" + dingdanid + "'"
	connection.query(sql, (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
//删除订单
app.post('/deteledingdan', (req, res) => {
	var dingdanid = req.body.dingdanid;
	console.log(dingdanid)
	var sql ="delete from dingdan where dingdanid=?"
	connection.query(sql,[dingdanid], (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/deteleuserifo', (req, res) => {
	var _id = req.body._id;
	
	var sql ="delete from userinfo where _id=?"
	connection.query(sql,[_id], (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/shouhuo', (req, res) => {
	var dingdanid = req.body.dingdanid;
	console.log(dingdanid)
	var sql ="update dingdan set status=4 where dingdanid=?"
	connection.query(sql,[dingdanid], (err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.post('/payone', (req, res) => {
	var _id = req.body._id
	var cjtime = new Date
	var shopcart = JSON.stringify(req.body.shopcart)
	console.log(shopcart)
	var sql = "insert into dingdan (_id,status,shopcart,cjtime) values (?,?,?,?)"
	connection.query(sql,[_id,1,shopcart,cjtime],(err, result) => {
		if (err) {
			console.log("select error", err.message);
		}
		// console.log(result)
		res.json(result)
	})
});
app.listen(3001, () => {
	console.log("server running at http://127.0.0.1:3001")
})
