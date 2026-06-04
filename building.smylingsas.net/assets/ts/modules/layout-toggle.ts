export function initLayoutToggle(): void {
    const gridButton = document.getElementById("grid-view-btn");
    const listButton = document.getElementById("list-view-btn");
    const listGrid = document.querySelector(".list-grid");

    if (!gridButton || !listButton || !listGrid) return;

    function setView(view: string): void {
        if (view === "grid") {
            listGrid!.classList.remove("list-view");
            gridButton!.classList.add("active");
            listButton!.classList.remove("active");
            localStorage.setItem("listView", "grid");
        } else {
            listGrid!.classList.add("list-view");
            listButton!.classList.add("active");
            gridButton!.classList.remove("active");
            localStorage.setItem("listView", "list");
        }
    }

    gridButton.addEventListener("click", (): void => setView("grid"));
    listButton.addEventListener("click", (): void => setView("list"));

    const savedView = localStorage.getItem("listView") || "grid";
    setView(savedView);
}
