import { setCssVar } from 'quasar';

export const COLOR_FILTERS = [
  'grayscale',
  'invert',
  'protanopia',
  'protanomaly',
  'deuteranopia',
  'deutranomaly',
  'tritanopia',
  'tritanomaly',
  'achromatopsia',
  'achromatomaly'
] as const;

type Settings = {
  color1: string;
  color2: string;
  fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter';
  fontFamily: string;
  colorFilter: typeof COLOR_FILTERS[number] | null;
  relativeFontSize: number;
  firstAccess: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  color1: '#ffffff',
  color2: '#00a352',
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  colorFilter: null,
  relativeFontSize: 1,
  firstAccess: true
};

function loadFromLocalStorage(): Settings {
  const settings = localStorage.getItem('settings');
  if (settings) {
    return {
      ...DEFAULT_SETTINGS,
      ...(JSON.parse(settings) as Settings)
    };
  }
  return DEFAULT_SETTINGS;
}

function applySettings(settings: Settings) {
  // Save on LocalStorage
  localStorage.setItem('settings', JSON.stringify(settings));

  // Apply CSS Variables
  setCssVar('primary', settings.color2);
  setCssVar('color1', settings.color1);
  setCssVar('color2', settings.color2);
  setCssVar('font-weight', settings.fontWeight);
  setCssVar('font-family', settings.fontFamily);

  // Apply Color Filter
  for (const filter of COLOR_FILTERS) {
    document.documentElement.classList.toggle(`filter__${filter}`, settings.colorFilter === filter);
  }

  const relativeFontSizePercentageString = `${settings.relativeFontSize * 100}%`;
  setCssVar('relative-font-size', relativeFontSizePercentageString);
}

const rawSettings = loadFromLocalStorage();
export const SETTINGS: Settings = new Proxy(rawSettings, {
  set: (target: any, key, value) => {
    target[key] = value;
    applySettings(target);
    return true;
  }
});

setTimeout(() => {
  applySettings(SETTINGS);
}, 0);
