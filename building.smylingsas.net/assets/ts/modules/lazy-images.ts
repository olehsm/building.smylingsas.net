export function initLazyImages(): void {
    const images = document.querySelectorAll<HTMLImageElement>("img.lazy-image");
    images.forEach((img: HTMLImageElement): void => {
        if (img.complete) {
            img.style.filter = "none";
        } else {
            img.addEventListener("load", (): void => {
                img.style.filter = "none";
            });
        }
    });
}
