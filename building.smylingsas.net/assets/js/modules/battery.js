import { formatSeconds } from './utils.js';

let _battery = null;

function updateAll() {
  if (!_battery) return;
  updateChargeInfo();
  updateLevelInfo();
  updateChargingInfo();
  updateDischargingInfo();
}

function updateChargeInfo() {
  const batteryCharging = document.getElementById('battery-charging');
  if (batteryCharging) batteryCharging.innerText = `${_battery.charging ? 'Ja' : 'Nei'}`;
}

function updateLevelInfo() {
  const batteryLevel = document.getElementById('battery-level');
  if (batteryLevel) batteryLevel.innerText = `${_battery.level * 100}%`;
}

function updateChargingInfo() {
  const batteryChargetime = document.getElementById('battery-chargetime');
  if (batteryChargetime) batteryChargetime.innerText = formatSeconds(_battery.chargingTime);
}

function updateDischargingInfo() {
  const batteryDischargetime = document.getElementById('battery-dischargetime');
  if (batteryDischargetime) batteryDischargetime.innerText = formatSeconds(_battery.dischargingTime);
}

export function initBattery() {
  if (!navigator.getBattery) return;
  navigator.getBattery().then((battery) => {
    _battery = battery;
    // wire up events once
    battery.addEventListener('chargingchange', updateChargeInfo);
    battery.addEventListener('levelchange', updateLevelInfo);
    battery.addEventListener('chargingtimechange', updateChargingInfo);
    battery.addEventListener('dischargingtimechange', updateDischargingInfo);
    // initial population
    updateAll();
  }).catch((e) => {
    console.warn('initBattery error', e);
  });
}

export function updateBatteryInfo() {
  // allow manual refresh (e.g., when modal opens)
  if (_battery) {
    updateAll();
  } else if (navigator.getBattery) {
    // fallback: make sure battery is initialized
    initBattery();
  }
}
