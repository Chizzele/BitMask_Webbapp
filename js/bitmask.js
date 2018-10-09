$(document).ready(function(){
  // Setting Jquery Listeners for chage events
  var bitmaskObject = $('#bitmaskString');
  var bitmaskOperatorObject = $('#bitmaskSelect');
  var baseStringObject = $('#baseString');
  var resultObject = $('#result');
  // Initializing the input variables
  var bitMask = $('#bitmaskString').val();
  var selectedOperator = $('#bitmaskSelect').val();
  var baseString = $('#baseString').val();

  // On input of any field, or change of select option from
  // the drop down, run apply mask with updated values
  bitmaskObject.on('input', function(){
    selectedOperator = $('#bitmaskSelect').val();
    bitMask = $('#bitmaskString').val();
    baseString = $('#baseString').val();
    applyMask(baseString, selectedOperator, bitMask);
  });

  bitmaskOperatorObject.on('input', function(e){
    selectedOperator = $('#bitmaskSelect').val();
    bitMask = $('#bitmaskString').val();
    baseString = $('#baseString').val();
    selectedOperator = e.target.value;
    applyMask(baseString, selectedOperator, bitMask);
  });

  baseStringObject.on('input', function(){
    selectedOperator = $('#bitmaskSelect').val();
    bitMask = $('#bitmaskString').val();
    baseString = $('#baseString').val();
    applyMask(baseString, selectedOperator, bitMask);
  });

  // If valid strings are given in both inputs, applies
  // the bitwise mask to the base string and populates
  // the result field
  function applyMask(baseString, operator, maskString){
    if(validInput(baseString, maskString)){
      var baseStringArray = baseString.split('');
      var maskStringArray = maskString.split('');
      var resultArray = new Array(maskStringArray.length);
      if(operator == "XOR"){
        for(var i = 0; i < baseStringArray.length; i++){
          resultArray[i] = (Number(baseStringArray[i]) + Number(maskStringArray[i])) % 2;
        }
      }else if(operator == "AND"){
        for(var i = 0; i < baseStringArray.length; i++){
          Number(baseStringArray[i]) + Number(maskStringArray[i]) == 2 ? resultArray[i] = 1 : resultArray[i] = 0;
        }
      }else if(operator == "OR"){
        for(var i = 0; i < baseStringArray.length; i++){
          Number(baseStringArray[i]) + Number(maskStringArray[i]) > 0  ? resultArray[i] = 1 : resultArray[i] = 0;
        }
      }else{
        resultArray = [0,0,0,0,0,0,0,0];
      }
      resultObject.val(baseString);
    }else{
      resultObject.val('no');
    }
  }
});

// checks that the inputs are valid, which means exactly 8 chars
function validInput(input1, input2){
  var input1TestArr = input1.split('');
  var input2TestArr = input2.split('');
  var flag = 0;
  if(input1TestArr.length == input2TestArr.length && input1TestArr.length == 8){
    for(var i = 0; i < input1TestArr.length; i++){
      if(isBinary(Number(input1TestArr[i])) && isBinary(Number(input2TestArr[i]))){
        flag = 0;
      }else{
        flag = 1
      }
    }
    if(flag == 1){
      return false;
    }else{
      return true;
    }
  }else{
    return false;
  }
}

// Ensures that is binary ( 1 or 0 )
function isBinary(num){
  if(num < 2){
    return true;
  }
}
