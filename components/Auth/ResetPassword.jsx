import React, { Component } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import {
  CardTitle,
  FormGroup,
  InputGroup,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import { CustomInput } from '../Shared';

const Header = styled.div`
    margin: 1rem;
`;

class ResetPassword extends Component {
  render() {
    const {
      validationSchema, postResetPassword, pageHandle,
    } = this.props;
    return (
      <>
        <Header>
          <CardTitle tag="h3">Şifre Sıfırla</CardTitle>
        </Header>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            postResetPassword(values.email);
          }}
        >
          {(props) => {
            const {
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <CustomInput
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputLabel="Mail Adresi"
                      error={errors.email}
                    />
                  </InputGroup>
                </FormGroup>
                <Button type="submit" color="info">Şifremi Sıfırla</Button>
                {' '}
                <Button type="button" onClick={() => pageHandle('login')} color="secondary">Geri Dön</Button>
              </form>
            );
          }}
        </Formik>
      </>
    );
  }
}

ResetPassword.propTypes = {
  validationSchema: PropTypes.objectOf.isRequired,
  postResetPassword: PropTypes.func.isRequired,
  pageHandle: PropTypes.func.isRequired,
};

export default ResetPassword;
