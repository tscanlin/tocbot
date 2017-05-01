import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Head from 'next/head'
import Hero from './Hero'
import TryIt from './TryIt'
import ScriptAdder from '../ScriptAdder'

function Template(props) {
  return (
    <div>
      <Head>
        <title>Tocbot</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css" />
        <link rel="stylesheet" href="/static/css/tocbot.css" />
        <link rel="stylesheet" href="/static/css/styles.css" />
      </Head>
      <main>
        <Hero />

        <div className="mw7 center dark-gray lh-copy">
          <input id="toc" type="checkbox" className="dn" />
          <label className="toc-icon relative z-2 f6 lh-solid bg-near-white b--silver pa1 ma1 ba br1" htmlFor="toc">
            Menu
          </label>
          <nav className="toc js-toc relative z-1 transition--300 absolute pa4"></nav>
          <div className="content js-toc-content pa4"
            dangerouslySetInnerHTML={{ __html: props.bodyHtml }}>
          </div>

          <TryIt />
        </div>
        <ScriptAdder />
      </main>
    </div>
  )
}

Template.propTypes = {
  bodyHtml: PropTypes.string.isRequired
}

export default Template
