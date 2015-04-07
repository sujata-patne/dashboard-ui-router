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
})

// Default options
//var options = {indexes: null, customCollectionName: 'OrganizationHistory'}

/**
 * Hook a pre save method to hash the password
 */

OrganizationsSchema.post('save', function (doc) {
    var OrganizationHistory = require('../controllers/organizations.history.controller.js');
    var organization = [];
    var items = [];
    if(doc._id != undefined){
        organization.ref=doc._id;
    }

    if(doc.name != undefined){
        organization.name=doc.name;
    }
    if(doc.owners != undefined) {
        organization.owners = [];
        var owners = doc.owners;
        owners.forEach(function (ownerData, index) {
            items.push({type: "owner", value: ownerData});
        })
    }
    if(doc.projects != undefined) {
        organization.projects = [];
        var projects = doc.projects;
        projects.forEach(function (projectData, index) {
            items.push({type: "project", value: projectData});
        })
    }

    items.forEach(function (item) {
        if (item.type === 'owner') {
            organization.owners.push(item.value);
        }
        if (item.type === 'project') {
            organization.projects.push(item.value);
        }
    });

    if(doc.total_num_people != undefined){
        organization.total_num_people=doc.total_num_people;
    }
    if(doc.billable_headcount != undefined){
        organization.billable_headcount=doc.billable_headcount;
    }
    if(doc.bench_strength != undefined){
        organization.bench_strength=doc.bench_strength;
    }

    //Organization.countEmpByOrgID(doc._id);
    OrganizationHistory.createOrganizationHistory(organization);
})

mongoose.model("Organization",OrganizationsSchema);
