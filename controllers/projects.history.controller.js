/**
 * Created by sujatah on 4/3/2015.
 */
var tests = [];
var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    ProjectsHistory = mongoose.model('ProjectsHistory');

exports.createProjectHistory = function(data){

    var projectHistoryData = new ProjectsHistory(data);
    projectHistoryData.save(function(err){
        if (err) {
            console.log("Unable to save Project History.");
            console.log(err);
        } else {
            /*Project.count({}, function(err, c)
            {
                console.log('Count is ' + c);
            });*/
            console.log("Successfully saved Project History.");
        }
    })
}