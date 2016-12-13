/**
 * add num1 and num2 isNum Validation
 * 
 */

exports.compute = function(req,res){
	// These two variables come from the form on
	var operator = req.param("operator");
	var num1 = parseFloat(req.param("num1"));
	var num2 = parseFloat(req.param("num2"));
	console.log("num1:"+num1);
	console.log("num2:"+num2);
	var json_responses;
	
	if(isNaN(num1)=== true || isNaN(num2)=== true){
		json_responses = {"statusCode" : 401, "result":"Error"};
		console.log("Wrong Operands");
		res.send(json_responses);
	}
	
	switch(operator){
		case "+":
			var result = num1 + num2;
			json_responses = {"statusCode" : 200, "result":result};
			console.log("result:"+result);
			res.send(json_responses);
			break;
			
		case "-":
			var result = num1 - num2;
			json_responses = {"statusCode" : 200, "result":result};
			console.log("result:"+result);
			res.send(json_responses);
			break;
			
		case "X":
			var result = num1 * num2;
			json_responses = {"statusCode" : 200, "result":result};
			console.log("result:"+result);
			res.send(json_responses);
			break;
			
		case "/":
			var result;
			if(num2 == 0){
				result = "Cannot Divide by 0";
				json_responses = {"statusCode" : 200, "result":result};
			}
			else{
				result = (num1 / num2);
				json_responses = {"statusCode" : 200, "result":result};
			}
			
			console.log("result:"+result);
			res.send(json_responses);
			break;
			
		default:
			json_responses = {"statusCode" : 401, "result":"Error"};
			console.log("result:"+result);
			res.send(json_responses);
			break;
	}
};
