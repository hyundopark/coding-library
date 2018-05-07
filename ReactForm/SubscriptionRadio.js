import React from "react";

class SubscriptionRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOption: props.selectOption
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectOption: nextProps.selectOption });
  }

  handleOptionChange(evt) {
    this.setState({
      selectOption: evt.target.value
    });
    this.props.onChange(evt)
  }

  render() {
    return (
      <React.Fragment>
        <label className="radio radio-inline no-margin">
          <input
            type="radio"
            name="subscriptionLevel"
            value="Free"
            className="radiobox style-2"
            onChange={this.handleOptionChange}
          />
          <span>Free</span>
        </label>
        <label className="radio radio-inline">
          <input
            type="radio"
            name="subscriptionLevel"
            value="Premium"
            className="radiobox style-2"
            onChange={this.handleOptionChange}
          />
          <span>Premium</span>
        </label>
      </React.Fragment>
    );
  }
}
export default SubscriptionRadio;