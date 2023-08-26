const Project = require('../models/project');
const Update = require('../models/updates');

// Project Updates
module.exports.update = async function(req, res){
    try{
        Update.uploadedUpdates(req, res, function(err){
            if(err) {console.log('Multer Error: ', err);}
            
            // console.log(req.body);
            Update.create({
                project_name: req.body.project_name,
                description: req.body.description,
                image: Update.updatesPath + '/' + req.file.filename
            });
        });
    
        req.flash('success', 'Project Update added successfully!');
        return res.redirect('/');
    } catch(err){
        console.log('Error', err);
        return;
    }
}