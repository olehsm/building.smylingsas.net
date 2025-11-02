export function updateNetworkInfo() {
  try {
    const connection = navigator.connection;
    if (!connection) return;

    const downlink = document.getElementById('network-downlink');
    if (downlink) {
      if (connection.downlink !== undefined && connection.downlink !== null) {
        downlink.innerText = `${connection.downlink} mbit/s`;
      } else {
        downlink.innerText = 'Ikke tilgjengelig';
      }
    }

    const effectiveType = document.getElementById('network-effetive-type');
    if (effectiveType) effectiveType.innerText = connection.effectiveType;

    const rtt = document.getElementById('network-rtt');
    if (rtt) {
      if (connection.rtt !== undefined && connection.rtt !== null) {
        rtt.innerText = `${connection.rtt} ms`;
      } else {
        rtt.innerText = 'Ikke tilgjengelig';
      }
    }

    const saveData = document.getElementById('network-save-data');
    if (saveData) {
      if (connection.saveData === true) {
        saveData.innerText = 'Ja';
      } else if (connection.saveData === false) {
        saveData.innerText = 'Nei';
      } else {
        saveData.innerText = 'Ikke tilgjengelig';
      }
    }
  } catch (e) {
    console.warn('updateNetworkInfo error', e);
  }
}

export function initNetwork() {
  // populate initially
  updateNetworkInfo();
  // keep updated where supported
  try {
    const connection = navigator.connection;
    if (connection && typeof connection.addEventListener === 'function') {
      connection.addEventListener('change', updateNetworkInfo);
    }
  } catch (e) {
    // ignore
  }
}
