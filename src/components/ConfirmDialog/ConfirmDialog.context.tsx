import { ButtonProps } from '@mui/material/Button';
import React, {
	ComponentProps,
	createContext,
	Dispatch,
	PropsWithChildren,
	useCallback,
	useContext,
} from 'react';

export type ConfirmDialogContent = {
	persistent?: boolean;
} & (
	| ConfirmDialogContentMiniInfo
	| ConfirmDialogContentInfo
	| ConfirmDialogContentInput
	| ConfirmDialogHideInput
);

type ConfirmDialogContentMiniInfo = {
	type: 'miniInfo';
	title: string;
	icon: React.ComponentType;
};
type ConfirmDialogContentInfo = {
	type: 'info';
	orientation?: 'row' | 'column';
	title?: React.ReactNode;
	bigTitle?: React.ReactNode;
	subtitle?: React.ReactNode;
	description?: React.ReactNode;
	cancelText?: string;
	confirmText?: string;
	confirmColor?: ButtonProps['color'];
	icon?: React.ComponentType<Omit<ComponentProps<'svg'>, 'ref'>>;
	iconSize?: number | string;
	noPadding?: boolean;
	CustomContent?: React.ComponentType;
};
type ConfirmDialogContentInput = {
	type: 'input';
	title?: string;
	placeholder?: string;
	defaultValue?: string;
	cancelText?: string;
	confirmText?: string;
};
type ConfirmDialogHideInput = {
	type: 'hide';
};

// success & optional payload
type ListenerPayload = [boolean | undefined, any | undefined];

class ConfirmDialogContextClass {
	private _content?: ConfirmDialogContent;
	private _listeners: Dispatch<ListenerPayload>[] = [];

	public constructor(public _opened: boolean = false) {}

	public open(content: ConfirmDialogContent) {
		this._opened = true;
		this._content = content;
		this._listeners.forEach(l => l([undefined, undefined]));
	}

	// make sure this T matches promise's return type declaration down below in useConfirmDialog
	public close<T>(success = true, payload?: T) {
		this._opened = false;
		this._listeners.forEach(l => l([success, payload]));
	}

	public get opened() {
		return this._opened;
	}

	public get content() {
		return this._content;
	}

	public subscribe(listener: Dispatch<ListenerPayload>) {
		this._listeners.push(listener);
		return () => {
			this._listeners = this._listeners.filter(l => l !== listener);
		};
	}
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextClass>(null as any);

export const ConfirmDialogContextProvider = ({ children }: PropsWithChildren<{}>) => (
	<ConfirmDialogContext.Provider value={new ConfirmDialogContextClass()}>
		{children}
	</ConfirmDialogContext.Provider>
);

export function useConfirmDialog() {
	const context = useContext(ConfirmDialogContext);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(
		((content: ConfirmDialogContent, returnPromise = false) => {
			context.open(content);

			if (returnPromise) {
				return new Promise<any>((resolve, reject) => {
					const unsubscribe = context.subscribe(([success, payload]) => {
						if (typeof success === 'boolean') {
							if (success) resolve(payload);
							else reject(payload);
							unsubscribe();
						}
					});
				});
			}
		}) as ((content: ConfirmDialogContent, returnPromise?: false) => void) &
			// input returns string
			((content: ConfirmDialogContentInput, returnPromise: true) => Promise<string>) &
			// everything else return void
			((content: ConfirmDialogContent, returnPromise: true) => Promise<void>),
		[context],
	);
}
