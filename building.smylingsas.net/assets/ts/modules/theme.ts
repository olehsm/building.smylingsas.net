const STORAGE_KEY = "site-theme-preference";

function getStoredPreference(): string | null {
    return localStorage.getItem(STORAGE_KEY);
}

function getSystemPrefersDark(): boolean {
    try {
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    } catch (e) {
        return false;
    }
}

function applyEffectiveTheme(pref: string): void {
    let effective = pref;
    if (pref === "auto") {
        effective = getSystemPrefersDark() ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", effective);
}

export function setThemePref(pref: string): void {
    if (!["light", "dark", "auto"].includes(pref)) return;
    if (pref === "auto") {
        localStorage.removeItem(STORAGE_KEY);
    } else {
        localStorage.setItem(STORAGE_KEY, pref);
    }
    applyEffectiveTheme(pref);
}

export function wireThemeButtons(): void {
    function findButton(name: string): HTMLElement | null {
        return (
            document.querySelector(`[data-modal-target="${name}"]`) ||
            document.querySelector(`[aria-label="${name}"]`)
        );
    }

    const btnLight = findButton("lightmode");
    const btnDark = findButton("darkmode");
    const btnAuto =
        findButton("automode") ||
        findButton("Automatisk") ||
        findButton("auto");

    function wire(btn: HTMLElement | null, pref: string): void {
        if (!btn) return;
        btn.addEventListener("click", (e: Event): void => {
            e.preventDefault();
            (e as MouseEvent).stopPropagation();
            setThemePref(pref);
        });
    }

    wire(btnLight, "light");
    wire(btnDark, "dark");
    wire(btnAuto, "auto");
}

export function wireThemeToggle(): void {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;

    function getPref(): string {
        return getStoredPreference() || "auto";
    }

    function updateButtonUI(pref: string): void {
        btn!.dataset.themePref = pref;
        btn!.setAttribute("aria-label", `Tema: ${pref}`);
        const autoIcon = btn!.querySelector(".theme-icon-auto");
        const lightIcon = btn!.querySelector(".theme-icon-light");
        const darkIcon = btn!.querySelector(".theme-icon-dark");
        if (autoIcon) autoIcon.classList.toggle("active", pref === "auto");
        if (lightIcon) lightIcon.classList.toggle("active", pref === "light");
        if (darkIcon) darkIcon.classList.toggle("active", pref === "dark");
    }

    updateButtonUI(getPref());

    btn.addEventListener("click", (e: Event): void => {
        e.preventDefault();
        (e as MouseEvent).stopPropagation();
        const current = getPref();
        const order = ["auto", "light", "dark"];
        const next = order[(order.indexOf(current) + 1) % order.length];
        setThemePref(next);
        updateButtonUI(next);
    });

    try {
        if (window.matchMedia && typeof window.matchMedia === "function") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = (): void => {
                if (!getStoredPreference()) {
                    updateButtonUI("auto");
                }
            };
            if (typeof mq.addEventListener === "function")
                mq.addEventListener("change", handler);
            else if (typeof mq.addListener === "function")
                (mq.addListener as (handler: () => void) => void)(handler);
        }
    } catch (e) {
        /* ignore */
    }
}

export function initTheme(): void {
    const stored = getStoredPreference();
    const pref = stored || "auto";
    applyEffectiveTheme(pref);

    try {
        if (window.matchMedia && typeof window.matchMedia === "function") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = (): void => {
                if (!getStoredPreference()) {
                    applyEffectiveTheme("auto");
                }
            };
            if (typeof mq.addEventListener === "function")
                mq.addEventListener("change", handler);
            else if (typeof mq.addListener === "function")
                (mq.addListener as (handler: () => void) => void)(handler);
        }
    } catch (e) {
        /* ignore */
    }
}
