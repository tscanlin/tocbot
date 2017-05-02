import React from 'react'

const GA_SCRIPT = `
  (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
  function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
  e=o.createElement(i);r=o.getElementsByTagName(i)[0];
  e.src='https://www.google-analytics.com/analytics.js';
  r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
  ga('create','UA-76620957-1','auto');ga('send','pageview');
`

export default (props) => {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: GA_SCRIPT }} />
    </div>
  )
}
