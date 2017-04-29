export const TOCBOT_SCRIPT = {
  src: 'static/js/tocbot.js'
}

export const TOCBOT_INIT = {
  dependencies: [TOCBOT_SCRIPT],
  html: `
  tocbot.init({
    tocSelector: '.js-toc',
    contentSelector: '.js-toc-content',
    headingSelector: 'h1, h2, h3',
    positionFixedSelector: '.js-toc',
    smoothScrollOptions: {
      easing: 'easeInOutCubic',
      offset: 0,
      callback: function(anchor, toggle) { console.log(anchor, toggle) },
      speed: 300 // animation duration.
    },
  });
  `
}

export const MARKED_SCRIPT = {
  src: 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.js'
}

export const TRY_IT_INIT = {
  dependencies: [MARKED_SCRIPT],
  html: `
  // Try it out
  var markdownEl = document.querySelector('#try-it-markdown');
  var tryItReset = document.querySelector('#try-it-reset');
  var tryItCheckbox = document.querySelector('#try-it-checkbox');
  var contentEl = document.querySelector('.js-toc-content');

  var contentBackup = document.createElement('div');
  contentBackup.id = 'content-backup';
  contentBackup.innerHTML = contentEl.innerHTML;

  markdownEl.addEventListener('change', function(event) {
    var markdown = event.target.value;
    contentEl.innerHTML = marked(markdown);
    tocbot.refresh();
  });

  tryItReset.addEventListener('click', function(event) {
    tryItCheckbox.checked = false;
    contentEl.innerHTML = contentBackup.innerHTML;
    tocbot.refresh();
  });
  `
}

export const GA_INIT = {
  html: `
  (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
  function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
  e=o.createElement(i);r=o.getElementsByTagName(i)[0];
  e.src='https://www.google-analytics.com/analytics.js';
  r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
  ga('create','UA-76620957-1','auto');ga('send','pageview');
  `
}
