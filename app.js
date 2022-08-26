//UI var
const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const inputValue = document.querySelector('#task');
const filter = document.querySelector('#filter');

//Load all event listener
getAllEvent();

//getAllEvent()
function getAllEvent(){
    //DOM Task Event
    document.addEventListener('DOMContentLoaded',getTask);

    //Add Task
    form.addEventListener('submit',addTask);

    //remove Single li
    ul.addEventListener('click',removeTask);

    //Filter Task
    filter.addEventListener('keyup',filterTask);

    //clear task at once
    clrBtn.addEventListener('click',clearTask);
}

//Get Task from LS
function getTask(){
    let items;
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function(list){
                //create li
                const li = document.createElement('li');

                //Add Class Name
                li.className = 'collection-item';
            
                //Add text node and Append
                li.appendChild(document.createTextNode(list));
            
                //create link element
                const link = document.createElement('a');
            
                //Add link Class Name
                link.className = 'delete-item secondary-content';
            
                //Add icon element to link element
                link.innerHTML = '<i class="fa fa-remove"></i>';
            
                //Append link to li element
                li.appendChild(link);
            
                //Append li to ul
                ul.appendChild(li);
    });
}

//Add Task
function addTask(e){

    if(inputValue.value===''){
        alert('Add Task!!!');
    }

    //create li
    const li = document.createElement('li');

    //Add Class Name
    li.className = 'collection-item';

    //Add text node and Append
    li.appendChild(document.createTextNode(inputValue.value));

    //create link element
    const link = document.createElement('a');

    //Add link Class Name
    link.className = 'delete-item secondary-content';

    //Add icon element to link element
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append link to li element
    li.appendChild(link);

    //Append li to ul
    ul.appendChild(li);

    //Store Task to Local Storage
    storeTaskToLocalStorage(inputValue.value);

    //Clear input
    inputValue.value = '';

    e.preventDefault();
}

//Store Task to Local Storage
function storeTaskToLocalStorage(task){
    let items;
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(task);

    localStorage.setItem('items',JSON.stringify(items));
}


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure??')){
            e.target.parentElement.parentElement.remove();

            //Remove Task from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

//Remove Task from LS
function removeTaskFromLocalStorage(task){
    let items;
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    } 

    items.forEach(function(list,index){
        if(task.textContent === list){
            items.splice(index,1);
        }
    });

    localStorage.setItem('items',JSON.stringify(items));
}


//Filter Task
function filterTask(e){
    const filterText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(filterText)!=-1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}



//Clear Task
function clearTask(){
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }

    //Clear from LS
    clearTaskFromLocalStorage();
}

//Clear Task from LS
function clearTaskFromLocalStorage(){
    localStorage.clear();
}



console.log(JSON.parse(localStorage.getItem('items')));

