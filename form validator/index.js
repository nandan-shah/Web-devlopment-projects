const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//function to show error
function showError( input, message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    var small=formControl.querySelector('small');
    small.innerText= message;
}

function showSuccess( input){
    const formControl=input.parentElement;
    
    formControl.className='form-control success';
    
}
//email 
function validEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email,'Email is not valid')
    }
}
//check fuction
function checkRequireed(inputArr){
     inputArr.forEach(function(input){
       if (input.value.trim()=== '') {
           showError(input, `${getFieldName(input)} is require`);
       } else {
           showSuccess(input);
       }
     });
}
//get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}
//check length
function checkLength(input , min , max){
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be greater than ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`); 
    }
    else{
        showSuccess(input2);
    }
}

//password check
function passwordCheck(input1 , input2){
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not match');
    }
}
form.addEventListener('submit',function(evt){
evt.preventDefault();
 checkRequireed([ username,email,password,password2 ]);
 checkLength(username , 3, 15);
 checkLength(password,6,25);
 
 validEmail(email);
 passwordCheck(password , password2);
});