import React from 'react';
import PropTypes from 'prop-types';
import Select, { SelectOption } from 'components/uielements/select';

class SelectBox extends React.Component {
  handleChange = (value) => {
    const { name, onChange } = this.props;
    onChange(name, value);
  };

  render() {
    const { options, placeholder, value } = this.props;

    return (
      <Select
        mode="tags"
        value={value}
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={this.handleChange}
      >
        {options.map(opt => (
          <SelectOption key={opt.value} value={opt.value}>{opt.label}</SelectOption>
        ))}
      </Select>
    );
  }
}

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
};

export default SelectBox;