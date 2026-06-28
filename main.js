/**
 * SILVORA · Main
 * Entry point — orchestrates all modules
 */

import Language   from './language.js';
import Navigation from './navigation.js';
import Animations from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Navigation (no async dep)
  Navigation.init();

  // 2. Reveal animations
  Animations.init();

  // 3. i18n — load locale and render strings
  await Language.init();
});
