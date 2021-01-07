import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Hero from './Hero'
import Tocbot from './Tocbot'
import Tracking from './Tracking'
import pkg from '../../../package.json'

function Template (props) {
  return (
    <div className='page-content'>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {props.stylesheets && props.stylesheets.length > 0 && props.stylesheets.map((stylesheet, i) => {
          return <link key={i} rel='stylesheet' href={stylesheet} />
        })}
        <style>{'.page-content {display:none}'}</style>
      </Head>
      <main>
        <Hero
          title={props.title}
          subtitle={props.subtitle}
          user={props.user}
          repo={props.repo}
          topLinks={props.topLinks}
        />

        {/* Fixed header component that hides behind the hero until scrolling down the page. */}
        <div className='fixed-header fixed w-100 top-0 left-0 pv2 z-2' style={{ backgroundColor: '#54BC4B' }}>
          <div className='ph4 mw7 center white'>
            <a className='white no-underline' href='https://github.com/tscanlin/tocbot'>
              Tocbot
            </a>
            <a className='white no-underline f6 ml2' href={`https://github.com/tscanlin/tocbot/releases/tag/v${pkg.version}`}>
              {`v${pkg.version}`}
            </a>
          </div>
        </div>

        <div className='mw7 center dark-gray lh-copy'>
          <input id='toc' type='checkbox' className='dn' />
          <label className='toc-icon relative pointer z-2 f6 lh-solid bg-near-white b--silver pa1 ma1 ba br1' htmlFor='toc'>
            Menu
          </label>
          <nav
            className='toc toc-right js-toc relative z-1 transition--300 absolute pa4 pt5'
            dangerouslySetInnerHTML={{ __html: props.tocHtml }}
          />
          <div
            className='content js-toc-content pa4 pt5'
            dangerouslySetInnerHTML={{ __html: props.bodyHtml }}
          />

          <Tocbot {...props.tocbotOptions} />
        </div>
        {props.extraElements}

        <Tracking siteId={props.siteId} />
      </main>
    </div>
  )
}

Template.defaultProps = {
  title: '',
  subtitle: '',
  description: '',
  stylesheets: [
    'https://unpkg.com/tachyons@4.7.0/css/tachyons.min.css'
  ],
  extraElements: null
}

Template.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  stylesheets: PropTypes.array,
  topLinks: PropTypes.array,
  bodyHtml: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
  user: PropTypes.string,
  repo: PropTypes.string,
  extraElements: PropTypes.node
}

export default Template
