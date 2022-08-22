import { expect } from '@storybook/jest';
import { findByRole, userEvent, within } from '@storybook/testing-library';
import { rest } from 'msw';
import React from 'react';
import { Default as TaskListDefault } from '../../components/TaskList/TaskList.stories';
import { LoginScreen } from './index';

export default {
  component: LoginScreen,
  title: 'LoginScreen',
};

const Template = (args) => <LoginScreen {...args} />;

export const Default = Template.bind({});