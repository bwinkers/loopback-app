$(document).on('pageinit', '#login', function(){  
        $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#email').val().length > 0 && $('#password').val().length > 0){
                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                    $.ajax({url: '/api/v1/Users/login',
                        data: $('#check-user').serialize(),
                        type: 'post',                   
                        async: 'true',
                                                dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                           // $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                           // $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
                            if(result.id) {
                                $.mobile.changePage("#profile");                         
                            } else {
                                alert('Logon unsuccessful!'); 
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });                   
            } else {
                alert('Please fill all necessary fields');
            }           
            return false; // cancel original event to prevent form submitting
        });    
});
