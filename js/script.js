'use strict';
{
  const titleClickHandler = function (e) {
    e.preventDefault();

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(opt.articleSelector);

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    this.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(opt.activeArticles);

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const activleSelector = this.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(activleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  function generateTitleLinks() {
    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(opt.articleSelector);

    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      /* insert link into titleList */
      html = html + linkHTML;
      // titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
    titleList.innerHTML = html;
    const links = [...document.querySelectorAll('.titles a')];

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  function generateTags() {
    /* find all articles */
    const allArticles = [...document.querySelectorAll(opt.articleSelector)];
    /* START LOOP: for every article: */
    for (let article of allArticles) {
      /* find tags wrapper */
      const titleList = article.querySelectorAll(opt.articleTagsSelector);
      console.log(titleList);
      /* make html variable with empty string */
      let html = '';
    }

    /* make html variable with empty string */
    /* get tags from data-tags attribute */
    /* split tags into array */
    /* START LOOP: for each tag */
    /* generate HTML of the link */
    /* add generated code to html variable */
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article: */
  }

  generateTags();

  generateTitleLinks();
}
