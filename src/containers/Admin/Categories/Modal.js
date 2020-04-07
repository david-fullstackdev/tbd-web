import React from 'react';
import Button from 'components/uielements/button';
import Input from 'components/uielements/input';
import Form from 'components/uielements/form';
import Modals from 'components/feedback/modal';
import ModalStyle from 'containers/Feedback/Modal/modal.style';
import WithDirection from 'config/withDirection';
import { withFormik } from 'formik';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const FormItem = Form.Item;

const CategoryModal = ({
  record,
  visible = true,
  progress,
  values,
  handleChange,
  handleSubmit,
  onCancel,
}) => (
  <Modal
    visible={visible}
    title={record.id ? 'Edit Category' : 'Add Category'}
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
    <Form>
      <FormItem>
        <Input
          size="large"
          placeholder="Category"
          name="category"
          value={values.category}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem>
        <Input
          size="large"
          placeholder="Display Name"
          name="display_name"
          value={values.display_name}
          onChange={handleChange}
        />
      </FormItem>
    </Form>
  </Modal>
);

export default withFormik({
  mapPropsToValues: ({ record }) => ({
    category: record.category || '',
    display_name: record.display_name || ''
  }),
  handleSubmit: (values, { props }) => {
    props.onSave(Object.assign({}, props.record, values));
  }
})(CategoryModal);