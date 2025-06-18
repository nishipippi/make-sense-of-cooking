import { Role } from './types';

export const ROLE_STYLES: Record<Role, { chip: string; titleText: string; border: string; icon: string; button?: string }> = {
  [Role.UNASSIGNED]: {
    chip: 'bg-gray-400 text-gray-800',
    icon: '👤',
    titleText: 'text-gray-700',
    border: 'border-gray-300',
  },
  [Role.PREPARATION]: {
    chip: 'bg-red-500 text-white',
    icon: '🍳',
    titleText: 'text-red-600',
    border: 'border-red-400',
    button: 'bg-red-500 hover:bg-red-600 text-white',
  },
  [Role.CLEANUP]: {
    chip: 'bg-blue-500 text-white',
    icon: '🧼',
    titleText: 'text-blue-600',
    border: 'border-blue-400',
    button: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  [Role.DONATION]: {
    chip: 'bg-yellow-400 text-black',
    icon: '💰',
    titleText: 'text-yellow-600',
    border: 'border-yellow-400',
    button: 'bg-yellow-400 hover:bg-yellow-500 text-black',
  },
};

export const ROLE_NAMES: Record<Role, string> = {
  [Role.UNASSIGNED]: '未割り当て',
  [Role.PREPARATION]: '準備担当',
  [Role.CLEANUP]: '片付け担当',
  [Role.DONATION]: '250円募金',
};

export const APP_TITLE = "筋通しましょうや";
export const APP_SUBTITLE_INPUT = "公平に楽しく、今日の役割を決めよう！";
export const APP_SUBTITLE_RESULTS = "ルーレット結果発表！";

export const PREPARATION_BUTTON_TEXT = "準備";
export const CLEANUP_BUTTON_TEXT = "片付け";
export const DONATION_BUTTON_TEXT = "250円募金";
