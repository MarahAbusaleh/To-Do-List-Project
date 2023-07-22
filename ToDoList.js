const toDoContainer = document.getElementById('toDo');
let addBtn = document.getElementById('btn');
let searchFiled = document.getElementById('searchTask');


async function funAsynch() {

    const response = await fetch('https://64bbae6d7b33a35a444692b6.mockapi.io/tasks');
    const Obj = await response.json();
    let arr = [];

    for(let i = 0 ; i < Obj.length ; i++){

        const contdiv = document.createElement('div');
        const fdiv = document.createElement('div');
        const divContainet = document.createElement('div');
        toDoContainer.appendChild(divContainet);
        divContainet.classList.add('task-container');
        divContainet.style.id = 'divvContainet';
        divContainet.style.display = 'flex';
        divContainet.style.position = 'relative';

        const element = document.createElement('p');
        element.textContent = Obj[i].taskName;
        divContainet.appendChild(element);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        divContainet.appendChild(deleteBtn);
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.right = '120px';

        deleteBtn.addEventListener('click', () => {
            const confirmDelete = window.confirm('Are you sure you want to delete this item?');
            if (confirmDelete) {
                toDoContainer.removeChild(divContainet);
                toDoContainer.removeChild(element2);

                arr.splice(i, 1);

                localStorage.setItem('Tasks', JSON.stringify(arr));
            }
        });

        const updateBtnn = document.createElement('button');
        updateBtnn.textContent = 'Update';
        divContainet.appendChild(updateBtnn);
        updateBtnn.style.position = 'absolute';
        updateBtnn.style.right = '50px';

        updateBtnn.addEventListener('click', () =>{
            const updatedTaskName = prompt('Update this field', element.textContent);
                if (updatedTaskName !== null) {
                    element.textContent = updatedTaskName;
                    Obj[i].taskName = updatedTaskName;
                    arr[i] = updatedTaskName;

                    localStorage.setItem('Tasks', JSON.stringify(arr));
                }
        });

        toDoContainer.appendChild(contdiv);
        contdiv.appendChild(fdiv);
        contdiv.classList.add('contdiv');
        fdiv.appendChild(divContainet);

        const sdiv = document.createElement('div');
        const element2 = document.createElement('hr')
        sdiv.appendChild(element2);

        contdiv.appendChild(sdiv);

        element2.classList.add('hrElement');
        

        arr.push(element.textContent);

    }

    addBtn.addEventListener('click', () => {

        const inputVal = document.getElementById('addTask').value;
        if (inputVal.trim() !== '') {
            
            const divContainet = document.createElement('div');
            toDoContainer.appendChild(divContainet);
            divContainet.classList.add('task-container');
            divContainet.style.display = 'flex';
            divContainet.style.position = 'relative';
    
            const element = document.createElement('p');
            element.textContent = inputVal;
            divContainet.appendChild(element);
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            divContainet.appendChild(deleteBtn);
            deleteBtn.style.position = 'absolute';
            deleteBtn.style.right = '120px';
    
            deleteBtn.addEventListener('click', () => {
                
                const confirmDelete = window.confirm('Are you sure you want to delete this item?');
                if (confirmDelete) {
                    toDoContainer.removeChild(divContainet);
                    toDoContainer.removeChild(element2);

                    const index = arr.findIndex((task) => task === inputVal);
                    if (index !== -1) {
                        arr.splice(index, 1);
                    }

                    localStorage.setItem('Tasks', JSON.stringify(arr));
                }

            });
    
            const updateBtnn = document.createElement('button');
            updateBtnn.textContent = 'Update';
            divContainet.appendChild(updateBtnn);
            updateBtnn.style.position = 'absolute';
            updateBtnn.style.right = '50px';
    
            updateBtnn.addEventListener('click', () => {

                const updatedTaskName = prompt('Update this field', element.textContent);
                if (updatedTaskName !== null) {
                    element.textContent = updatedTaskName;
                    const index = arr.findIndex((task) => task === inputVal);
                    if (index !== -1) {
                        arr[index] = updatedTaskName; 
                    }
                    localStorage.setItem('Tasks', JSON.stringify(arr));
                }
            });
    
            const element2 = document.createElement('hr');
            toDoContainer.appendChild(element2);
            element2.classList.add('hrElement');
    
            arr.push(inputVal);
            localStorage.setItem('Tasks', JSON.stringify(arr));

            document.getElementById('addTask').value = '';
        }
    });

    searchFiled.addEventListener('input', () => {
        const searchQuery = searchFiled.value.trim().toLowerCase();
        search(searchQuery);
    });

    function search(searchQuery) {

        const divContainers = document.getElementsByClassName('contdiv');
        
        for (let i = 0; i < divContainers.length; i++) {
            const divContainet = divContainers[i];
            const taskText = divContainet.querySelector('p').textContent.toLowerCase();
            if (taskText.includes(searchQuery)) {
                divContainet.style.display = "flex";
            } else {
                divContainet.style.display = "none"; 
            }
        }
    }
    
}

funAsynch();