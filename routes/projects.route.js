/**
 * Created by sujatah on 2/9/2015.
 */
//var organizations = require('../controllers/organizations.controller');
var projects = require('../controllers/projects.controller');
//var employees = require('../controllers/employees.controller');

module.exports = function(app) {
    app.route('/api/projects')
        .get(projects.list)
        .post(projects.create);

    app.route('/api/projects/:projectID')
        .get(projects.read)
        .put(projects.update)
        .delete(projects.delete);

    app.route('/api/projects/owners/:owner')
        .get(projects.getOwners);

    app.route('/api/projects/organizations/:organization')
        .get(projects.getOrganizations);

    app.param('projectID', projects.projectById);
    app.param('owner',projects.ownersByName);
    app.param('organization',projects.organizationByName);
}
