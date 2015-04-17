/**
 * Created by sujatah on 2/5/2015.
 */
var organizations = require('../controllers/organizations.controller');
var organizationsHistory = require('../controllers/organizations.history.controller');

module.exports = function(app){
    app.route('/api/organizationHistory/:orgHistoryID')
        .get(organizationsHistory.read);

    app.route('/api/organizations')
        .get(organizations.list)
        .post(organizations.create);

    app.route('/api/organizations/:organizationID')
        .get(organizations.read)
        .put(organizations.update)
        .delete(organizations.delete);

    app.route('/api/organizations/owners/:owner')
        .get(organizations.getOwners);

    app.route('/api/organizations/projects/id/:organizationID')
        .get(organizations.projectsByOrganization);

    app.route('/api/organizations/projects/:project')
        .get(organizations.getProjects);

    app.param('organizationID',organizations.organizationById);
    app.param('orgHistoryID',organizationsHistory.getOrganizationsHistory);
    app.param('owner',organizations.ownersByName);
    app.param('project',organizations.projectsByName);

}
