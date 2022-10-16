var auto_id = 1;


var title = document.getElementById('txt_title');
var rbtn_bug = document.getElementById('rbtn_bug');
var select_status = document.getElementById('select_status');
var select_priority = document.getElementById('select_priority');
var date_picker = document.getElementById('date_picker');
var area_description = document.getElementById('area_description');

function printData(){
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
        let id = t.id;
        let title = t.title;
        let date = t.date;
        let description = t.description.slice(0,55);
        let description_argument = t.description;
        let priority = t.priority;
        let type = t.type;
        task.innerHTML = `
        <span class="task-status">
            <i class="${task_icon}"></i>
        </span>
        <div class="task-body text-start pl-3">
            <div class="task-title">${title}</div>
            <div class="task-details">
                <div class="task-date">#${id} created in ${date}</div>
                <div class="task-description" title="${description_argument}">${description}...</div>
            </div>
            <div class="task-features">
                <span class="task-priority p-2 rounded-3">${priority}</span>
                <span class="task-type p-2 rounded-3">${type}</span>
            </div>
        </div>`
        task.setAttribute("id",auto_id)
        table.append(task);
        auto_id++;
    }
    
}