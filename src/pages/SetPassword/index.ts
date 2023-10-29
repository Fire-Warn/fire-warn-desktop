import { ComponentProps } from 'react';
import SetPassword from './SetPassword';

export default SetPassword;

export type SetPasswordProps = {} & Omit<ComponentProps<'div'>, 'ref'>;
