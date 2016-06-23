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
  method with the parameter of ctx.articles.*/
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
  Then the next() callback function is envoked. the next() is articleController.index method which envokes the articleView.index
  method with the parameter of ctx.articles.
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
  method which envokes the articleView.index method with the parameter of ctx.articles.*/
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
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
