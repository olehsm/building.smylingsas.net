import { initLazyImages } from "./modules/lazy-images.ts";
import { initModals, addModalOpenListener } from "./modules/modals.ts";
import { initSearch } from "./modules/search.ts";
import { initNetwork, updateNetworkInfo } from "./modules/network.ts";
import { initBattery, updateBatteryInfo } from "./modules/battery.ts";
import { initTheme, wireThemeToggle } from "./modules/theme.ts";
import { initLayoutToggle } from "./modules/layout-toggle.ts";

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
