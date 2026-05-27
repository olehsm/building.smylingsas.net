export function initSearch(): void {
    const input = document.getElementById("searchInput") as HTMLInputElement | null;
    const dialog = document.getElementById("searchDialog") as HTMLDialogElement | null;

    if (!input || !dialog) {
        return;
    }

    function findPagefindInput(): HTMLInputElement | null {
        const container = document.getElementById("search");
        if (!container) return null;
        return container.querySelector<HTMLInputElement>('input[type="search"], input');
    }

    function setPagefindValue(value: string): boolean {
        const pfInput = findPagefindInput();
        if (!pfInput) return false;
        pfInput.value = value;
        pfInput.dispatchEvent(new Event("input", { bubbles: true }));
        return true;
    }

    input.addEventListener("input", (): void => {
        const val = input.value || "";
        if (val.trim() === "") return;

        if (!dialog.open) {
            dialog.showModal();
            let attempts = 0;
            const tryPopulate = (): void => {
                attempts += 1;
                const ok = setPagefindValue(val);
                if (ok) {
                    const pf = findPagefindInput();
                    if (pf) pf.focus();
                    return;
                }
                if (attempts < 10) {
                    setTimeout(tryPopulate, 50);
                }
            };
            setTimeout(tryPopulate, 50);
        } else {
            setPagefindValue(val);
        }
    });
}
