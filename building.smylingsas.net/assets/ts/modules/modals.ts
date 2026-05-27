type ModalOpenListener = (modalId: string, modal: HTMLDialogElement) => void;

const openListeners: ModalOpenListener[] = [];

export function initModals(): void {
    document.querySelectorAll<HTMLElement>("[data-modal-target]").forEach((btn: HTMLElement): void => {
        btn.addEventListener("click", (): void => {
            const modalId = btn.getAttribute("data-modal-target");
            if (modalId) {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                if (modal?.showModal) {
                    modal.showModal();
                    openListeners.forEach((fn: ModalOpenListener): void => {
                        try {
                            fn(modalId, modal);
                        } catch (e) {
                            console.warn("modal open listener error", e);
                        }
                    });
                }
            }
        });
    });

    document.querySelectorAll<HTMLElement>("dialog .close-modal").forEach((btn: HTMLElement): void => {
        btn.addEventListener("click", (): void => {
            const modal = btn.closest("dialog") as HTMLDialogElement | null;
            modal?.close();
        });
    });

    document.querySelectorAll<HTMLDialogElement>("dialog").forEach((modal: HTMLDialogElement): void => {
        modal.addEventListener("click", (e: MouseEvent): void => {
            const rect = modal.getBoundingClientRect();
            const isInside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (!isInside) {
                modal.close();
            }
        });
    });
}

export function addModalOpenListener(fn: ModalOpenListener): void {
    if (typeof fn === "function") openListeners.push(fn);
}
