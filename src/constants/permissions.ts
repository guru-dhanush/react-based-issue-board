import { Permissions, Role } from '../types';

export const PERMISSIONS: Record<Role, Permissions[]> = {
  admin: [Permissions.MOVE_ISSUE, Permissions.UPDATE_STATUS, Permissions.RESOLVE_ISSUE],
  contributor: []
};

export const PERMISSION_MESSAGES = {
  move_issue: 'You do not have permission to move issues',
  update_status: 'You do not have permission to update issue status',
  resolve_issue: 'You do not have permission to resolve issues'
};
