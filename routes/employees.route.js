/**
 * Created by sujatah on 2/9/2015.
 */
//var organizations = require('../controllers/organizations.controller');
//var projects = require('../controllers/projects.controller');
var employees = require('../controllers/employees.controller');

module.exports = function(app) {
    app.route('/api/employees')
        .get(employees.list)
        .post(employees.create);

    app.route('/api/employees/:employeeID')
        .get(employees.read)
        .put(employees.update)
        .delete(employees.delete);

    app.route('/api/employees/projects/:projectName')
        .get(employees.getProjects);

    app.route('/api/employees/organizations/:organizationName')
       .get(employees.getOrganizations);

    app.param('employeeID', employees.employeeById);
    app.param('projectName',employees.projectsByName);
    app.param('organizationName',employees.organizationByName);


}