const Project = require('../models/project');
const Update = require('../models/updates');
const Comment = require('../models/comments');

// Project Updates
module.exports.update = function(req, res){
    // try{
        Update.uploadedUpdates(req, res, function(err){
            if(err) {console.log('Multer Error: ', err);}
            
            // console.log(req.body);
            Update.create({
                project_name: req.body.project_name,
                description: req.body.description,
                mode: req.body.mode,
                image: Update.updatesPath + '/' + req.file.filename
            });
        });
    
        req.flash('success', 'Project Update added successfully!');
        return res.redirect('/');
    // } catch(err){
    //     console.log('Error', err);
    //     return;
    // }
}

// Rendering the Community Page
module.exports.community_engagement = async function(req, res){

    let projects = await Project.find({}).exec();

    return res.render('community_engagement', {
        title: "Rodic | Community Engagement",
        projects: projects
    });
}

// Rendering the Project Discription Page
module.exports.project_disc = async function(req, res){
    try {
        
        let project = await Project.findById(req.params.id);
        let updates = await Update.find({project_name: project.name, mode: 'public'});
        let comments = await Comment.find({project: req.params.id, mode: 'public'})
            .sort('-createdAt')
            .populate('user', 'name role');

        return res.render('project', {
            title: project.name,
            mode: 'public',
            project: project,
            comments: comments,
            updates: updates
        });
    } catch (error) {
        console.log('Error while fetching the project: ', error);
        return res.redirect('back');
    }
    
}