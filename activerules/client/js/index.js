$(document).on('pagecreate', '#login', function () {
    $(document).on('click', '#login-submit', function () { // catch the form's submit event
        if ($('#login-email').val().length > 0 && $('#login-password').val().length > 0) {
            $.ajax({url: '/api/v1/Users/login',
                data: $('#login-form').serialize(),
                type: 'post',
                async: 'true',
                dataType: 'json',
                beforeSend: function () {
                    // This callback function will trigger before data is sent
                    $.mobile.loading('show'); // This will show ajax spinner
                },
                complete: function () {
                    // This callback function will trigger on data sent/received complete
                    $.mobile.loading('hide'); // This will hide ajax spinner
                },
                success: function (result) {
                    if (result.id) {
                        $.mobile.changePage("#profile");
                    } else {
                        $("#errors").html('Login unsuccessful');                 
                        $("#dlg-error").popup('open');
                    }
                },
                error: function (response, status, error) {
                    
                    $("#errors").html(response.responseJSON.error.message);                 
                    $("#dlg-error").popup('open');

                }
            });
        } else {
            $("#errors").html('Please fill in all fields');                 
            $("#dlg-error").popup('open');
        }
        return false; // cancel original event to prevent form submitting
    });
});

$( document ).on( "pagecontainerbeforechange", function ( event, data ) {
    
    var absUrl = data.absUrl ? $.mobile.path.parseUrl(data.absUrl).hash.split("#")[1] : "";
 
   //alert( absUrl);
});

$("#login").on("pagecontainerbeforeshow", 
    function( event, ui ) {
         
              alert('login');
 
    }
);

var forms = [];

forms['signup'] = {
    fields: ['email', 'password']
}

var fields = [];

fields['email'] = {
    type: "text",
    label: "Email"
};

fields['password'] = {
    type: "password",
    label: "Password"
};


$(document).on("pagecontainerbeforeshow", 
    function( event, ui ) {
         if(ui.toPage[0].id === "signup"){
              // Do stuff
              var fields = forms.signup.fields;
              fields.forEach(function(item, index) {
                  // alert(item);
              })
            
              return assembleForm('signup', null, function(err, formStr) {
                  console.log(formStr);  
                  $("#signup-form").html(formStr);
              });
              
              
         }
    }
);

function assembleForm(name, data, cb) {
    var fields = forms[name].fields;
    
    var formString = '<form>';
    formString = formString.concat('<button>Submit</button></form>');
    
    cb(false, formString);
    
    var formData = {};
    
    fields.forEach(function(field, index) {
        formString.concat(assembleField(field, formData));
    })
    
    formString.concat('<button>Submit</button></form>');
    
    return formString;
}

function assembleField(field, formData) {
    fieldDef = fields[field];
    
    fieldString = '';
    
    if(fieldDef.type === 'text') {
        fieldString.concat('<input type="text" name="'+field+'" id="" value="">');
    }
    
    return fieldString;
    
}

var F = kbpgp["const"].openpgp;

function createKey() {
    var opts = {
        userid: "User McTester (Born 1979) <user@example.com>",
        primary: {
          nbits: 4096,
          flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
          expire_in: 0  // never expire
        },
        subkeys: [
          {
            nbits: 2048,
            flags: F.sign_data,
            expire_in: 86400 * 365 * 8 // 8 years
          }, {
            nbits: 2048,
            flags: F.encrypt_comm | F.encrypt_storage,
            expire_in: 86400 * 365 * 8
          }
        ]
      };

      kbpgp.KeyManager.generate(opts, function(err, alice) {
          if (!err) {
        // sign alice's subkeys
        alice.sign({}, function(err) {
          console.log(alice);
          // export demo; dump the private with a passphrase
          alice.export_pgp_private ({
            passphrase: 'booyeah!'
          }, function(err, pgp_private) {
            console.log("private key: ", pgp_private);
          });
          alice.export_pgp_public({}, function(err, pgp_public) {
            localStorage.publicKey = pgp_public;
            console.log("public key: ", pgp_public);
          });
        });
      }
    });
}

function showLocalStorage() {
    console.log(localStorage.publicKey);
    alert(localStorage.publicKey);
}

function createBTC() {
    var keyPair = bitcoin.ECPair.makeRandom()

    // Print your private key (in WIF format)
    console.log(keyPair.toWIF())
    // => Kxr9tQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct

    // Print your public key address
    console.log(keyPair.getAddress())
    // => 14bZ7YWde4KdRb5YN7GYkToz3EHVCvRxkF
}


