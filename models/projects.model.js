/**
 * Created by sujatah on 2/5/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship'),
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
        childPath: 'projects'
    },
    total_num_people:{
        type:Number,
        required: false
    },
    billable_headcount:{
        type:Number,
        required:false
    },
    employees:[
        {
            type:ObjectId,
            ref:'Employee'
        }
    ],
    bench_strength:{
        type:Number,
        required:false
    },
    red_days:{
        type:Number,
        default:0
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
    project.ref=doc._id;
    project.name = doc.name;
    project.belong_to = doc.belong_to;
    project.employees = doc.employees;
    project.owners = doc.owners;
    project.total_num_people = doc.total_num_people;
    project.billable_headcount = doc.billable_headcount;
    project.bench_strength = doc.bench_strength;
    project.red_days = doc.red_days;
    project.updated_by = doc.updated_by;

    ProjectsHistory.createProjectHistory(project);
});

ProjectsSchema.plugin(relationship, { relationshipPathName:'belong_to' });

mongoose.model('Project',ProjectsSchema);
