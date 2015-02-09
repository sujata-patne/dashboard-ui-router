/**
 * Created by sujatah on 2/8/2015.
 */

var employees = [];
var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization'),
    Project = mongoose.model('Project'),
    Employee = mongoose.model('Employee'),
    autoIncrement = require('mongoose-auto-increment'),
    async = require('async');

//get specified employee through function
exports.employeeById=function(req,res,next,id){
    Employee.findOne({_id:id})
        .populate('works_for')
        .populate('belong_to')
        .exec(function(err,employee) {
            if(err){
                next(err);
            }
            if(employee){
                req.employee=employee;
                next();
            }else{
                console.log("Employee not found");
                res.status(400).send("Employee not found");

            }
        });
}

//get all employee list
exports.list=function(req,res,next){
    Employee.find()
        .populate('works_for')
        .populate('belong_to')
        .exec(function(err,employees) {
            if (err) {
                next(err);
            }
            res.send(employees);
        })
}

//add new employee
exports.create=function(req,res){
    var employeeData = new Employee(req.body);
    employeeData.save(function(err){
        if (err) {
            console.log("Unable to save employee.");
            console.log(err);
        } else {
            res.send(employeeData);
        }
    })
}

//retrive specified employee
exports.read=function(req,res){
    res.send(req.employee);
}

exports.delete=function(req,res){
    var employee = req.employee;
    employee.remove(function(err){
        if(err){
            console.log("Unable to remove employee");
            console.log(err);
            res.status(400).send(err.err);
        }
        else{
            res.send(employee);
        }
    })
}

exports.update=function(req,res){
    var employee = req.employee;
    var items = [];
    if(req.body.firstName != undefined){
        employee.firstName=req.body.firstName;
    }
    if(req.body.lastName != undefined){
        employee.lastName=req.body.lastName;
    }
    if(req.body.works_for != undefined) {
        employee.works_for = [];
        var works_for = req.body.works_for;
        works_for.forEach(function (projectData, index) {
            items.push({type: "project", value: projectData});
        })
    }
    if(req.body.belong_to != undefined) {
        employee.belong_to = [];
        var belong_to = req.body.belong_to;
        belong_to.forEach(function (organizationData, index) {
            items.push({type: "organization", value: organizationData});
        })
    }

    items.forEach(function (item) {
        if (item.type === 'project') {
            employee.works_for.push(item.value);
        }
        if (item.type === 'organization') {
            employee.belong_to.push(item.value);
        }
    });

    if(req.body.skills != undefined){
        employee.skills=req.body.skills;
    }
    if(req.body.year_exp != undefined){
        employee.year_exp=req.body.year_exp;
    }
    if(req.body.role != undefined){
        employee.role=req.body.role;
    }


    if(req.body.billability != undefined){
        employee.billability=req.body.billability;
    }
    if(req.body.billable != undefined){
        employee.billable=req.body.billable;
    }


    employee.save(function (err, employee) {
        if(err){
            console.log("Unable to save employee.");
            console.log(err);
            res.status(400).send(err.err);
        }else{
            res.send(employee);
        }
    });
}


