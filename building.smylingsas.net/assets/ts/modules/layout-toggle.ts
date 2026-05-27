export function initLayoutToggle(): void {
    const gridBtn = document.getElementById("grid-view-btn");
    const listBtn = document.getElementById("list-view-btn");
    const listGrid = document.querySelector(".list-grid");

    if (!gridBtn || !listBtn || !listGrid) return;

    function setView(view: string): void {
        if (view === "grid") {
            listGrid!.classList.remove("list-view");
            gridBtn!.classList.add("active");
            listBtn!.classList.remove("active");
            localStorage.setItem("listView", "grid");
        } else {
            listGrid!.classList.add("list-view");
            listBtn!.classList.add("active");
            gridBtn!.classList.remove("active");
            localStorage.setItem("listView", "list");
        }
    }

    gridBtn.addEventListener("click", (): void => setView("grid"));
    listBtn.addEventListener("click", (): void => setView("list"));

    const savedView = localStorage.getItem("listView") || "grid";
    setView(savedView);
}
