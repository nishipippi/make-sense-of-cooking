export enum Role {
  UNASSIGNED = 'UNASSIGNED',
  PREPARATION = 'PREPARATION',
  CLEANUP = 'CLEANUP',
  DONATION = 'DONATION',
}

export interface Participant {
  id: string;
  name: string;
  role: Role;
}

export enum ScreenView {
  INPUT = 'INPUT',
  RESULTS = 'RESULTS',
}
