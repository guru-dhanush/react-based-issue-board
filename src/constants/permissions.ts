import { Permission, Role } from '../types';

export const PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['move_issue', 'update_status', 'resolve_issue'],
  contributor: []
};

export const PERMISSION_MESSAGES = {
  move_issue: 'You do not have permission to move issues',
  update_status: 'You do not have permission to update issue status',
  resolve_issue: 'You do not have permission to resolve issues'
};
