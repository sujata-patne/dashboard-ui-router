/**
 * Created by sujatah on 2/8/2015.
 */
var projects = [];
var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization'),
    Project = mongoose.model('Project'),
    Employee = mongoose.model('Employee'),
    autoIncrement = require('mongoose-auto-increment'),
    async = require('async');


//get specified project through function
exports.projectById=function(req,res,next,id){
  Project.findOne({_id:id})
    .populate('owners')
    .populate('belong_to')
    .exec(function(err,project) {
        if(err){
            next(err);
        }
        if(project){
            req.project=project;
            next();
        }else{
            console.log("Project not found");
            res.status(400).send("Project not found");

        }
    });
}

//get all projects list
exports.list=function(req,res,next){
    Project.find()
        .populate('owners')
        .populate('belong_to')
        .exec(function(err,projects) {
            if (err) {
                next(err);
            }
            res.send(projects);
        })
}

//add new project
exports.create=function(req,res){

    if(req.body.belong_to != undefined){
        req.body.belong_to=req.body.belong_to._id;
    }
    var projectData = new Project(req.body);

    projectData.save(function(err){
        if (err) {
            console.log("Unable to save project.");
            console.log(err);
        } else {
            console.log(projectData);
            res.send(projectData);
        }
    })
}

//retrive specified project
exports.read=function(req,res){
    res.send(req.project);
}
//get specified owners through function
exports.ownersByName=function(req,res,next,name){
    Employee.find({firstName:new RegExp(name, 'i')})
        .exec(function(err, owners) {
            if(err){
                next(err);
            }
            if(owners){
                req.owners=res.jsonp(owners)
                next();
            }else{
                console.log("Employee not found");
                res.status(400).send("Employee not found");

            }
        });
}
//retrive specified owners
exports.getOwners=function(req,res){
    res.send(req.owners);
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
exports.delete=function(req,res){
    var project = req.project;
    project.remove(function(err){
        if(err){
            console.log("Unable to remove project");
            console.log(err);
            res.status(400).send(err.err);
        }
        else{
            res.send(project);
        }
    })
}

exports.update=function(req,res){
    var project = req.project;

    if(req.body.name != undefined){
        project.name=req.body.name;
    }
    if(req.body.belong_to != undefined){
        project.belong_to=req.body.belong_to._id;
    }
    if(req.body.owners != undefined) {
        project.owners = [];
        var owners = req.body.owners;
        owners.forEach(function (ownerData, index) {
            project.owners.push(ownerData);
        })
    }

    if(req.body.total_num_people != undefined){
        project.total_num_people=req.body.total_num_people;
    }
    if(req.body.billable_headcount != undefined){
        project.billable_headcount=req.body.billable_headcount;
    }
    if(req.body.bench_strength != undefined){
        project.bench_strength=req.body.bench_strength;
    }

    project.save(function (err, project) {
        if(err){
            console.log("Unable to save project.");
            console.log(err);
            res.status(400).send(err.err);
        }else{
            res.send(project);
        }
    });
}


