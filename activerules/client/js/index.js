$(document).on('pageinit', '#login', function () {
    $(document).on('click', '#submit', function () { // catch the form's submit event
        if ($('#email').val().length > 0 && $('#password').val().length > 0) {
            $.ajax({url: '/api/v1/Users/login',
                data: $('#check-user').serialize(),
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
                        alert('Logon unsuccessful!');
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

