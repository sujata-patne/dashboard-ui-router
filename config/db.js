/**
 * Created by sujatah on 2/5/2015.
 */
var env = process.env.ENV || 'dev';

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect(config.db,
        function(err) {
            if (err) {
                console.log('Could not connect to MongoDB');
                console.log(err);
            }
        });
    require('../models/employees.model.js');
    require('../models/projects.model.js');
    require('../models/organizations.model.js');
    require('../models/organization.history.model.js');
    require('../models/projects.history.model.js');
    require('../models/employees.history.model.js');
    return db;
}
