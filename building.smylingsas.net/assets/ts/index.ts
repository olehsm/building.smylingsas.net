import { initLazyImages } from "./modules/lazy-images.js";
import { initModals, addModalOpenListener } from "./modules/modals.js";
import { initSearch } from "./modules/search.js";
import { initNetwork, updateNetworkInfo } from "./modules/network.js";
import { initBattery, updateBatteryInfo } from "./modules/battery.js";
import { initTheme, wireThemeToggle } from "./modules/theme.js";
import { initLayoutToggle } from "./modules/layout-toggle.js";

function onReady(): void {
    initLazyImages();
    initModals();
    initSearch();
    initNetwork();
    initBattery();
    initTheme();
    initLayoutToggle();
    wireThemeToggle();

    addModalOpenListener((modalId: string): void => {
        if (modalId === "networkInfoModal") {
            updateNetworkInfo();
        }
        if (modalId === "batteryInfoModal") {
            updateBatteryInfo();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
} else {
    onReady();
}
