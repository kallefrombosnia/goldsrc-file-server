const router = require('express').Router();
const rateLimit = require("express-rate-limit");


const {checkUserExists, checkFileExists} = require('../functions/file');
const Logger = require('../functions/logger');


const createDownloadRequestLimiter = rateLimit({
    windowMs: global.config.time_resolution, 
    max: global.config.max_requests_in_time_resolution,
    message: global.config.error_message
});



router.get('/:userid/cstrike/:path(*)', createDownloadRequestLimiter, (req, res) =>{

    const { path, userid } = req.params;

    // Check if user dir exists
    if(checkUserExists(userid)){

        // Check if file exists in user dir
        if(checkFileExists(userid, path)){
           
            // Send download header
            res.download(`${process.cwd()}/${global.config.static_folder_name}/${userid}/${path}`, (err) => {

                // Callback error
                if(err){
                    // Path is directory or some shit happened who cares 
                    res.status(404).send();
                }else{
                    // No error finish with status logging
                    Logger.incrementAllDownloads()
                    Logger.incrementUserDownloads(userid);
                }
            })   
          
        }else{

            // User exists but file is not present in directory - log filename
            Logger.writeErrorMessage(userid, path)

            // Return 404
            res.status(404).send();
        }
    }else{

        // User directory doesnt exists  return 404
        res.status(404).send();
    }

});




module.exports = router;