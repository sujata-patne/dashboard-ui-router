/**
 * Created by sujatah on 2/5/2015.
 */
module.exports = function(app){
    require('../routes/organizations.route')(app);
    require('../routes/projects.route')(app);
    require('../routes/employees.route')(app);

    app.use('/api/organizations/*', function(req,res,next){
        res.status(404).json({"error":"No such service present"});
    })

    app.use('*', function(req,res,next){
        res.status(404).send('<html><body><h1>404 Page Not Found</h1></body></html>');
    })
}
