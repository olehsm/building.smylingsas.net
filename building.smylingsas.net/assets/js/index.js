import { initLazyImages } from './modules/lazy-images.js';
import { initModals, addModalOpenListener } from './modules/modals.js';
import { initSearch } from './modules/search.js';
import { initNetwork, updateNetworkInfo } from './modules/network.js';
import { initBattery, updateBatteryInfo } from './modules/battery.js';

// Initialize modules when DOM is ready
function onReady() {
  initLazyImages();
  initModals();
  initSearch();
  initNetwork();
  initBattery();

  // When modals open, allow manual refresh of their content
  addModalOpenListener((modalId) => {
    if (modalId === 'networkInfoModal') {
      updateNetworkInfo();
    }
    if (modalId === 'batteryInfoModal') {
      updateBatteryInfo();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}
