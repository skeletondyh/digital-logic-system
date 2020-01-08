$(function() {
    $('#jumpProbBtn').click(function() {
        console.log('jump btn clicked');
        if ($('#jumpProb').val()) {
            location.href = '/problem/' + $('#jumpProb').val();
        }
    });
});