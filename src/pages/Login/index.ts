import { ComponentProps } from 'react';
import Login from './Login';

export default Login;

export type LoginProps = {} & Omit<ComponentProps<'div'>, 'ref'>;
