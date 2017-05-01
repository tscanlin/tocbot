import React from 'react'

const buttonClasses = 'f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-gray'

export default (props) => {
  return (
    <div>
      <input id="try-it-checkbox" type="checkbox" className="dn" />
      <div className="try-it-container transition--300 fixed w-60 z-3">
        <label className="label" htmlFor="try-it-checkbox">
          <span className={'button is-closed ' + buttonClasses}>
            Try it
          </span>
          <span className={'button is-open ' + buttonClasses}>
            Hide
          </span>
          <a id="try-it-reset" href="javascript:void(0)" className="ph3 pv2 mb2 dib">
            Reset
          </a>
        </label>
        <p className="mb1">Paste markdown in the box below.</p>
        <textarea id="try-it-markdown" className="textarea"></textarea>
      </div>
    </div>
  )
}
