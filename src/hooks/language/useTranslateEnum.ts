import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function useTranslateEnum<T>(params?: { keyPrefix: string }) {
	const { t } = useTranslation('enums', { keyPrefix: params?.keyPrefix });

	return useCallback(
		(key: T, options?: { prefix?: string }): string => {
			return t(options?.prefix ? `${options.prefix}.${key}` : `${key}`);
		},
		[t],
	);
}
