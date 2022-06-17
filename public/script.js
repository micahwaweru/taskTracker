console.log('hello world')


var formDisp = document.getElementById('formDisp');
var taskFormCont = document.getElementById('taskFormCont');
var taskForm = document.getElementById('taskForm');
var submit = document.getElementById('submit');
var taskList = document.getElementById('taskList');


var removeHide = function(element){
    console.log('removeHide func trig')
    element.classList.remove('hide')
}

var taskFormHandler = function(){
    console.log(`${taskForm.taskTitle.value} ${taskForm.taskDesc.value}`)
    var formValues = {
        title: taskForm.taskTitle.value,
        desc: taskForm.taskDesc.value
    }
    console.log(formValues);
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/addTask',true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(formValues))
    
}

var elBuilder = function(obj){
    for(i=0;i<obj.length;i++){
        console.log(obj[i].title)
        var taTi = obj[i].title;
        var taDe=obj[i].desc;
        var taId=obj[i].id;

        var listCard = document.createElement('div')
        listCard.classList.add('card')
        taskList.appendChild(listCard)

            var btnDiv = document.createElement('div')
            btnDiv.classList.add('card-header', 'd-flex','flex-row','mb-2')
            listCard.appendChild(btnDiv)
            var btnEl=document.createElement('button')
            btnEl.innerHTML = "Done";
            btnEl.classList.add('btn','btn-primary');
            btnEl.setAttribute('id',`${taId}`)
            btnDiv.appendChild(btnEl);
            var heEl=document.createElement('h3');
            heEl.innerHTML=taTi;
            heEl.classList.add('p-2');
            btnDiv.appendChild(heEl);

            var desDiv=document.createElement('div')
            desDiv.classList.add('card-body')
            listCard.appendChild(desDiv)
            var blk=document.createElement('blockquote')
            blk.classList.add('blockquote','mb-0')
            desDiv.appendChild(blk)
            var desTxt=document.createElement('p')
            desTxt.innerHTML= taDe;
            desDiv.appendChild(desTxt);

        btnEl.addEventListener('click',function(e){
            e.preventDefault();
            console.log(e.target.id)
            selTask=e.target.id;
            fetch(`/deleteTask/${selTask}`,{method:'DELETE'})
            location.reload();
        })


    }
}

var taskPop = function(){
    fetch('/viewTasks',{
        'method':'GET',
        'headers':{
            'Content-Type': 'application/json'
        }
    })
    .then(
        function(response){
            response.json().then(function(data){
                console.log(data);
                elBuilder(data)
        
            })
        }
    )
}






formDisp.addEventListener('click', function(){
    removeHide(taskFormCont)
});

submit.addEventListener('click', function(){
    taskFormHandler();
})

taskPop();