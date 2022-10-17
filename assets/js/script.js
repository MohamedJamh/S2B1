var auto_id;
var to_do_count = 0 , in_progress_count = 0 , done_count = 0 ;
loadData();
tasks.push(
    {
        id            :   28,
        title         :   'test',
        type          :   'Feature',
        priority      :   'High',
        status        :   'to-do',
        date          :   '2022-10-08',
        description   :   'test'
    }
)
//modal input
var txt_title = document.getElementById('txt_title');
var rbtn_bug = document.getElementById('rbtn_bug');
var select_status = document.getElementById('select_status');
var select_priority = document.getElementById('select_priority');
var date_picker = document.getElementById('date_picker');
var area_description = document.getElementById('area_description');
//evten listner on task
var targeted_task = document.querySelector('.task');
targeted_task.addEventListener("click",e =>{
    console.log(this);
})
//table counts
function update_task_counts(){
    document.getElementById("to-do-tasks-count").textContent = to_do_count;
    document.getElementById("in-progress-tasks-count").textContent = in_progress_count;
    document.getElementById("done-tasks-count").textContent = done_count;
}
// CRUD function
function addtask(t){
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
    task.dataset.bsToggle = "modal";
    task.dataset.bsTarget = "#modal-task";
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
function loadData(){
    for (t of tasks){
        addtask(t);
        auto_id = t.id + 1;
    }
}
function add(){
    
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
    addtask(task);
    auto_id++;
}