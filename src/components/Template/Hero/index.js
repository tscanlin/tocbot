import React from 'react'
import Link from 'next/link'

function makeGithubCounter ({ user, repo }) {
  return <iframe src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true&size=large`} frameBorder='0' scrolling='0' width='160px' height='30px' />
}

function Hero (props) {
  return (
    <div className='hero relative overflow-hidden tc z-3' style={{ backgroundColor: props.backgroundColor }}>
      <div className='hero-inner relative mw7 center white pv4'>
        <div className='absolute top-0 right-0'>
          {props.topLinks && props.topLinks.length > 0 && (
            props.topLinks.map((link, i) => {
              return link.href.indexOf('http') === 0
                ? (
                  <a
                    className='dib f6 white no-underline pa1 ma1'
                    href={link.href} key={i}
                  >
                    {link.text}
                  </a>
                  )
                : (
                  <Link href={link.href} key={i} legacyBehavior>
                    <a
                      className='dib f6 white no-underline pa1 ma1'
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </Link>
                  )
            })
          )}
        </div>
        <div className='pv4'>
          <h1 className='title normal ma0 pa0'>
            {props.title}
          </h1>
          <h4 className='subtitle normal o-90 ma0 pa3'>
            {props.subtitle}
          </h4>
          <div className='mv2 ml4'>
            {props.cta
              ? (
                  props.cta
                )
              : (
                  makeGithubCounter({
                    repo: props.repo,
                    user: props.user
                  })
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

Hero.defaultProps = {
  backgroundColor: '#54BC4B',
  topLinks: [],
  title: '',
  subtitle: '',
  cta: null,
  user: 'tscanlin',
  repo: 'tocbot'
}

export default Hero
