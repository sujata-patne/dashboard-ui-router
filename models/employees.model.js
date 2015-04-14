/**
 * Created by sujatah on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    mongooseHistory = require('mongoose-history'),
    relationship = require('mongoose-relationship'),
    ObjectId = Schema.ObjectId,
    async = require('async');

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

/**
 * Hook a pre save method to hash the password
 */
EmployeesSchema.post('remove', function(next) {
    var doc = this;

    var Emp = require('../controllers/employees.controller.js');
    var Org = require('../controllers/organizations.controller.js');
    var Proj = require('../controllers/projects.controller.js');
    var count, billable;
    Emp.totalOrgHeadcount(doc.belong_to, function(items){
        Org.modify(items);
    });
    doc.works_for.forEach(function(project){
        Emp.totalProjHeadcount(project, function(items){
            Proj.modify(items);
        })
    });
});

EmployeesSchema.post('save', function (doc) {

    var Emp = require('../controllers/employees.controller.js');
    var Org = require('../controllers/organizations.controller.js');
    var Proj = require('../controllers/projects.controller.js');
    var EmployeesHistory = require('../controllers/employees.history.controller.js');
    var employee = [];

    employee.ref=doc._id;
    employee.firstName=doc.firstName;
    employee.lastName=doc.lastName;
    employee.works_for = doc.works_for;
    employee.belong_to=doc.belong_to;
    employee.skills=doc.skills;
    employee.year_exp=doc.year_exp;
    employee.role=doc.role;
    employee.gender=doc.gender;
    employee.billability=doc.billability;
    employee.billable=doc.billable;
    async.parallel([
        function(callback) {
            Emp.totalOrgHeadcount(employee.belong_to, function(items){
                Org.modify(items);
            });
            callback(false);
        },
        function(callback) {
            var works_for = employee.works_for;
            works_for.forEach(function (project) {
                Emp.totalProjHeadcount(project, function (items) {
                    Proj.modify(items);
                })
            });
            callback(false);
        }
    ]);

    EmployeesHistory.createEmployeesHistory(employee);
})

EmployeesSchema.plugin(relationship, {relationshipPathName:['belong_to','works_for']});
/*var options = {customCollectionName: "employeeshistory"}
EmployeesSchema.plugin(mongooseHistory, options)*/

mongoose.model('Employee',EmployeesSchema);
