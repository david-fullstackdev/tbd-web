import React from 'react';
import Button from 'components/uielements/button';
import Input from 'components/uielements/input';
import Form from 'components/uielements/form';
import Select from './Select';
import Modals from 'components/feedback/modal';
import ModalStyle from 'containers/Feedback/Modal/modal.style';
import WithDirection from 'config/withDirection';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as selectors from 'redux/admin/selectors';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const FormItem = (props) => <Form.Item {...props} {...formItemLayout} />;

class UserModal extends React.Component {
  render() {
    const {
      record,
      visible = true,
      progress,
      values,
      modules,
      categories,
      handleChange,
      handleSubmit,
      setFieldValue,
      onCancel,
    } = this.props;

    return (
      <Modal
        visible={visible}
        title={record.id ? 'Edit User' : 'Add User'}
        onOk={handleSubmit}
        onCancel={onCancel}
        footer={[
          <Button key="back" size="large" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            size="large"
            loading={progress}
            onClick={handleSubmit}
          >
            Save
          </Button>,
        ]}
      >
        <Form autoComplete="off">
          <FormItem label="Email">
            <Input
              size="large"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
            />
          </FormItem>
          <FormItem label="Password">
            <Input
              size="large"
              placeholder="Fill only if you need to change the password"
              type="password"
              name="password"
              value={values.password}
              autoComplete="new-password"
              onChange={handleChange}
            />
          </FormItem>
          <FormItem label="First Name">
            <Input
              size="large"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem label="Last Name">
            <Input
              size="large"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem label="Modules">
            <Select
              name="modules"
              placeholder="Select modules"
              options={modules}
              value={values.modules}
              onChange={setFieldValue}
            />
          </FormItem>
          <FormItem label="Categories">
            <Select
              name="categories"
              placeholder="Select categories"
              options={categories}
              value={values.categories}
              onChange={setFieldValue}
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default compose(
  connect(selectors.getUserModal),
  withFormik({
    mapPropsToValues: ({ record, references }) => ({
      email: record.email || '',
      first_name: record.first_name || '',
      last_name: record.last_name || '',
      password: '',
      modules: references.modules,
      categories: references.categories,
    }),
    handleSubmit: (values, { props }) => {
      props.onSave(Object.assign({}, props.record, values));
    }
  })
)(UserModal);