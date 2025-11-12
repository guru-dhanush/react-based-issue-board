import { useCallback } from 'react';
import { Permission } from '../types';
import { useUser } from '../context/UserContext';
import { hasPermission, isAdmin as checkIsAdmin } from '../utils/permissionUtils';


export function usePermissions() {
  const { currentUser } = useUser();

  const can = useCallback((permission: Permission): boolean => {
    return hasPermission(currentUser.role, permission);
  }, [currentUser.role]);

  const isAdmin = checkIsAdmin(currentUser);

  return { can, isAdmin, role: currentUser.role };
}
