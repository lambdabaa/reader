
/*
 * GET home page.
 */

exports.index = function(req, resp) {
  resp.render('index', { title: 'Reader' });
};
