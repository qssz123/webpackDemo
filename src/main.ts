// import a from "./a"
import './a.css'
import dioag from "./components/dioag"

let dioag1 = document.getElementById("dioagId");
dioag1.addEventListener("click", function () {
    dioag({
        width: '800px', height: '500px', title: 'demo', content: (data) => {
            console.log(data)
        }
    });
})

