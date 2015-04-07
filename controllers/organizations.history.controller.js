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