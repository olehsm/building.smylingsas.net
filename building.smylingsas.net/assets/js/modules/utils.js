export function formatSeconds(seconds) {
    if (seconds === undefined || seconds === null) return "Ikke tilgjengelig";
    if (!isFinite(seconds)) return "Ingen estimert tid";
    const sec = Math.round(seconds);
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const remainder = sec % 60;
    if (hours > 0) {
        return `${hours} t${minutes > 0 ? " " + minutes + " min" : ""}`;
    }
    if (minutes > 0) {
        return `${minutes} min${remainder > 0 ? " " + remainder + " s" : ""}`;
    }
    return `${remainder} s`;
}

export function safeText(node, text) {
    if (!node) return;
    node.innerText = text;
}
