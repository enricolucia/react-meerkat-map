'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const assert = require('chai').assert;

const TopBar = require('../../../app/components/TopBar');
const FlowButton = require('../../../app/components/FlowButton');
const AuthButton = require('../../../app/components/AuthButton');
const GithubButton = require('../../../app/components/GithubButton');

describe('TopBar component', function () {
  before(function() {
    this.TopBar = React.createClass({
      childContextTypes: {
        tag: React.PropTypes.string.isRequired,
        loggedIn: React.PropTypes.bool.isRequired,
        repoUrl: React.PropTypes.string.isRequired
      },

      getChildContext: function () {
        return { tag: 'tag', loggedIn: false, repoUrl: '' };
      },

      render: function () {
        return <TopBar itemCount={this.props.itemCount} />;
      }
    });
  });

  it('should display counter when itemCount property > 0', function () {
    const component = React.render(
      <this.TopBar itemCount={1} />,
      document.body
    );
    const counter = TestUtils.findRenderedDOMComponentWithClass(component, 'hashtag');

    assert.equal(counter.getDOMNode().textContent, '#tag (1)', 'counter visible');
  });

  it('should not display counter when itemCount property == 0', function () {
    const component = React.render(
      <this.TopBar />,
      document.body
    );
    const counter = TestUtils.findRenderedDOMComponentWithClass(component, 'hashtag');

    assert.equal(counter.getDOMNode().textContent, '#tag', 'counter not visible');
  });

  it('should embed children components', function () {
    const component = React.render(
      <this.TopBar />,
      document.body
    );

    assert.ok(TestUtils.findRenderedComponentWithType(component, FlowButton), 'has flow button');
    assert.ok(TestUtils.findRenderedComponentWithType(component, AuthButton), 'has auth button');
    assert.ok(TestUtils.findRenderedComponentWithType(component, GithubButton), 'has github button');
  });
});