var auto_id , task_to_update_id;
var to_do_count = 0, in_progress_count = 0, done_count = 0;
//setting local storage
var locat_tasks = tasks;

//modal input
var txt_title = document.getElementById('txt_title');
var rbtn_bug = document.getElementById('rbtn_bug');
var select_status = document.getElementById('select_status');
var select_priority = document.getElementById('select_priority');
var date_picker = document.getElementById('date_picker');
var area_description = document.getElementById('area_description');
//modal input update
var update_txt_title = document.getElementById('update_txt_title');
var update_rbtn_bug = document.getElementById('update_rbtn_bug');
var update_rbtn_feature = document.getElementById('update_rbtn_feature');
var update_select_status = document.getElementById('update_select_status');
var update_select_priority = document.getElementById('update_select_priority');
var update_date_picker = document.getElementById('update_date_picker');
var update_area_description = document.getElementById('update_area_description');
//table counts
function update_task_counts(){
    document.getElementById("to-do-tasks-count").textContent = to_do_count;
    document.getElementById("in-progress-tasks-count").textContent = in_progress_count;
    document.getElementById("done-tasks-count").textContent = done_count;
}
// CRUD function
function setDataToUpdate(id){
    for(t of locat_tasks){
        if(t.id == id){
            task_to_update_id = t.id;

            update_txt_title.value = t.title;
            if(t.type == 'Bug'){
                update_rbtn_bug.checked = true;
            }else{
                update_rbtn_feature.checked = true;
            }
            update_select_status.value = t.status;
            update_select_priority.value = t.priority;
            update_date_picker.value = t.date;
            update_area_description.value = t.description;
            break;
        }
    }
}
function printTask(t){
    let table , task_icon;
    if(t.status == 'to-do'){
        table = document.querySelector(".to-do .table-body");
        task_icon = 'bi bi-question-circle-fill text-green';
        to_do_count++;
    }else if (t.status == 'in-progress'){
        table = document.querySelector(".in-progress .table-body");
        task_icon = 'spinner-border text-green';
        in_progress_count++;
    }else{
        table = document.querySelector(".done .table-body");
        task_icon = 'bi bi-check-circle-fill text-green';
        done_count++;
    }

    // creating task button
    const task = document.createElement("button");
    task.classList.add("task", "d-flex", "p-3", "w-100", "border-0", "border-bottom");
    task.setAttribute("onclick","setDataToUpdate(this.getAttribute('id'));");
    task.dataset.bsToggle = "modal";
    task.dataset.bsTarget = "#modal-task-update";
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
    update_task_counts();
}
function clearTasks(){
    var elements = document.querySelectorAll('.task');
    for(el of elements){
        el.remove();
    }
    to_do_count = in_progress_count = done_count = 0;
}
function loadData(){
    for (t of locat_tasks){
        printTask(t);
        auto_id = t.id + 1;
    }
}
function add(){

    txt_title.value = "";
    rbtn_bug.checked = true;
    
    let task_type ;

    if(rbtn_bug.checked){
        task_type = 'Bug';
    }else{
        task_type = 'Feature';
    }

    task = {
        id:auto_id,
        title         :   txt_title.value,
        type          :   task_type,
        priority      :   select_priority.value,
        status        :   select_status.value,
        date          :   date_picker.value,
        description   :   area_description.value
    }
    locat_tasks.push(task);
    printTask(task);
    auto_id++;
}
function updateTask(){
    for(t of locat_tasks){
        if(t.id == task_to_update_id){
            t.title = update_txt_title.value;
            if(update_rbtn_bug.checked){
                t.type = 'Bug';
            }else{
                t.type = 'Feature';
            }
            t.status = update_select_status.value;
            t.priority = update_select_priority.value;
            t.date = update_date_picker.value ;
            t.description = update_area_description.value ;
            break;
        }
    }
    clearTasks();
    loadData();
}
function deleteTask(){
    // locat_tasks.splice(task_to_update_id-1,1);
    clearTasks();
    loadData();
}
loadData();
