import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Hero from './Hero'
import Tocbot from './Tocbot'
import TryIt from './TryIt'
import Tracking from './Tracking'

function Template(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css" />
        <link rel="stylesheet" href="/static/css/tocbot.css" />
        <link rel="stylesheet" href="/static/css/styles.css" />
      </Head>
      <main>
        <Hero
          title={props.title}
          subtitle={props.subtitle}
          user={props.user}
          repo={props.repo}
          topLinks={props.topLinks}
        />

        <div className="mw7 center dark-gray lh-copy">
          <input id="toc" type="checkbox" className="dn" />
          <label className="toc-icon relative z-2 f6 lh-solid bg-near-white b--silver pa1 ma1 ba br1" htmlFor="toc">
            Menu
          </label>
          <nav className="toc toc-right js-toc relative z-1 transition--300 absolute pa4"></nav>
          <div className="content js-toc-content pa4"
            dangerouslySetInnerHTML={{ __html: props.bodyHtml }}>
          </div>

          <Tocbot />
        </div>
        <TryIt />
        <Tracking />
      </main>
    </div>
  )
}

Template.defaultProps = {
  title: ''
}

Template.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  bodyHtml: PropTypes.string.isRequired
}

export default Template
