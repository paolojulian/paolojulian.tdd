import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email Address'),
  password: Yup.string().required().min(6).label('Password'),
});

export const LoginForm = () => {
  return (
    <Box bg={'white'} p={4}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({
          handleReset,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          values,
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl mb={2} isInvalid={touched.email && errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={touched.password && errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={values.password}
                onChange={(e) => setFieldValue('password', e.target.value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button mt={4} width={'100%'} type='submit'>
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
