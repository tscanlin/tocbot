/**
 * The main template component for documentation in this repository.
 *
 * @author Tim Scanlin
 */

var React = require('react');
var ReactDOM = require('react-dom');

var buttonClasses = 'f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-gray';

module.exports = React.createClass({
  propTypes: {
    json: React.PropTypes.object.isRequired
  },

  render: function() {
    var json = this.props.json;
    var TemplateComponent = require('./' + json.component);

    return (
      <main>
        <div className="hero relative overflow-hidden tc z-3">
          <div className="hero-inner relative mw7 center white pv4">
            <div className="absolute top-0 right-0">
              <a className="dib f6 white pa1 ma1" href="#">About</a>
              <a className="dib f6 white pa1 ma1" href="https://github.com/tscanlin/tocbot">Github</a>
            </div>
            <div className="pv4">
              <h1 className="title normal ma0 pa0">
                Tocbot
              </h1>
              <h4 className="subtitle normal ma0 pa3">
                Generate a table of contents based on the heading structure of an html document.
              </h4>
              <div className="mv2 ml4">
                <iframe src="https://ghbtns.com/github-btn.html?user=tscanlin&repo=tocbot&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="mw7 center dark-gray lh-copy">
          <input id="toc" type="checkbox" className="dn" />
          <label className="toc-icon relative z-2 f6 lh-solid bg-near-white b--silver pa1 ma1 ba br1" htmlFor="toc">Menu</label>
          <nav className="toc js-toc relative z-1 transition--300 absolute pa3"></nav>
          <div className="content js-toc-content pa3">
              <TemplateComponent {...this.props.json} />
          </div>


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
      </main>
    );
  }
});
