import { formatSeconds } from "./utils.ts";

interface BatteryManager extends EventTarget {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
}

let _battery: BatteryManager | null = null;

function updateAll(): void {
    if (!_battery) return;
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
}

function updateChargeInfo(): void {
    const batteryCharging = document.getElementById("battery-charging");
    if (batteryCharging && _battery)
        batteryCharging.innerText = `${_battery.charging ? "Ja" : "Nei"}`;
}

function updateLevelInfo(): void {
    const batteryLevel = document.getElementById("battery-level");
    if (batteryLevel && _battery) batteryLevel.innerText = `${_battery.level * 100}%`;
}

function updateChargingInfo(): void {
    const batteryChargetime = document.getElementById("battery-chargetime");
    if (batteryChargetime && _battery)
        batteryChargetime.innerText = formatSeconds(_battery.chargingTime);
}

function updateDischargingInfo(): void {
    const batteryDischargetime = document.getElementById(
        "battery-dischargetime",
    );
    if (batteryDischargetime && _battery)
        batteryDischargetime.innerText = formatSeconds(
            _battery.dischargingTime,
        );
}

export function initBattery(): void {
    const navigator_ = navigator as any;
    if (!navigator_.getBattery) return;
    navigator_
        .getBattery()
        .then((battery: BatteryManager): void => {
            _battery = battery;
            battery.addEventListener("chargingchange", updateChargeInfo);
            battery.addEventListener("levelchange", updateLevelInfo);
            battery.addEventListener("chargingtimechange", updateChargingInfo);
            battery.addEventListener(
                "dischargingtimechange",
                updateDischargingInfo,
            );
            updateAll();
        })
        .catch((e: Error): void => {
            console.warn("initBattery error", e);
        });
}

export function updateBatteryInfo(): void {
    if (_battery) {
        updateAll();
    } else {
        const navigator_ = navigator as any;
        if (navigator_.getBattery) {
            initBattery();
        }
    }
}
