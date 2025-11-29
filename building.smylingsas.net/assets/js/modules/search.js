export function initSearch() {
    const input = document.getElementById("searchInput");
    const dialog = document.getElementById("searchDialog");

    if (!input || !dialog) {
        return;
    }

    function findPagefindInput() {
        const container = document.getElementById("search");
        if (!container) return null;
        // Pagefind renders an input inside the container. Try common selectors.
        return container.querySelector('input[type="search"], input');
    }

    function setPagefindValue(value) {
        const pfInput = findPagefindInput();
        if (!pfInput) return false;
        pfInput.value = value;
        // dispatch input event so Pagefind responds
        pfInput.dispatchEvent(new Event("input", { bubbles: true }));
        return true;
    }

    input.addEventListener("input", () => {
        const val = input.value || "";
        if (val.trim() === "") return;

        if (!dialog.open) {
            // Open the dialog and then try to populate Pagefind's input.
            dialog.showModal();
            // Pagefind UI might take a tick to mount; try a few attempts.
            let attempts = 0;
            const tryPopulate = () => {
                attempts += 1;
                const ok = setPagefindValue(val);
                if (ok) {
                    // focus the third-party input so typing continues there
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
            // dialog already open: directly update the Pagefind input
            setPagefindValue(val);
        }
    });
}
