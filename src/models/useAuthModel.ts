import { useState, useCallback } from 'react';
import type { PermissionType } from 'modules/GlobalAuth';

export default function useAuthModel() {
	const [permission, setPermission] = useState<Array<PermissionType>>([]);

	const updataAuth = useCallback((auth: Array<PermissionType>) => {
		setPermission(auth);
	}, []);

	return {
		permission,
		updataAuth,
	};
}
