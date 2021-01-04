const router = require('express').Router();
const low = require('lowdb')
const fs = require('fs');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(`${process.cwd()}/db.json`)
const db = low(adapter);

router.get('/info/:userid', (req,res) =>{

    const infoAll = db.get('users').find({id: req.params.userid}).value();

    return res.json({user: req.params.userid, info: infoAll ? infoAll : [] })
});



router.get('/filesize', (req,res) =>{

    const stats = fs.statSync(`${process.cwd()}/db.json`);

    return res.json({filesize: stats.size / (1024*1024) , type: 'MB'})

});



router.get('/reset', (req,res) =>{

    db.unset('users').write();

    db.set('users', []).write()

    return res.json({status: 'ok'})

});





module.exports = router;