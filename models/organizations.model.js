/**
 * Created by sujatah on 2/5/2015.
 */
var mongoose = require('mongoose'),
    mongooseHistory = require('mongoose-history'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OrganizationsSchema = new Schema({
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
    projects:[
        {
            type:ObjectId,
            ref:'Project'
        }
    ],
    bench_strength:{
        type:Number,
        required:false
    },
    updated_by:{
        type: ObjectId,
        ref: 'Employee',
        required: false
    }
})

/**
 * Hook a pre save method to hash the password
 */
OrganizationsSchema.post('save', function (doc) {
    var OrganizationHistory = require('../controllers/organizations.history.controller.js');
    var organization = [];
    var items = [];
    organization.ref=doc._id;
    organization.name=doc.name;
    organization.owners = doc.owners;
    organization.employees = doc.employees;
    organization.projects = doc.projects;
    organization.total_num_people = doc.total_num_people;
    organization.billable_headcount = doc.billable_headcount;
    organization.bench_strength = doc.bench_strength;
    organization.updated_by =doc.updated_by;
    OrganizationHistory.createOrganizationHistory(organization);
})

mongoose.model("Organization",OrganizationsSchema);
