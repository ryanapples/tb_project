$(document).ready(function(){
    handleSubmitBtn();
});

/* ---------------------------------------------- /*
* E-mail validation
/* ---------------------------------------------- */
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

/* ---------------------------------------------- /*
* Handle Submit Button
/* ---------------------------------------------- */
function handleSubmitBtn() {
    $('.signup_button').click(function(){
        console.log('submit clicked');
        formFieldInfo();
        clearContactForm();
    });
}

/* ---------------------------------------------- /*
* Form Field Data
/* ---------------------------------------------- */
function formFieldInfo() {
    var contestObj = {
        name: $('#c_name').val(),
        email: $('#c_email').val()
    }
    // users are required to input valid values into input fields
    if(contestObj.name === '' && contestObj.name.length < 2 || contestObj.email=== '' || (!isValidEmailAddress(contestObj.email) )) {
        messages.error();
        return;
    }
    else {
        messages.success();
        sendData(contestObj);
    }
}

var messages = {
    name: 'Please enter valid name.',
    email: 'Please enter valid email address.',
    error: function() {
        $('#form').addClass('has-danger');
        $('#c_name').addClass('form-control-danger').attr('placeholder', 'Field required');
        $('#c_email').addClass('form-control-danger').attr('placeholder', 'Field required');
    },
    success: function() {
        $('#form').removeClass('has-danger').addClass('has-success');
        $('#c_name').removeClass('form-control-danger').addClass('form-control-success').attr('placeholder', 'Woohoo!');
        $('#c_email').removeClass('form-control-danger').addClass('form-control-success').attr('placeholder', 'Goodluck!');
    }
}

/* ---------------------------------------------- /*
* Clear Form Field Data
/* ---------------------------------------------- */
function clearContactForm(){
    $('#c_name').val('');
    $('#c_email').val('');
}

/* ---------------------------------------------- /*
* Send Data to CSV
/* ---------------------------------------------- */
function sendData(formObj) {
    console.log('sendData info ', formObj);
    $.ajax({
        url: 'contestForm.csv',
        data: {
            'name': formObj.name,
            'E-mail': formObj.email,
        },
        dataType: 'json',
        method: 'post',
        success: function(data) {
            console.log(data);
            console.log('data sent to csv file: ', data);
        },
        error: function(data) {
            console.log('error with data submission: ', data);
        }
    });
}