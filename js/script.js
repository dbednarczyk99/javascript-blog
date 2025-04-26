//document.getElementById('test-button').addEventListener('click', function(){
//    const links = document.querySelectorAll('.titles a');
//    console.log('links:', links);
//  });

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
  const articleSelector = clickedElement.getAttribute('href');
  //console.log('articleSelector: ', articleSelector);  

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log("Article: ", targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/* ZADANIE 5.4 */
const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles',
optArticleTagsSelector = '.post-tags .list',
optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  //console.log('generateTitleLinks running!');

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log(titleList);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */
  let articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* [DONE] make html variable with empty string */
  let html = '';

  /* [DONE] for each article */
  //const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */  /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
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
  /* [DONE] find all articles */
  let articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

    /* [DONE] find tags wrapper */
    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);

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

    /* [DONE] END LOOP: for each tag */    
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    articleTagsWrapper.insertAdjacentHTML("afterbegin", html);

  /* [DONE] END LOOP: for every article: */
  }

  /* [DONE] addClickListenersToTagss */

  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');

  /* [DONE] START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

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
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
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
  const activeTags2 = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log("Aktywne Tagi: ",activeTags2);
}

/* ZADANIE 6.2 */
function generateAuthors(){
  /* [DONE] find all articles */
  let articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

    /* [DONE] find author wrapper */
    const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);

    let html = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    
    /* [DONE] insert HTML of all the links into the author wrapper */
    articleAuthorWrapper.insertAdjacentHTML("afterbegin", html);

  /* [DONE] END LOOP: for every article: */
  }
  
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
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
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
  //const activeAuthors2 = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log("Aktywne Tagi: ",activeAuthors2);
}

generateTags();
generateTitleLinks();
generateAuthors();