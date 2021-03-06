const __civerifi = function(data){
    var invalid_characters = /[0-9]/;
    var item_returned = { value : null, message : null };
    var validity_char = invalid_characters.test(data);
    const number = Number(data);
    if(data.toString().indexOf(" ") !== -1){
        item_returned.message = false;
        item_returned.value = "";
        return item_returned;
    }
    if(!validity_char || isNaN(number)){
        item_returned.message = "Caracter Invalido";
        item_returned.value = false;
        return item_returned;
    }
    item_returned.message = false;
    if(data.toString().length < 7 ){
        item_returned.message = "Longitud debe ser mayor a 7";
    }
    item_returned.value = data;
    
    return item_returned;
}
module.exports = __civerifi;