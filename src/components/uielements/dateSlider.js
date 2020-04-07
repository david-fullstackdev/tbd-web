import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slider } from 'antd';
import { getDateRange } from 'helpers/utility';

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const importValues = (range, values) => {
  return values.map(v => {
    const val = new Date(v);
    const index = range.indexOf(val.getTime());

    return index >= 0 ? index : null;
  })
};

const exportValues = (range, values) =>
  values.map(v => new Date(range[v]));


class DateSlider extends React.Component {
  constructor(props) {
    super(props);

    const min = new Date(props.min);
    const max = new Date(props.max);
    const range = getDateRange(min, max);
    const rawValue = props.value || [min, max];

    this.state = {
      range,
      value: importValues(range, rawValue)
    };

    this.formatter = this.formatter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatter(dateIndex) {
    return new Date(this.state.range[dateIndex]).toLocaleDateString();
  };

  handleChange(value) {
    this.setState({ value });
    this.props.onChange(exportValues(this.state.range, value));
  }

  render() {
    const { disabled, labels, style } = this.props;
    const { range, value } = this.state;
    const min = 0;
    const max = range.length - 1;

    return (
      <div style={style}>
        <Labels>
          {labels.map(label => <span key={label}>{label}</span>)}
        </Labels>
        <Slider
          range
          min={min}
          max={max}
          disabled={disabled}
          value={value}
          tipFormatter={null}
          onChange={this.handleChange}
        />
        <Labels>
          <span>{this.formatter(value[0])}</span>
          <span>{this.formatter(value[1])}</span>
        </Labels>
      </div>
    );
  }
}

const DateType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.object,
]);

DateSlider.propTypes = {
  min: DateType.isRequired,
  max: DateType.isRequired,
  value: PropTypes.arrayOf(DateType),
  labels: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

DateSlider.defaultProps = {
  labels: [],
  onChange: () => {},
};

export default DateSlider;
