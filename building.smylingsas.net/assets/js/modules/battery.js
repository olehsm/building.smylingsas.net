import { formatSeconds } from "./utils.js";
let _battery = null;
function updateAll() {
    if (!_battery)
        return;
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
}
function updateChargeInfo() {
    const batteryCharging = document.getElementById("battery-charging");
    if (batteryCharging && _battery)
        batteryCharging.innerText = `${_battery.charging ? "Ja" : "Nei"}`;
}
function updateLevelInfo() {
    const batteryLevel = document.getElementById("battery-level");
    if (batteryLevel && _battery)
        batteryLevel.innerText = `${_battery.level * 100}%`;
}
function updateChargingInfo() {
    const batteryChargetime = document.getElementById("battery-chargetime");
    if (batteryChargetime && _battery)
        batteryChargetime.innerText = formatSeconds(_battery.chargingTime);
}
function updateDischargingInfo() {
    const batteryDischargetime = document.getElementById("battery-dischargetime");
    if (batteryDischargetime && _battery)
        batteryDischargetime.innerText = formatSeconds(_battery.dischargingTime);
}
export function initBattery() {
    const navigator_ = navigator;
    if (!navigator_.getBattery)
        return;
    navigator_
        .getBattery()
        .then((battery) => {
        _battery = battery;
        battery.addEventListener("chargingchange", updateChargeInfo);
        battery.addEventListener("levelchange", updateLevelInfo);
        battery.addEventListener("chargingtimechange", updateChargingInfo);
        battery.addEventListener("dischargingtimechange", updateDischargingInfo);
        updateAll();
    })
        .catch((e) => {
        console.warn("initBattery error", e);
    });
}
export function updateBatteryInfo() {
    if (_battery) {
        updateAll();
    }
    else {
        const navigator_ = navigator;
        if (navigator_.getBattery) {
            initBattery();
        }
    }
}
//# sourceMappingURL=battery.js.map