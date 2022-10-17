loadData();
var auto_id;


var txt_title = document.getElementById('txt_title');
var rbtn_bug = document.getElementById('rbtn_bug');
var select_status = document.getElementById('select_status');
var select_priority = document.getElementById('select_priority');
var date_picker = document.getElementById('date_picker');
var area_description = document.getElementById('area_description');

function addtask(task){

}
function loadData(){
    for (t of tasks){
        let table , task_icon;

        if(t.status == 'to-do'){
            table = document.querySelector(".to-do .table-body");
            task_icon = 'bi bi-question-circle-fill text-green';
        }else if (t.status == 'in-progress'){
            table = document.querySelector(".in-progress .table-body");
            task_icon = 'spinner-border text-green';
        }else{
            table = document.querySelector(".done .table-body");
            task_icon = 'bi bi-check-circle-fill text-green';
        }

        // creating task button
        const task = document.createElement("button");
        task.classList.add("task", "d-flex", "p-3", "w-100", "border-0", "border-bottom");
        task.innerHTML = `
        <span class="task-status">
            <i class="${task_icon}"></i>
        </span>
        <div class="task-body text-start pl-3">
            <div class="task-title">${t.title}</div>
            <div class="task-details">
                <div class="task-date">#${t.id} created in ${t.date}</div>
                <div class="task-description" title="${t.description}">${t.description.slice(0,55)}...</div>
            </div>
            <div class="task-features">
                <span class="task-priority p-2 rounded-3">${t.priority}</span>
                <span class="task-type p-2 rounded-3">${t.type}</span>
            </div>
        </div>`
        task.setAttribute("id",t.id)
        table.append(task);
        auto_id = t.id + 1;
    }
}
function ajouter(){
    
    let table , task_icon;
    if( select_status.value == 'to-do'){
        table = document.querySelector(".to-do .table-body");
        task_icon = 'bi bi-question-circle-fill text-green';
    }else if ( select_status.value == 'in-progress'){
        table = document.querySelector(".in-progress .table-body");
        task_icon = 'spinner-border text-green';
    }else{
        table = document.querySelector(".done .table-body");
        task_icon = 'bi bi-check-circle-fill text-green';
    }

    // creating task button
    const task = document.createElement("button");
    task.classList.add("task", "d-flex", "p-3", "w-100", "border-0", "border-bottom");

    let type ;
    if(rbtn_bug.checked){
        type = 'Bug';
    }else{
        type = 'Feature';
    }
    task.innerHTML = `
    <span class="task-status">
        <i class="${task_icon}"></i>
    </span>
    <div class="task-body text-start pl-3">
        <div class="task-title">${txt_title.value}</div>
        <div class="task-details">
            <div class="task-date">#${auto_id} created in ${date_picker.value}</div>
            <div class="task-description" title="${area_description.value}">${area_description.value.slice(0,55)}...</div>
        </div>
        <div class="task-features">
            <span class="task-priority p-2 rounded-3">${select_priority.value}</span>
            <span class="task-type p-2 rounded-3">${type}</span>
        </div>
    </div>`
    task.setAttribute("id",auto_id);
    table.append(task);
    auto_id++;
}