var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.isnot = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('isnot/isnot', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};