var db = require('./mongoCollections')
var User_DB = db.collection_user()
var Boss_DB = db.collection_boss()
var Address_DB = db.collection_address()

module.exports = {
    userSignup: function(req, res){
        var newAddress = new Address_DB({
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            sido_name: req.body.sido_name,
            sido_code: req.body.sido_code,
            sigungu_name: req.body.sigungu_name,
            sigungu_code: req.body.sigungu_code,
            dong_name: req.body.dong_name,
            dong_code: req.body.dong_code,
            address_jibun: req.body.address_jibun,
            address_road: req.body.address_road,
            building_name: req.body.building_name,
            building_dong: req.body.building_dong,
            building_ho: req.body.building_ho,
            building_stair: req.body.building_stair
        })
        newAddress.save(function(error, address){
            if(error){
                throw error;
            }
            var newUser = new User_DB({
                userId: req.body.userId, 
                password: req.body.password,
                nickname: req.body.nickname,
                age: req.body.age,
                sex: req.body.sex,
                phone: req.body.phone,
                address_id: address._id,
                ticketList: [],
                favoriteRestaurantidList: [],
                wishList: []


            })
            newUser.save(function (error, newUser) {
            if (error) { 
                throw error;
            }
                console.log("user is signed up!");
                res.json(newUser);
            });

        });

    },
    userLogin: function (req, res) {
        var userId = req.body.userId;
        var password = req.body.password;

        console.log(userId, password);
        console.log(typeof userId, typeof password);

        if(typeof userId !== "string" || typeof password !== "string"){
            res.send("fail!!");
        }
        User_DB.findOne({userId: userId, password: password}).exec((err, result) =>{
            if(result){
                res.send("login success");
            }
            else{
                res.send("login failed");
            }
        });

    },
    bossSignup: function(req, res){
        var newBoss = new Boss_DB({
            bossId: req.body.bossId, 
            password: req.body.password,
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex,
            phone: req.body.phone,
            restaurantList: []


    });
    newBoss.save(function (error, newBoss) {
        if (error) { 
            throw error;
        }
        console.log("boss is signed up!");
        res.json(newBoss);
      });
    },
    bossLogin: function (req, res) {
        var bossId = req.body.bossId;
        var password = req.body.password;

        console.log(bossId, password);
        console.log(typeof bossId, typeof password);

        if(typeof bossId !== "string" || typeof password !== "string"){
            res.send("fail!!");
        }
        Boss_DB.findOne({bossId: bossId, password: password}).exec((err, result) =>{
            if(result){
                res.send("login success");
            }
            else{
                res.send("login failed");
            }
        });
    },
    userDuplicate: function (req, res) {
        var uId = req.body.userId;
        console.log(uId);

        if(typeof uId !== "string"){
            res.send("fail!");
        }
        User_DB.findOne({userId: uId}).exec((err, result)=> {
            if(result){
                res.send("id is duplicated!");
            }
            else{
                res.send("id is available");
            }


        });
    },
    bossDuplicate: function(req, res) {
        var bId = req.body.bossId;
        console.log(bId);

        if(typeof bId !== "string"){
            res.send("fail!");
        }
        Boss_DB.findOne({bossId: bId}).exec((err, result)=> {
            if(result){
                res.send("id is duplicated!");
            }
            else{
                res.send("id is available");
            }
        })
    }
}
