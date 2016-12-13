
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('onlineCalc', { title: 'Online Calculator' });
};