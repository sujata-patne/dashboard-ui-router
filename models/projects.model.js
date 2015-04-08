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
        required: true
    },
    billable_headcount:{
        type:Number,
        required:true
    },
    employees:[
        {
            type:ObjectId,
            ref:'Employee'
        }
    ],
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
    var items = [];
    if(doc._id != undefined){
        project.ref=doc._id;
    }
    if(doc.name != undefined){
        project.name = doc.name;
    }

    if(doc.belong_to != undefined){
        project.belong_to = doc.belong_to;
    }
    if(doc.employees != undefined) {
        project.employees = [];
        var employees = doc.employees;
        employees.forEach(function (employeeData, index) {
            items.push({type: "employee", value: employeeData});
        })
    }
    if(doc.owners != undefined) {
        project.owners = [];
        var owners = doc.owners;
        owners.forEach(function (ownerData, index) {
            items.push({type: "owner", value: ownerData});
        })
    }
    items.forEach(function (item) {
        if (item.type === 'owner') {
            project.owners.push(item.value);
        }
        if (item.type === 'employee') {
            project.employees.push(item.value);
        }
    });

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
});

ProjectsSchema.plugin(relationship, { relationshipPathName:'belong_to' });

mongoose.model('Project',ProjectsSchema);
