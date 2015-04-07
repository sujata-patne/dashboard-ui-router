/**
 * Created by sujatah on 4/3/2015.
 */
var tests = [];
var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee'),
    EmployeesHistory = mongoose.model('EmployeesHistory');

exports.createEmployeesHistory = function(data){

    var employeesHistoryData = new EmployeesHistory(data);
    employeesHistoryData.save(function(err){
        if (err) {
            console.log("Unable to save Employee History.");
            console.log(err);
        } else {
            /*Employee.count({}, function(err, c)
            {
                console.log('Count is ' + c);
            });*/
            console.log("Successfully Saved Employee History.");
        }
    })
}