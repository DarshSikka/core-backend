const sqlite=require("sqlite3").verbose();
const db=new sqlite.Database(__dirname+"/urls.db", (err, result)=>{
    if(err) console.error(err);
    else{
        db.execute(`CREATE TABLE main(id TEXT, uri varchar(99999999999999999999999))`)
        console.log("Connected to database");
        db.all(`SELECT id FROM main`, (err, rows)=>{
            if(err) throw err;
            console.log(rows);
        })
    }
});

module.exports={
}