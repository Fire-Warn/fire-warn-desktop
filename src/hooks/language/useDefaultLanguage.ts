import { useQuery } from 'react-query';

import { useOrganizationId, useRole } from 'context/PermissionsContext';
import { OrganizationService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack/useSnackbarOnError';
import { languageFromOrganizationLanguage } from 'locales';
import { Language } from 'i18n';

export default function useDefaultLanguage(): {
	isLoading: boolean;
	language: Language | undefined;
} {
	const organizationId = useOrganizationId();
	const role = useRole();

	const queryEnabled = !!organizationId && role !== 'PlatformAdmin';
	const defaultValue = { isLoading: false, language: undefined };

	const { data: organization, isLoading } = useQuery(
		[organizationId],
		() => OrganizationService.getOrganization(organizationId as number),
		{
			keepPreviousData: false,
			enabled: queryEnabled,
			onError: useSnackbarOnError(),
		},
	);

	return queryEnabled
		? {
				isLoading,
				language:
					organization?.language && !isLoading
						? languageFromOrganizationLanguage[organization.language]
						: undefined,
		  }
		: defaultValue;
}
