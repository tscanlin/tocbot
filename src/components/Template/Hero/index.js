import React from 'react'
import Link from 'next/link'

export default (props) => {
  return (
    <div className="hero relative overflow-hidden tc z-3">
      <div className="hero-inner relative mw7 center white pv4">
        <div className="absolute top-0 right-0">
          <Link href='/'>
            <a className="dib f6 white no-underline pa1 ma1">
              About
            </a>
          </Link>
          <Link href='/changelog'>
            <a className="dib f6 white no-underline pa1 ma1">
              Changelog
            </a>
          </Link>
          <a className="dib f6 white no-underline pa1 ma1" href="https://github.com/tscanlin/tocbot">
            Github
          </a>
        </div>
        <div className="pv4">
          <h1 className="title normal ma0 pa0">
            {props.title}
          </h1>
          <h4 className="subtitle normal o-90 ma0 pa3">
            {props.subtitle}
          </h4>
          <div className="mv2 ml4">
            <iframe src="https://ghbtns.com/github-btn.html?user=tscanlin&repo=tocbot&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
