let btndm = document.getElementById("join_buttondm")
btndm.addEventListener("click", dm)
function dm() {
    console.log("клик")
    alt.emit("DMConnect", 1);
}
