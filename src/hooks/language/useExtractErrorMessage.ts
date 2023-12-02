import { useTranslation } from 'react-i18next';

import { ApiError } from 'hooks/notistack/useSnackbarOnError';
import { useCallback } from 'react';

const TRANSLATION_NOT_FOUND = 'TRANSLATION_NOT_FOUND';

export function useExtractErrorMessage(): (error: ApiError | Error) => string {
	const { t } = useTranslation('errors');

	return useCallback(
		(error: ApiError | Error) => {
			const connectionErrorMessage = t('connectionError');

			try {
				const id: string | undefined = (error as ApiError)?.body?.id;
				const message: string | undefined =
					(error as ApiError)?.body?.message || (error as Error).message;

				if (message === 'Failed to fetch') {
					return connectionErrorMessage;
				}

				const translatedError = t(id, { defaultValue: TRANSLATION_NOT_FOUND });

				return translatedError === TRANSLATION_NOT_FOUND
					? message || id || connectionErrorMessage
					: translatedError;
			} catch (e) {
				console.error(e);
				return connectionErrorMessage;
			}
		},
		[t],
	);
}
