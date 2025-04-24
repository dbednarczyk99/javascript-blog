//document.getElementById('test-button').addEventListener('click', function(){
//    const links = document.querySelectorAll('.titles a');
//    console.log('links:', links);
//  });

/* ZADANIE 5.3 */
const titleClickHandler = function(event){
    console.log('Link was clicked!');
    console.log('event: ', event);
    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */
    event.preventDefault();    
    const clickedElement = this;
    console.log('clickedElement: ', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector: ', articleSelector);  

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log("Article: ", targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }