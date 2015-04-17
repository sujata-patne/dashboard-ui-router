/**
 * Created by sujatah on 4/3/2015.
 */
var tests = [];
var mongoose = require('mongoose'),
    Organization = mongoose.model('Organization'),
    OrganizationHistory = mongoose.model('OrganizationHistory');

exports.createOrganizationHistory = function(data){

    var organizationHistoryData = new OrganizationHistory(data);
    organizationHistoryData.save(function(err){
        if (err) {
            console.log("Unable to save Test History.");
            console.log(err);
        } else {

            console.log("Successfully saved Organization History.");
        }
    })
}
//retrive specified organization
exports.read=function(req,res){
    res.send(req.organization);
}

exports.getOrganizationsHistory = function(req,res,next,orgID){
    OrganizationHistory.find({ref:orgID})
        .sort({version_date: 1})
        .exec(function(err, organization) {
            if(err){
                next();
            }
            if(organization){
                req.organization=organization;
                // console.log("Organization found " + organization);
                next();
            }else{err
                console.log("Organization not found");
                res.status(400).send("Organization not found");

            }
        });
}
