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

    if(req.body.belong_to != undefined){
        req.body.belong_to=req.body.belong_to._id;
    }
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

exports.update=function(req,res) {
    var employee = req.employee;
    var items = [];
    if (req.body.firstName != undefined) {
        employee.firstName = req.body.firstName;
    }
    if (req.body.lastName != undefined) {
        employee.lastName = req.body.lastName;
    }
    if (req.body.works_for != undefined) {
        employee.works_for = [];
        var works_for = req.body.works_for;
        works_for.forEach(function (projectData, index) {
            employee.works_for.push(projectData);
        })
    }
    if (req.body.belong_to != undefined) {
        employee.belong_to=req.body.belong_to._id;
    }

    if (req.body.skills != undefined) {
        employee.skills = req.body.skills;
    }
    if (req.body.year_exp != undefined) {
        employee.year_exp = req.body.year_exp;
    }
    if (req.body.role != undefined) {
        employee.role = req.body.role;
    }


    if (req.body.billability != undefined) {
        employee.billability = req.body.billability;
    }
    if (req.body.billable != undefined) {
        employee.billable = req.body.billable;
    }


    employee.save(function (err, employee) {
        if (err) {
            console.log("Unable to save employee.");
            console.log(err);
            res.status(400).send(err.err);
        } else {
            res.send(employee);
        }
    });
}
//get specified projects through function
    exports.projectsByName=function(req,res,next,name){
        Project.find({name:new RegExp(name, 'i')})
            .exec(function(err, projects) {
                if(err){
                    next(err);
                }
                if(projects){
                    req.projects=projects;
                    next();
                }else{
                    console.log("Project not found");
                    res.status(400).send("Project not found");

                }
            });
    }


//retrive specified projects
    exports.getProjects=function(req,res){
        res.send(req.projects);
    }

    //get specified owners through function
    exports.organizationByName=function(req,res,next,name){
        Organization.find({name:new RegExp(name, 'i')})
            .exec(function(err, organizations) {
                if(err){
                    next(err);
                }
                if(organizations){
                    req.belong_to=organizations
                    next();
                }else{
                    console.log("Organization not found");
                    res.status(400).send("Organization not found");

                }
            });
    }
//retrive specified owners
    exports.getOrganizations=function(req,res){
        res.send(req.belong_to);
    }



