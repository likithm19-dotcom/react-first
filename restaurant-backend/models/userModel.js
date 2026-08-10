const db=require("../db");

//register new user
exports.registerUser=(data,callback)=>{
    const sql=`INSERT INTO users
    (name,email,password,phone)
    VALUES (?,?,?,?)`;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.password,
            data.phone
        ],
        callback
    );
};


//find user by email
exports.findUserByEmail=(email,callback)=>{
    const sql='select * from users where email=?';
    db.query(sql,[email],callback);
};


//find user by id
exports.findUserById=(id,callback)=>{
    const sql='select id,name,email,phone,is_verified from users where id=?';
    db.query(sql,[id],callback);
};

//backward-compatible aliases
exports.finduserByEmail=exports.findUserByEmail;
exports.finduserById=exports.findUserById;