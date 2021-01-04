const fs = require('fs');
const path = require('path');

const Logger = require('../functions/logger');

/**
 * Check if user exists
 * @constructor
 * @param {string} userid - ID of the user.
 * @returns {Boolean}
 */

const checkUserExists = (userid) => {
    if(fs.existsSync(path.join(process.cwd(), global.config.static_folder_name, userid))) {
            // Check if users exists in db
            Logger.addNewUserDb(userid)
        return true
    }else{
        return false
    }
}


/**
 * Check if file exists
 * @constructor
 * @param {string} userid - userid.
 * @param {string} filepath - pathname.
 * @returns {Boolean}
 */

const checkFileExists = (userid, filepath) => {
    if(fs.existsSync(path.join(process.cwd(), global.config.static_folder_name, userid, filepath))) {
        return true
    }else{
        return false
    }
}

module.exports = {
    checkUserExists,
    checkFileExists
}