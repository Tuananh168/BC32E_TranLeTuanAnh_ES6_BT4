const getElement = (id) => document.querySelector(id);

toDoList = [];

getElement('#addItem').onclick = () => {
    const work = getElement('#newTask').value;
    toDoList.push(work);
    renderTable();
    luuLocalStorage()
}


remove = (i) => {
    toDoList.splice(i, 1);
    renderTable();
    luuLocalStorage();
}

removeComplete = (i) => {
    arrayComplete.splice(i, 1);
    renderTableComplete();
    luuLocalStorage();
}

arrayComplete = [];

complete = (i) => {
    const workComplete = toDoList.splice(i, 1);
    renderTable()
    arrayComplete.push(workComplete);
    renderTableComplete();
    luuLocalStorage();
}

completeToDoList = (i) => {
    const workToDoList = arrayComplete.splice(i, 1);
    renderTableComplete()
    toDoList.push(workToDoList);
    renderTable();
    luuLocalStorage();
}

renderTable = () => {
    let html = '';
    for (let i = 0; i < toDoList.length; i++) {
        html += `<li>${toDoList[i]}
    <div class="buttons">
        <button class="remove" onclick=remove('${i}')><i class="fa fa-trash"></i></button>
        <button class="complete" onclick=complete('${i}')><i class="fa fa-check-circle"></i></button>
    </div>
    </li>`
    }
    getElement('#todo').innerHTML = html;
}


renderTableComplete = () => {
    let html = '';
    for (let i = 0; i < arrayComplete.length; i++) {
        html += `<li>${arrayComplete[i]}
    <div class="buttons">
        <button class="remove" onclick=removeComplete('${i}')><i class="fa fa-trash"></i></button>
        <button class="complete" onclick=completeToDoList('${i}')><i class="fa fa-check-circle fas"></i></button>
    </div>
    </li>`
    }
    getElement('#completed').innerHTML = html;
}

getElement('#two').onclick = () => {
    toDoList.sort(function (x, y) {
        const a = x.toUpperCase();
        const b = y.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });
    renderTable();
    luuLocalStorage();
}

getElement('#three').onclick = () => {
    toDoList.sort(function (x, y) {
        const a = x.toUpperCase();
        const b = y.toUpperCase();
        return a === b ? 0 : a > b ? -1 : 1;
    });
    renderTable();
    luuLocalStorage();
}


luuLocalStorage = () => {
    const sToDoList = JSON.stringify(toDoList);
    localStorage.setItem('toDolist', sToDoList)
    const sArrayComplete = JSON.stringify(arrayComplete);
    localStorage.setItem('arrayComplete', sArrayComplete)
}

layLocalstorage = () => {
    if (localStorage.getItem('toDolist')) {
        const sToDoList = localStorage.getItem('toDolist');
        toDoList = JSON.parse(sToDoList);
        renderTable(toDoList);
    } if (localStorage.getItem('arrayComplete')) {
        const sArrayComplete = localStorage.getItem('arrayComplete');
        arrayComplete = JSON.parse(sArrayComplete);
        renderTableComplete(arrayComplete);
    }
}

window.onload = () => {
    layLocalstorage()
}


