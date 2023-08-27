const Project = require('../models/project');
const Update = require('../models/updates');
const Comment = require('../models/comments');
const Material = require('../models/materials');

// Require the add projects model
module.exports.add_project = function(req, res){
    return res.render('add_project', {
        title: "New Project",
        builder: req.user.company
    });
}

// Create a new project
module.exports.new_project = function(req, res){
    
    Project.uploadedAvatar(req, res, function(err){
        if(err) {console.log('Multer Error: ', err);}
        
        // console.log(req.body);
        Project.create({
            name: req.body.name,
            budget: req.body.budget,
            client: req.body.client,
            builder: req.body.builder,
            description: req.body.description,
            avatar: Project.avatarPath + '/' + req.file.filename
        });
    });

    req.flash('success', 'Project added successfully!');
    return res.redirect('/');
}

// Rendering the Portfolio Page
module.exports.portfolio = async function(req, res){
    try{
        let project;
        // Check if builder is logged in
        if(req.user.role == 'builder'){
            project = await Project.find({
                $or: [
                    { builder: req.user.company },
                    { builder: req.user.username },
                    { builder: req.user.name }
                ]
            }).exec();
        }

        // Check if client is logged in
        if(req.user.role == 'client'){
            project = await Project.find({
                $or: [
                    { client: req.user.company },
                    { client: req.user.username },
                    { client: req.user.name }
                ]
            }).exec();
        }

        return res.render('portfolio', {
            title: "Portfolio",
            projects: project,
        });

    } catch (err) {
        console.log('Error in finding the projects: ', err);
        return;
    }
    
}

// Individual Project Discription for Client from Builder
module.exports.project_disc = async function(req, res){
    try {
        
        let project = await Project.findById(req.params.id);
        let updates = await Update.find({project_name: project.name, mode: 'private'});
        let comments = await Comment.find({project: req.params.id, mode: 'private'})
            .sort('-createdAt')
            .populate('user', 'name role');

        return res.render('project', {
            title: project.name,
            mode: 'private',
            project: project,
            comments: comments,
            updates: updates
        });
    } catch (error) {
        console.log('Error while fetching the project: ', error);
        return res.redirect('back');
    }
    
}

// Material Management

// Rendering the Material Management Page
module.exports.material_management = async function(req, res){

    try {
        
        let materials = await Material.find({}).sort('-createdAt');
        
        return res.render('material_management', {
            title: "Material Management",
            materials: materials
        });

    } catch (error) {
        console.log('Error while fetching the materials: ', error);
        return res.redirect('back');
    }

}

// Add Material
module.exports.add_material = async function(req, res){
    try {
        
        await Material.create({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
            amount: parseFloat(req.body.quantity) * parseFloat(req.body.price)
        });

        req.flash('success', 'Material added successfully!');
        return res.redirect('back');

    } catch (error) {
        console.log('Error while adding the material: ', error);
        return res.redirect('back');
    }
}