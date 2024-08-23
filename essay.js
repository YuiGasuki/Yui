document.getElementById('first_box').remove();
    document.body.style.overflow="auto";
    var gitalk = new Gitalk({
  clientID: 'Ov23liQRR4VjYR4dXXDv',
  clientSecret: 'b6e1ceaaea554e362eee96360da7b5f1a4bd0383',
  repo: 'CommentYui',
  owner: 'yuigasuki',
  admin: ['yuigasuki'],
  id: location.pathname+"?Yui="+textp,  
  distractionFreeMode: true  // Facebook-like distraction free mode
  
 });

gitalk.render('gitalk-container');