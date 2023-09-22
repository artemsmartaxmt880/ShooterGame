const btn = document.querySelector('.test__btn');
const q1 = document.getElementsByName("q1");

// q1.forEach(radio => {
//     if (radio.checked) {
//     }
// });
btn.addEventListener('click',pos);
function pos(){
    for (let i = 0; i < q1.length; i++) {
        if (q1[i].checked) {
            console.log(q1[i].value);
            break;
        }
    }
}

