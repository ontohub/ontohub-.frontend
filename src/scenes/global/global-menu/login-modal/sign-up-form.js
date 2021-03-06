import React from "react";
import { Field } from "lib/field";
import { PasswordStrengthBar } from "./sign-up-form/password-strength-bar";
import { withRefs } from "./sign-up-form/withRefs";
import { compose } from "recompose";
import { Button, Form } from "semantic-ui-react";
import { Formik } from "formik";
import { validate } from "./sign-up-form/validation";
import { setServerErrors } from "lib/validation";
import ReCAPTCHA from "react-google-recaptcha";
const grecaptchaSiteKey = process.env.REACT_APP_GRECAPTCHA_SITE_KEY;

export const PureSignUpForm = ({
  captcha: Captcha,
  errors,
  onBlur,
  onChange,
  onSubmit,
  submitEnabled = true,
  touched,
  values
}) => (
  <Form onSubmit={submitEnabled ? onSubmit : undefined}>
    {Captcha || null}
    <Form.Group widths="equal">
      <Field
        errors={errors.name}
        fieldId="sign-up-username"
        label="Username"
        name="name"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.name}
        value={values.name}
      />
      <Field
        errors={errors.email}
        fieldId="sign-up-email"
        label="Email"
        name="email"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.email}
        value={values.email}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        bar={<PasswordStrengthBar score={errors.passwordScore || 0} />}
        errors={errors.password}
        fieldId="sign-up-password"
        label="Password"
        name="password"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.password}
        type="password"
        value={values.password}
      />
      <Field
        errors={errors.confirmPassword}
        fieldId="sign-up-password-confirm"
        label="Password confirmation"
        name="confirmPassword"
        onBlur={onBlur}
        onChange={onChange}
        touched={touched.confirmPassword}
        type="password"
        value={values.confirmPassword}
      />
    </Form.Group>
    <Button
      basic
      type="submit"
      icon="add user"
      content="Create account"
      floated="right"
      secondary
      disabled={!submitEnabled}
    />
  </Form>
);

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

/* istanbul ignore next */
const FormikSignUpForm = ({
  enableCaptcha,
  onError,
  onSubmit,
  refs,
  registerCaptcha,
  setValues,
  onStartSubmit
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setErrors, setSubmitting }) => {
      onStartSubmit();
      if (refs.captcha && enableCaptcha) {
        refs.captcha.reset();
        refs.captcha.execute();
      } else {
        onSubmit({ ...values, captcha: "skip" }).catch(
          setServerErrors(setErrors, setSubmitting, onError)
        );
      }
    }}
    render={({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      setErrors,
      setFieldTouched,
      setSubmitting,
      touched,
      values
    }) => (
      <PureSignUpForm
        captcha={
          enableCaptcha &&
          initialValues !== values && (
            <ReCAPTCHA
              sitekey={grecaptchaSiteKey}
              ref={registerCaptcha}
              size="invisible"
              badge="bottomleft"
              onChange={captcha => {
                onSubmit({ ...refs.values, captcha }).catch(
                  setServerErrors(setErrors, setSubmitting, onError)
                );
              }}
            />
          )
        }
        errors={errors}
        onBlur={handleBlur}
        onChange={(e, ...args) => {
          const fieldName = e.target.name;
          const fieldValue = e.target.value;
          setFieldTouched(fieldName, true);
          setValues({ ...refs.values, [fieldName]: fieldValue });
          return handleChange(e, ...args);
        }}
        onSubmit={handleSubmit}
        submitEnabled={values !== initialValues}
        touched={touched}
        values={values}
      />
    )}
    validate={validate}
  />
);

export const SignUpForm = compose(
  withRefs({ captcha: "registerCaptcha", values: "setValues" })
)(FormikSignUpForm);
