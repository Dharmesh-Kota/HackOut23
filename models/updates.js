const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const UPDATES_PATH = path.join('/uploads/project/updates');

const updatesSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    mode: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../', UPDATES_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// static methods
updatesSchema.statics.uploadedUpdates = multer({storage: storage}).single('image');
updatesSchema.statics.updatesPath = UPDATES_PATH;

const Updates = mongoose.model('Updates', updatesSchema);

module.exports = Updates;