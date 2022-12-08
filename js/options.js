const opts = {
  tagSizes: {
    classPrefix: 'tag-size-',
    count: 5,
  },
};

const select = {
  all: {
    articles: '.post',
    activeArticles: '.posts article.active',
    activeLinks: '.titles a.active',
    allPostsBtn: '.all-posts > h2',
    linksTo: {
      tags: 'a.active[href^="#tag-"]',
      authors: 'a.active[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags ul',
    author: '.post-author',
    title: '.post-title',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags',
    authors: '.authors',
  },
};
