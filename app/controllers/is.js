var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

exports.is = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('is/is', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};