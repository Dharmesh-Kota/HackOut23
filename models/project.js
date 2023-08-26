const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/project/avatars');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    builder: {
        type: String,
        required: true
    },
    location: {
        type: String,
        require: true
    }, 
    description: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../', AVATAR_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
})

// static methods
projectSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
projectSchema.statics.avatarPath = AVATAR_PATH;

const Project = mongoose.model('project', projectSchema);

module.exports = Project;