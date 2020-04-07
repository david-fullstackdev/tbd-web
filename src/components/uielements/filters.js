import React from 'react';
import Form, { FormItem } from 'components/uielements/form';
import Select, { SelectOption } from 'components/uielements/select';
import PriceSlider from 'components/uielements/priceSlider';


const FilterSelect = ({ label, options, value }) => (
  <FormItem label={label}>
    <Select value={value}>
      {options.map(opt => (
        <SelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </SelectOption>
      ))}
    </Select>
  </FormItem>
);

const FilterPrice = ({ label, range, value }) => (
  <FormItem label={label}>
    <PriceSlider
      min={range[0]}
      max={range[1]}
      defaultValue={value}
    />
  </FormItem>
);

export const FilterItem = ({ type, ...props }) => {
  switch (type) {
    case 'select': return <FilterSelect {...props} />;
    case 'range': return <FilterPrice {...props} />;
    default: return <span>Filter type '{type}' not found</span>
  }
};

class Filters extends React.Component {
  render() {
    return (
      <Form layout="vertical">
        {this.props.children}
      </Form>
    );
  }
}

export default Filters;