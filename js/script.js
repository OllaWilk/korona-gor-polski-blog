'use strict';
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  articleTags: Handlebars.compile(
    document.querySelector('#template-article-tags-link').innerHTML
  ),
  authorArticleLink: Handlebars.compile(
    document.querySelector('#template-author-article-link').innerHTML
  ),
  authorLinkList: Handlebars.compile(
    document.querySelector('#template-authorLinkList').innerHTML
  ),
};

{
  const titleClickHandler = function (e) {
    e.preventDefault();

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(select.all.articles);

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    this.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(
      select.all.activeArticles.activeArticles
    );

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

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(
      select.all.articles + customSelector
    );

    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(
        select.article.title
      ).innerHTML;

      /* create HTML of the link */
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
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

  generateTitleLinks();

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const allArticles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of allArticles) {
      /* find tags wrapper */
      const tagList = article.querySelector(select.article.tags);
      tagList.innerHTML = '';

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        const linkHTMLData = { tag: tag };
        const linkHTML = templates.articleTags(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* [NEW] create variable for all links HTML code */
    const allTagsData = { tags: [] };

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
      });
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.tags);
    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll(`a[href^="#tag-${tag}"]`);
    /* START LOOP: for each found tag link */
    for (let tagLink of allTagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let tagLink of tagsLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  function generateAutors() {
    let allAuthors = {};
    /* find all articles */
    const allArticles = document.querySelectorAll(select.all.articles);
    /* START LOOP for every article */
    for (let article of allArticles) {
      /* find author wrapper */
      const authorWrap = article.querySelector(select.article.author);
      /* make html variable with empty string */
      let html = '';
      /* get author from data-authors attribute */
      const author = article.getAttribute('data-author');
      /* generate HTML of the link */

      const authorHTMLData = {
        author: author,
      };
      const htmlAuthor = templates.authorArticleLink(authorHTMLData);

      /* add generated code to html variable */
      html = html + htmlAuthor;

      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      /* insert HTML of all the links into the author wrapper */
      authorWrap.innerHTML = html;
    }

    /* [NEW] find list of tags in right column HANDLEBARS*/
    const allAuthorsData = { authors: [] };

    const authorList = document.querySelector(select.listOf.authors);
    for (let authorName in allAuthors) {
      allAuthorsData.authors.push({
        author: authorName,
        count: allAuthors[authorName],
        img: opts.georgiaTuxedo,
      });
    }

    authorList.innerHTML = templates.authorLinkList(allAuthorsData);
  }
  generateAutors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all author links with class active */
    const allActiveAuthorLinks = document.querySelectorAll(
      select.all.linksTo.authors
    );
    console.log(allActiveAuthorLinks);

    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of allActiveAuthorLinks) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(
      `a[href^="#author-${author}"]`
    );
    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-author="${author}"]`);
  }

  function addClickListenersToAuthors() {
    /* find link to author */
    const authorsLink = document.querySelectorAll(`${select.article.author} a`);

    const authorsAside = document.querySelectorAll(
      `${select.listOf.authors} a`
    );

    /* START LOOP: for each link */
    for (let authorLink of authorsLink) {
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }

    authorsAside.forEach((author) =>
      author.addEventListener('click', authorClickHandler)
    );
  }
  /*Get all posts */
  document
    .querySelector(select.all.allPostsBtn)
    .addEventListener('click', () => {
      generateTitleLinks();

      document
        .querySelectorAll(`a.active`)
        .forEach((e) => e.classList.remove('active'));
    });

  addClickListenersToTags();
  addClickListenersToAuthors();
}
