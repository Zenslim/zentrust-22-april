export type UserRole = 'admin' | 'editor' | 'viewer';

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
}

export function isAuthorized(user: SessionUser | null, allowed: UserRole[]): boolean {
  if (!user) return false;
  return allowed.includes(user.role);
}

export function getMockSession(): SessionUser {
  return { id: 'demo', email: 'demo@zentrust.org', role: 'admin' };
}
