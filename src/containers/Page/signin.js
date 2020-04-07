import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFormik } from 'formik';
import Input from 'components/uielements/input';
import Form from 'components/uielements/form';
import Button from 'components/uielements/button';
import authAction from 'redux/auth/actions';
import IntlMessages from 'components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';

const { login } = authAction;
const FormItem = Form.Item;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    const from = { pathname: '/dashboard' };
    const { values, error, loading, handleChange } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <Form className="isoSignInForm" >
              <FormItem
                className="isoInputWrapper"
                validateStatus={error ? "error" : null}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </FormItem>

              <FormItem
                className="isoInputWrapper"
                validateStatus={error ? "error" : null}
                help={error}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </FormItem>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" loading={loading} onClick={this.props.handleSubmit}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default compose(
  connect(
    state => ({
      isLoggedIn: state.Auth.get('idToken') !== null,
      error: state.Auth.get('error'),
      loading: state.Auth.get('loading'),
    }),
    { login }
  ),
  withFormik({
    // Transform outer props into form values
    mapPropsToValues: props => ({ email: '', password: '' }),
    // Submission handler
    handleSubmit: (values, { props }) => {
      props.login(values);
    }
  }),
)(SignIn);
