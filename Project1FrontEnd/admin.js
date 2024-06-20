function limparForm(){
    var form = document.getElementById('formadm');
    form.reset();
}

document.getElementById('limpar').addEventListener('click', limparForm);