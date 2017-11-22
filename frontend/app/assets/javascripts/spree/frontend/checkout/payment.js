Spree.ready(function($) {
  Spree.onPayment = function() {
    if (($('#checkout_form_payment')).is('*')) {
      if (($('#existing_cards')).is('*')) {
        ($('#payment-method-fields')).hide();
        ($('#payment-methods')).hide();
        ($('#use_existing_card_yes')).click(function() {
          ($('#payment-method-fields')).hide();
          ($('#payment-methods')).hide();
          return ($('.existing-cc-radio')).prop("disabled", false);
        });
        ($('#use_existing_card_no')).click(function() {
          ($('#payment-method-fields')).show();
          ($('#payment-methods')).show();
          return ($('.existing-cc-radio')).prop("disabled", true);
        });
      }
      $(".cardNumber").payment('formatCardNumber');
      $(".cardExpiry").payment('formatCardExpiry');
      $(".cardCode").payment('formatCardCVC');
      $(".cardNumber").change(function() {
        return $(this).parent().siblings(".ccType").val($.payment.cardType(this.value));
      });
      ($('input[type="radio"][name="order[payments_attributes][][payment_method_id]"]')).click(function() {
        ($('#payment-methods li')).hide();
        if (this.checked) {
          return ($('#payment_method_' + this.value)).show();
        }
      });
      ($('#cvv_link')).on('click', function(event) {
        var windowName, windowOptions;
        windowName = 'cvv_info';
        windowOptions = 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0,scrollbars=1';
        window.open(($(this)).attr('href'), windowName, windowOptions);
        return event.preventDefault();
      });
      // Activate already checked payment method if form is re-rendered
      // i.e. if user enters invalid data
      return ($('input[type="radio"]:checked')).click();
    }
  };
  return Spree.onPayment();
});
