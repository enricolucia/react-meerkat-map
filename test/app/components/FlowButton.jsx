'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const assert = require('chai').assert;
const sinon = require('sinon');

const FlowButton = require('../../../app/components/FlowButton');

describe('FlowButton component', function () {
  it('should set value using label property', function () {
    const label = 'Foo';

    const component = React.render(
      <FlowButton label={label} />,
      document.body
    );

    const buttonNode = TestUtils.findRenderedComponentWithType(component, FlowButton).getDOMNode();
    const value = buttonNode.getElementsByTagName('span')[0].innerHTML;

    assert.equal(value, label, 'label set');
  });

  it('should call onClick property', function () {
    const onClick = sinon.spy();

    const component = React.render(
      <FlowButton onClick={onClick} />,
      document.body
    );

    const buttonNode = TestUtils.findRenderedComponentWithType(component, FlowButton).getDOMNode();
    TestUtils.Simulate.click(buttonNode);

    assert.ok(onClick.calledOnce, 'click handler called');
  });
});