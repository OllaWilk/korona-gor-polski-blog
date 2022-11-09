'use strict';

const links = [...document.querySelectorAll('.titles a')];


const titleClickHandler = function(e)  {
    e.preventDefault();

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for( let activeLink of activeLinks ) {
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    this.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const activleSelector = this.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(activleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

for( let link of links ) {
    link.addEventListener('click', titleClickHandler);
}