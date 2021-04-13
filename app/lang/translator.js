import I18n from 'i18n-js';

export const translator = (screen: string) => (key: string) => I18n.t(`${screen}.${key}`);
