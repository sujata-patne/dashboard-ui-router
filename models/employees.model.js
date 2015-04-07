/**
 * Created by sujatah on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
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
        required: false
    },
    works_for:[
        {
            type: ObjectId,
            ref: 'Project',
            required: false
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
    }
})


// Default options
//var options = {indexes: null, customCollectionName: 'OrganizationHistory'}

/**
 * Hook a pre save method to hash the password
 */

EmployeesSchema.post('save', function (doc) {
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

    if(doc.billability != undefined){
        employee.billability=doc.billability;
    }
    if(doc.billable != undefined){
        employee.billable=doc.billable;
    }

    EmployeesHistory.createEmployeesHistory(employee);
})


mongoose.model('Employee',EmployeesSchema);
