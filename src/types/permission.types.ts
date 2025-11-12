import { Role, Permission } from '../types';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['move_issue', 'update_status', 'resolve_issue'],
  contributor: []
};

export interface PermissionGateProps {
  permission: Permission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}
