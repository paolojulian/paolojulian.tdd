import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { LoginForm } from '.';

export default {
  component: LoginForm,
  title: 'LoginForm',
};

const Template = (args) => <LoginForm {...args} />;

const getCredentials = async (canvas) => {
  const getLabelText = (name) => canvas.findByLabelText(name);
  const getButton = (name) => canvas.findByRole('button', { name });

  const emailAddress = await getLabelText(/Email Address/i);
  const password = await getLabelText(/Password/i);
  const submitButton = await getButton('Login');

  return {
    emailAddress,
    password,
    submitButton,
  };
};

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { emailAddress, password, submitButton } = getCredentials(canvas);

  expect(emailAddress).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
};

export const Validation = Template.bind({});
Validation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { emailAddress, password, submitButton } = getCredentials(canvas);

  const getText = (name) => canvas.findByText(name);

  // Empty submit
  userEvent.click(submitButton);
  expect(
    await getText('Email Address is a required field')
  ).toBeInTheDocument();
  expect(await getText('Password is a required field')).toBeInTheDocument();

  // Invalid email address and password
  userEvent.type(emailAddress, 'invalid');
  userEvent.type(password, 'short');
  userEvent.click(submitButton);
  expect(
    await getText('Email Address must be a valid email')
  ).toBeInTheDocument();
  expect(
    await getText('Password must be at least 6 characters')
  ).toBeInTheDocument();
};
