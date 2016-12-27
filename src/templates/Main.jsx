/**
 * The main template component for documentation in this repository.
 *
 * @author Tim Scanlin
 */

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  propTypes: {
    json: React.PropTypes.object.isRequired
  },

  render: function() {
    var json = this.props.json;
    var TemplateComponent = require('./' + json.component);

    return (
      <main>
        <div className="hero">
          <div className="hero-inner white">
            <h1 className="mb0">
              Tocbot
            </h1>
            <h3 className="skip-toc">
              Generate a table of contents based on the heading structure of an html document.
            </h3>
            <div className="">
              <iframe src="https://ghbtns.com/github-btn.html?user=tscanlin&repo=tocbot&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
            </div>
          </div>
        </div>

        <div className="">
          <input id="toc" type="checkbox" className="dn" />
          <label className="toc-icon" htmlFor="toc">Menu</label>
          <nav className="toc js-toc absolute"></nav>
          <div className="content js-toc-content">
              <TemplateComponent {...this.props.json} />
          </div>


          <input id="try-it-checkbox" type="checkbox" className="dn" />
          <div className="try-it-container transition--300">
            <label className="label" htmlFor="try-it-checkbox">
              <span className="button is-closed">
                Try it
              </span>
              <span className="button is-open">
                Hide
              </span>
              <a id="try-it-reset" href="javascript:void(0)" className="button ">
                Reset
              </a>
            </label>
            <p className="">Paste markdown in the box below.</p>
            <textarea id="try-it-markdown" className="textarea"></textarea>
          </div>
        </div>
      </main>
    );
  }
});
