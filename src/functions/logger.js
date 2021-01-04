const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');


const adapter = new FileSync(`${process.cwd()}/db.json`)
const db = low(adapter);

const incrementAllDownloads = () => {
    return db.update('all_downloads', number => number + 1).write()
}

const incrementUserDownloads = (userid) => {
    return db.get('users').find({id: userid}).update('download_count', number => number + 1).write();
}

const writeErrorMessage = (userid, message) => {

    // get error array
    const value = db.get('users').find({id: userid}).value();

    if(value){

        const { errors } = value;


        if(errors.length > 0){
        

            const lastItem = [errors.length - 1]

            errors.push({time: Date.now(), error_message: message, error_code: 404});

            if(errors[lastItem].error_message !== message){
                return db.get('users').find({id: userid}).assign({errors}).write();
            }

            return
        
        }else{

            errors.push({time: Date.now(), error_message: message, error_code: 404});

            return db.get('users').find({id: userid}).assign({errors}).write();
        }
    }
    
}


const addNewUserDb = (userid) => {
    console.log(checkUserExistsDb(userid))
    return !checkUserExistsDb(userid) ? db.get('users').push({ id: userid, errors: [], download_count: 0}).write() : ''
}

const checkUserExistsDb = (userid) =>{
    return db.get('users').find({id: userid}).value() ? true : false;
}



module.exports = {
    incrementAllDownloads,
    writeErrorMessage,
    incrementUserDownloads,
    addNewUserDb
}

