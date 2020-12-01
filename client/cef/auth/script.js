$('.main_background_regButton').click(function () {
    $(".auth").css("display", "none");
    $(".reg").css("display", "block");
});

$('.main_background_authButton').click(function () {
    $(".auth").css("display", "block");
    $(".reg").css("display", "none");
});