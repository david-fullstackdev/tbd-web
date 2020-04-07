import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider } from 'antd';

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


class PriceSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || [props.min, props.max]
    };

    this.formatter = this.formatter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatter(value) {
    return `$${value}`;
  };

  handleChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { disabled, style, min, max } = this.props;
    const { value } = this.state;

    return (
      <div style={style}>
        <Labels>
          <span>{this.formatter(value[0])}</span>
          <span>{this.formatter(value[1])}</span>
        </Labels>
        <Slider
          range
          min={min}
          max={max}
          disabled={disabled}
          value={value}
          step={0.01}
          tipFormatter={null}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}


PriceSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

PriceSlider.defaultProps = {
  onChange: () => {},
};

export default PriceSlider;
