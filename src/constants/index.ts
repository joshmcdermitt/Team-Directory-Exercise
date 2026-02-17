import { Team } from '../models/types';

export const MAX_LEVEL = 5;

export const TEAM_ORDER = [Team.PLATFORM, Team.PRODUCT, Team.DESIGN, Team.SALES] as const;

export const API_DELAY = 200; // milliseconds

export const SEARCH_PLACEHOLDER = 'name or skill...';

export const DEBUG_LOGGING = true; // Simplified for now
