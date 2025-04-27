/* Global constants */
const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-'
  }
}

const select ={
  all: {
    articles: '.post',
    titles: '.post-title',
    linksTo: {
      tags: 'a.active[href^="#tag-"]',
      author: 'a.active[href^="#author-"]'
    }
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author'
  },
  listOf: {
    titles: '.titles',
    tags: '.list.tags',
    authors: '.list.authors'
  }
}

function calculateTagsParams(tags){
  const object = {min: 999999, max: 0};
  for(let key in tags){
    if(tags[key] > object.max){
      object.max = tags[key];
    }
    if(tags[key] < object.min){
      object.min = tags[key];
    }
  }
  return object;
}

function calculateTagClass(count, params){
  //const scaleRange = params.max - params.min;
  //const scaleCount = (count - params.min)/scaleRange;
  //const scaledCount = Math.floor(scaleCount * opts.tagSizes.count + 1);
  //let html = '';
  //let html = opts.tagSizes.classPrefix + Math.min(opts.tagSizes.count, Math.floor((count - params.min)/(params.max - params.min) * opts.tagSizes.count + 1));
  return opts.tagSizes.classPrefix + Math.min(opts.tagSizes.count, Math.floor((count - params.min)/(params.max - params.min) * opts.tagSizes.count + 1));
}

/* ZADANIE 5.3 */
const titleClickHandler = function(event){
  //console.log('Link was clicked!');
  //console.log('titleClickHandler event: ', event);
    
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();    
  const clickedElement = this;
  //console.log('clickedElement: ', clickedElement);
  //console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const hrefSelector = clickedElement.getAttribute('href');
  //console.log('hrefSelector: ', hrefSelector);  

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(hrefSelector);
  //console.log("Article: ", targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* ZADANIE 5.4 */
function generateTitleLinks(customSelector = ''){
  //console.log('generateTitleLinks running!');

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(select.listOf.titles);
  //console.log(titleList);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */
  let articles = document.querySelectorAll(select.all.articles + customSelector);

  /* [DONE] make html variable with empty string */
  let html = '';

  /* [DONE] for each article */
  //const articles = document.querySelectorAll(select.all.articles);
  for(let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */  /* get the title from the title element */
    const articleTitle = article.querySelector(select.all.titles).innerHTML;
    
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.insertAdjacentHTML("beforeend", html);

  const links = document.querySelectorAll('.titles a');
  //console.log("Title links: ", links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  } 
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty OBJECT */
  let allTags = {};
  
  /* [DONE] find all articles */
  let articles = document.querySelectorAll(select.all.articles);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

    /* [DONE] find tags wrapper */
    const articleTagsWrapper = article.querySelector(select.article.tags);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* [DONE] split tags into array */
    const arrayArticleTags = articleTags.split(' ');
    //console.log(arrayArticleTags);

    /* [DONE] START LOOP: for each tag */
    for(let arrayArticleTag of arrayArticleTags){

      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + arrayArticleTag + '"><span>' + arrayArticleTag + '</span></a></li>';

      /* [DONE] add generated code to html variable */
      html = html + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[arrayArticleTag]){
        /* [NEW] add TAG to allTags OBJECT */
        allTags[arrayArticleTag] = 1;
      }
      else {
        allTags[arrayArticleTag]++;
      }

    /* [DONE] END LOOP: for each tag */    
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    articleTagsWrapper.insertAdjacentHTML("afterbegin", html);

  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a></li>';
    console.log(calculateTagClass(allTags[tag], tagsParams));
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.insertAdjacentHTML("afterbegin", allTagsHTML);
  //console.log("allTags: ", allTags);
  //console.log("tagList: ", tagList);

  /* [DONE] addClickListenersToTagss */

  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');
  const tagLinksList = document.querySelectorAll('.list.tags a');

  /* [DONE] START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }

   /* [DONE] START LOOP: for each link */
   for(let tagLinkList of tagLinksList){

    /* [DONE] add tagClickHandler as event listener for that link */
    tagLinkList.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  } 

}

const tagClickHandler = function(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  console.log('Tag was clicked!');

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll(select.all.linksTo.tags);
  //console.log("Aktywne Tagi: ",activeTags);

  /* [DONE] START LOOP: for each active tag link */
  for(let activeTag of activeTags){

    /* [DONE] remove class active */
    activeTag.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* [DONE] add class active */
    tagLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

  /* [DONE] check the outcome of the function */
  const activeTags2 = document.querySelectorAll(select.all.linksTo.tags);
  console.log("Aktywne Tagi: ",activeTags2);
}

/* ZADANIE 6.2 */
function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty OBJECT */
  let allAuthors = {};

  /* [DONE] find all articles */
  let articles = document.querySelectorAll(select.all.articles);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

    /* [DONE] find author wrapper */
    const articleAuthorWrapper = article.querySelector(select.article.author);

    /* [DONE] get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[articleAuthor]){
      /* [NEW] add AUTHOR to allAuthors OBJECT */
      allAuthors[articleAuthor] = 1;
    }
    else {
      allAuthors[articleAuthor]++;
    }

    let html = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    
    /* [DONE] insert HTML of all the links into the author wrapper */
    articleAuthorWrapper.insertAdjacentHTML("afterbegin", html);

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(select.listOf.authors);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] +' )</span></a></li>';
  }
  console.log(allAuthors);

  authorList.insertAdjacentHTML("afterbegin", allAuthorsHTML);
  /* [DONE] addClickListenersToAuthors */

  /* [DONE] find all links to authors */
  const authorLinks = document.querySelectorAll('.post-author a');
  //console.log("Author links: ",authorLinks);

  /* [DONE] START LOOP: for each link */
  for(let authorLink of authorLinks){

    /* [DONE] add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* [DONE] END LOOP: for each link */
  } 

  /* [DONE] find all links to authors */
  const authorLinksList = document.querySelectorAll('.list.authors a');

  /* [NEW] START LOOP: for each link */
  for(let authorLink of authorLinksList){

    /* [NEW] add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* [NEW] END LOOP: for each link */
  } 
}

const authorClickHandler = function(event){

  /* [DONE] prevent default action for this event */
  event.preventDefault();
  console.log('Author was clicked!');

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* [DONE] find all author links with class active */
  const activeAuthors = document.querySelectorAll(select.all.linksTo.author);
  console.log("Aktywne authors: ",activeAuthors);

  /* [DONE] START LOOP: for each active author link */
  for(let activeAuthor of activeAuthors){

    /* [DONE] remove class active */
    activeAuthor.classList.remove('active');

  /* [DONE] END LOOP: for each active author link */
  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log("authorLinks: ", authorLinks);

  /* [DONE] START LOOP: for each found author link */
  for(let authorLink of authorLinks){

    /* [DONE] add class active */
    authorLink.classList.add('active');

  /* [DONE] END LOOP: for each found autor link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

  /* [DONE] check the outcome of the function */
  //const activeAuthors2 = document.querySelectorAll(select.all.linksTo.author);
  //console.log("Aktywne Tagi: ",activeAuthors2);
}

generateTags();
generateTitleLinks();
generateAuthors();