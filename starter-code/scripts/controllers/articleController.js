(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);//don't need next as is the last method in our call chain
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*this method sets the variable articleData to a function which takes an article
  for an arugment. this function sets a property on context object called
  articles and the value of this property to the article paseed in.
  the article data function then calls the next function, passed in by loadById.
  the next() is articleController.index method which envokes the articleView.index
  method with the parameter of ctx.articles.
  Article.findWhere method filters through the database to find the matching id and
  sets the data to the params.id from the ctx object. this calls the article Data function
  described above*/
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*this method sets the variable authorData to a function which takes in the variable
  articlesByAuthor and assigns it to the articles property on the ctx object.
  Then the next() callback function is envoked. the next() is articleController.index
  method which envokes the articleView.index method with the parameter of ctx.articles.
  Article.findWhere method filters through the database to find the matching author and
  sets the data to the params.authorName (where the author name string has been edited to replace + with '')
  from the ctx object. this calls the author Data function described above
  */
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*this method sets the variable categoryData to a function which takes in the variable
  articlesInCategory and assigns it to the articles property on the ctx object.
  Then the next() callback function is envoked. the next() is articleController.index
  method which envokes the articleController.index method with the parameter of ctx.articles.
  Article.findWhere method filters through the database to find the matching category and
  sets the data to the params.category from the ctx object. this calls the categoryData function
  described above*/
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
/* The loadAll method takes the arguments ctx, next. the method sets the variable
 categoryData to a function which takes in the variable allArticles. The array of
 all the articles (Article.all) is assigned to the articles property on the
 ctx object. Then the next() callback function is envoked. The next function
 the next() is articleController.index method with the parameter of ctx.articles
 Then there is a conditional, if the array of articles contains any elements it
 sets the articles property on the ctx object to the array and calls the next function.
 if there is nothing in the array the Article.fetchAll function is called passing in
 article data.
 */
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;//assign array into ctx object
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
