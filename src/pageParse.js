function getOnlyXbox() {
  const articles = document.querySelectorAll('.title>a');
  const objs = [];
  articles.forEach(article => {
    const title = article.innerText.toUpperCase();
    if ((title.includes('NS') || title.includes('XBOX')) && title.includes('售')) {    
      const link = article.href;
      objs.push({ title, link });        
    }
  });
  return objs
};

module.exports = getOnlyXbox;