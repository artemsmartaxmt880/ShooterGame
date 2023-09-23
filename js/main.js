const btn_one = document.getElementById('btn_one');
const btn_two = document.getElementById('btn_two');
const btn_tree = document.getElementById('btn_tree');
const btn_four = document.getElementById('btn_four');
const q1 = document.getElementsByName("q1");
const q2 = document.getElementsByName("q2");
const q3 = document.getElementsByName("q3");
const q4 = document.getElementsByName("q4");

btn_one.addEventListener('click', item_one);
function item_one() {
    for (let i = 0; i < q1.length; i++) {
        if (q1[i].checked) {
            let qv1 = q1[i].value;
            let result = 0;

            if (qv1 == 2) {
                result = 'yes';
            }
            else result = 'no';
            document.getElementById('result_one').textContent = (result);
            break;
        }
    }
}
btn_two.addEventListener('click', item_two);
function item_two() {
    for (let i = 0; i < q2.length; i++) {
        if (q2[i].checked) {
            let qv2 = q2[i].value;
            let result = 0;

            if (qv2 == 3) {
                result = 'yes';
            }
            else result = 'no';
            document.getElementById('result_two').textContent = (result);
            break;
        }
    }
}
btn_tree.addEventListener('click', item_tree);
function item_tree() {
    for (let i = 0; i < q3.length; i++) {
        if (q3[i].checked) {
            let qv3 = q3[i].value;
            let result = 0;

            if (qv3 == 4) {
                result = 'yes';
            }
            else result = 'no';
            document.getElementById('result_tree').textContent = (result);
            break;
        }
    }
}
btn_four.addEventListener('click', item_four);
function item_four() {
    for (let i = 0; i < q4.length; i++) {
        if (q4[i].checked) {
            let qv4 = q4[i].value;
            let result = 0;

            if (qv4 == 1) {
                result = 'yes';
            }
            else result = 'no';
            document.getElementById('result_four').textContent = (result);
            break;
        }
    }
}
