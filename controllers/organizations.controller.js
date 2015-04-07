/**
 * Created by sujatah on 2/5/2015.
 */
var organizations = [];
var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization'),
    Project = mongoose.model('Project'),
    Employee = mongoose.model('Employee'),
    autoIncrement = require('mongoose-auto-increment'),
    async = require('async');

//get specified organization through function
exports.organizationById=function(req,res,next,id){
    Organization.findOne({_id:id})
        .populate('owners')
        //.populate('projects')
        .exec(function(err,organization) {
            if(err){
                next(err);
            }
            if(organization){
                req.organization=organization;
                // console.log("Organization found " + organization);
                next();
            }else{
                console.log("Organization not found");
                res.status(400).send("Organization not found");

            }
        });
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
//get specified projects through function
exports.projectsByName=function(req,res,next,name){
    Project.find({name:new RegExp(name, 'i')})
        .exec(function(err, projects) {
            if(err){
                next(err);
            }
            if(projects){
                req.projects=res.jsonp(projects);
                next();
            }else{
                console.log("Project not found");
                res.status(400).send("Project not found");

            }
        });
}

exports.projectsByOrganization=function(req,res,next,id){
    Project.find({belong_to:id})
        .exec(function(err,projects) {
            //console.log(projects);
            if(err){
                next(err);
            }
            if(projects){
                req.projects=projects;
                next();
            }else{
                console.log("Projects not found");
                res.status(400).send("Projects not found");

            }
        });

}


//retrive specified projects
exports.getProjects=function(req,res){
    res.send(req.projects);
}

//get all organizations list
exports.list=function(req,res,next){
    Organization.find()
        .populate('owners')
        .populate('projects')
        .exec(function(err,organizations) {
            if (err) {
                next(err);
            }
            res.send(organizations);
        })
}

//add new organization
exports.create=function(req,res){
    var organizationData = new Organization(req.body);
    organizationData.save(function(err){
        if (err) {
            console.log("Unable to save organization.");
            console.log(err);
        } else {
            res.send(organizationData);
        }
    })
}

exports.delete=function(req,res){
    var organization = req.organization;
    organization.remove(function(err){
        if(err){
            console.log("Unable To remove Organization");
            console.log(err);
            res.status(400).send(err.err);
        }
        else{
            res.send(organization);
        }
    })
}
//retrive specified organization
exports.read=function(req,res){
    res.send(req.organization);
}

exports.update=function(req,res){
    var organization = req.organization;
    var items = [];
    if(req.body.name != undefined){
        organization.name=req.body.name;
    }
    if(req.body.owners != undefined) {
        organization.owners = [];
        var owners = req.body.owners;
        owners.forEach(function (ownerData, index) {
            items.push({type: "owner", value: ownerData});
        })
    }
    if(req.body.projects != undefined) {
        organization.projects = [];
        var projects = req.body.projects;
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

    if(req.body.total_num_people != undefined){
        organization.total_num_people=req.body.total_num_people;
    }
    if(req.body.billable_headcount != undefined){
        organization.billable_headcount=req.body.billable_headcount;
    }
    if(req.body.bench_strength != undefined){
        organization.bench_strength=req.body.bench_strength;
    }

    organization.save(function (err, organization) {
        if(err){
            console.log("Unable to save organization.");
            console.log(err);
            res.status(400).send(err.err);
        }else{
            res.send(organization);
        }
    });
}
