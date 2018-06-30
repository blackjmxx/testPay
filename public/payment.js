function init() {

    var trans_id = '';
    /*var trans_id = document.getElementById('trans_id');
    trans_id.value = Math.floor((Math.random() * 10000000) + 10000);

    var amount = document.getElementById('amount');
    amount.value = Math.floor((Math.random() * 100) + 5);

    var custom = document.getElementById('cpm_custom');
    custom.value = Math.floor((Math.random() * 99999) + 7);*/

    //-------------Configuration
    CinetPay.setConfig({
        apikey: '9171204505a8177d723b591.18230557',
        site_id: 685921,
        notify_url:"https://pg-app-74w9kvxmpn4wk9x0hy3cxurvreesex.scalabl.cloud/1/functions/ValidateTransaction"
    });
    //-------------Gestion des evenements
    //error
    CinetPay.on('error', function (e) {
        $('.home-invite-friend-banner').attr("style", "display: block !important");
        $('#az-header-wrapper').attr("style", "display: block !important");
        var error_div = document.getElementById('error_info');
        error_div.innerHTML = "<div class='error form-group'><div class='alert-danger alert'>"+
            "Opération interronpu, veuilez réessayer.</div></div>";
        // error_div.innerHTML += '<b>Error code:</b>' + e.code + '<br><b>Message:</b>:' + e.message;
    });
    //ajax
    CinetPay.on('ajaxStart', function () {
        document.getElementById('bt_get_signature').setAttribute('disabled', 'disabled');
    });
    CinetPay.on('ajaxStop', function () {
        document.getElementById('bt_get_signature').removeAttribute('disabled');
    });
    //Lorsque la signature est généré
    CinetPay.on('signatureCreated', function (token) {
        console.log('Tocken généré: ' + token);
    });
    CinetPay.on('paymentPending', function (e) {
        //$('.az-header-wrapper').css("display", "block");
        //$('.home-invite-friend-banner').css("display", "block");
        // var error_div = document.getElementById('error_info');
        // error_div.innerHTML = 'Paiement en cours <br>';
        //error_div.innerHTML += '<b>code:</b>' + e.code + '<br><b>Message:</b>:' + e.message;
    });
    CinetPay.on('paymentSuccessfull', function (paymentInfo) {
        console.log(paymentInfo);
        if (typeof paymentInfo.lastTime != 'undefined') {
            if (paymentInfo.cpm_result == '00') {
                $('.home-invite-friend-banner').attr("style", "display: block !important");
                $('#az-header-wrapper').attr("style", "display: block !important");
                $.blockUI({ message: '<h3>Initialisation</h3><p>Veuillez patientez pendant l\'initialisation du transfert d\'argent</p>' });

                $.ajax({
                    type:"GET",
                    //dataType: "json",
                    url: "returns",
                    data: {
                        transaction_id:trans_id
                        //phone:paymentInfo.cpm_phone_prefixe+paymentInfo.cel_phone_num
                    }
                })
                    .done(function(data) {

                        //swal.close();
                        $.unblockUI();
                        if(data.status){
                            document.location.href = '/return/transfert/success';
                        }else{
                            document.location.href = '/return/transfert/error';
                        }

                    })
                    .fail(function(jqXHR, textStatus) {
                        $.unblockUI();
                        console.log(jqXHR);
                    });

            } else {
                $('.home-invite-friend-banner').attr("style", "display: block !important");
                $('#az-header-wrapper').attr("style", "display: block !important");
                var error_div = document.getElementById('error_info');
                error_div.innerHTML = "<div class='error form-group'><div class='alert-danger alert'>"+
                    "Opération a subi interruption, veuillez réessayer.</div></div>";
            }
        }
    });

    //Application des méthodes
    var bt_get_signature = document.getElementById('bt_get_signature');
    bt_get_signature.addEventListener('click', function () {
        /*CinetPay.setSignatureData({
            amount: parseInt(document.getElementById('amount').value),
            trans_id: document.getElementById('trans_id').value,
            currency: document.getElementById('currency').value,
            designation: document.getElementById('designation').value,
            custom: document.getElementById('cpm_custom').value
        });
        CinetPay.getSignature();*/

        //var amount = $('#amount').val();

                //document.getElementsByClassName('home-invite-friend-banner').style.display = 'none!important';
                $('.home-invite-friend-banner').attr("style", "display: none !important");
                $('#az-header-wrapper').attr("style", "display: none !important");
                //$('#az-header-wrapper').css("display", "none!important");
                //$('.home-invite-friend-banner').css("display", "none!important");

                
                CinetPay.setSignatureData({
                    amount: 5,
                    trans_id: "00000002",
                    currency: "CFA",
                    designation: "azert",
                    custom: "zert"
                });
                CinetPay.getSignature();

    });

}    
