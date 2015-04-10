/**
 * Created by sujatah on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship'),
    ObjectId = Schema.ObjectId;

var EmployeesSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    skills:[
        {
            name:String
        }
    ],
    year_exp:{
        type:Number,
        required:true
    },
    belong_to:{
        type: ObjectId,
        ref: 'Organization',
        childPath:'employees'
    },
    works_for:[
        {
            type: ObjectId,
            ref: 'Project',
            childPath: 'employees'
        }
    ],
    billability:{
        type:Number,
        required:false,
        default:0
    },
    billable:{
        type:Boolean
    },
    role:{
      type:String,
      required:true
    },
    gender:{
        type:String,
        required:true
    }
})


// Default options
//var options = {indexes: null, customCollectionName: 'OrganizationHistory'}

/**
 * Hook a pre save method to hash the password
 */
/*
EmployeesSchema.post('save', function (doc) {
    var Organization = require('../controllers/organizations.controller.js');

})
*/
EmployeesSchema.post('remove', function(next) {
    var doc = this;
    var Emp = require('../controllers/employees.controller.js');
    var Org = require('../controllers/organizations.controller.js');
    var Proj = require('../controllers/projects.controller.js');
    var count, billable;
    Emp.totalOrgHeadcount(doc.belong_to, function(items){
        //console.log(items);
        Org.modify(items);
    });
    doc.works_for.forEach(function(project){
        Emp.totalProjHeadcount(project, function(items){
            //console.log(items);
            Proj.modify(items);
        })
    });
});
EmployeesSchema.post('save', function (doc) {

    var Emp = require('../controllers/employees.controller.js');
    var Org = require('../controllers/organizations.controller.js');
    var Proj = require('../controllers/projects.controller.js');
    var count, billable;
    Emp.totalOrgHeadcount(doc.belong_to, function(items){
        //console.log(items);
        Org.modify(items);
    });
    doc.works_for.forEach(function(project){
        Emp.totalProjHeadcount(project, function(items){
            //console.log(items);
            Proj.modify(items);
        })
    });

    var EmployeesHistory = require('../controllers/employees.history.controller.js');
    var employee = [];
    var items = [];

    if(doc._id != undefined){
        employee.ref=doc._id;
    }
    if(doc.firstName != undefined){
        employee.firstName=doc.firstName;
    }
    if(doc.lastName != undefined){
        employee.lastName=doc.lastName;
    }

    if (doc.works_for != undefined) {
        employee.works_for = [];
        var works_for = doc.works_for;
        works_for.forEach(function (projectData, index) {
            employee.works_for.push(projectData);
        })
    }
    if (doc.belong_to != undefined) {
        employee.belong_to=doc.belong_to;
    }

    if(doc.skills != undefined){
        employee.skills=doc.skills;
    }
    if(doc.year_exp != undefined){
        employee.year_exp=doc.year_exp;
    }
    if(doc.role != undefined){
        employee.role=doc.role;
    }
    if(doc.gender != undefined){
        employee.gender=doc.gender;
    }
    if(doc.billability != undefined){
        employee.billability=doc.billability;
    }
    if(doc.billable != undefined){
        employee.billable=doc.billable;
    }

    EmployeesHistory.createEmployeesHistory(employee);
})

EmployeesSchema.plugin(relationship, {relationshipPathName:['belong_to','works_for']});

mongoose.model('Employee',EmployeesSchema);
