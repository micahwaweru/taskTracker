console.log('hello world')


var formDisp = document.getElementById('formDisp');
var taskFormCont = document.getElementById('taskFormCont');
var taskForm = document.getElementById('taskForm');
var submit = document.getElementById('submit');


var removeHide = function(element){
    console.log('removeHide func trig')
    element.classList.remove('hide')
}

var taskFormHandler = function(){
    console.log(`${taskForm.taskTitle.value} ${taskForm.taskDesc.value}`)
    var formValues = {
        titleObj: taskForm.taskTitle.value,
        descObj: taskForm.taskDesc.value
    }
    console.log(formValues);
    
}

formDisp.addEventListener('click', function(){
    removeHide(taskFormCont)
});

submit.addEventListener('click', function(e){
    e.preventDefault();
    taskFormHandler();
})

