import { initLazyImages } from "./modules/lazy-images";
import { initModals, addModalOpenListener } from "./modules/modals";
import { initSearch } from "./modules/search";
import { initNetwork, updateNetworkInfo } from "./modules/network";
import { initBattery, updateBatteryInfo } from "./modules/battery";
import { initTheme, wireThemeToggle } from "./modules/theme";
import { initLayoutToggle } from "./modules/layout-toggle";

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
