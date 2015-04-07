/**
 * Created by sujatah on 2/5/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProjectsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    owners:[
        {
            type: ObjectId,
            ref: 'Employee',
            required: false
        }
    ],
    belong_to:{
        type:ObjectId,
        ref:'Organization',
        required: false
    },
    total_num_people:{
        type:Number,
        required: true
    },
    billable_headcount:{
        type:Number,
        required:true
    },
    bench_strength:{
        type:Number,
        required:true
    },
    updated_by:{
        type: ObjectId,
        ref: 'Employee',
        required: false
    }

});

/**
 * Hook a pre save method to hash the password
 */

ProjectsSchema.post('save', function (doc) {
    var ProjectsHistory = require('../controllers/projects.history.controller.js');
    var project = [];
    if(doc._id != undefined){
        project.ref=doc._id;
    }
    if(doc.name != undefined){
        project.name = doc.name;
    }

    if(doc.belong_to != undefined){
        project.belong_to = doc.belong_to;
    }
    if(doc.owners != undefined) {
        project.owners = [];
        var owners = doc.owners;
        owners.forEach(function (ownerData, index) {
            project.owners.push(ownerData);
        })
    }
    if(doc.total_num_people != undefined){
        project.total_num_people=doc.total_num_people;
    }
    if(doc.billable_headcount != undefined){
        project.billable_headcount=doc.billable_headcount;
    }
    if(doc.bench_strength != undefined){
        project.bench_strength=doc.bench_strength;
    }

    ProjectsHistory.createProjectHistory(project);
})

mongoose.model('Project',ProjectsSchema);
