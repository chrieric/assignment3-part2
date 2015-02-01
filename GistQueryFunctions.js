
var object_Array = [];
var fav_Array = [];

function requestData()
{
	var request;
	var init_url = "http://api.github.com/gists/public";
	var pages =	3;
	var page_size = 90;
	var temp_Array = [];

	for(var i = 1;i <=pages;i++)
	{
		request = new XMLHttpRequest;
	
		if(!request)
		{
			alert('Unable to create http request');
		}
	
		var url = init_url+"?page="+i+"&per_page="+page_size;
		
		request.open('GET',url);
		request.send();
		
		request.onreadystatechange = function()
		{
			if(request.readyState === 4)
			{
				if(request.status === 200)
				{
					var response = JSON.parse(this.responseText);
					arrayBuilder(response);
				}
			}
		};

	}
	console.log("Length of array " + object_Array.length);
	temp_Array = byLanguage(object_Array);
	object_Array = [];
	
	
	createGistTable(document.getElementById('display-q'),temp_Array);
};


function arrayBuilder(ob_Array)
{
	for(var i = 0;i < ob_Array.length;i++)
	{
		object_Array.push(ob_Array[i]);
	}
};

function byLanguage(ob_Array)
{
	var temp = [];
	
	var pyth_Select = document.getElementById('Python').checked;
	var jso_Select = document.getElementById('JSON').checked;
	var js_Select = document.getElementById('Javascript').checked;
	var sequel_Select = document.getElementById('SQL').checked;
	
	//var pyth_Select = pyth.value;
	//var jso_Select = jso.value;
	//var js_Select= js.value;
	//var sequel_Select = sequel.value;
	
	var lang_holder;
	
	console.log(pyth_Select+" is the status of pyth_Select");
	console.log(jso_Select+" is the status of jso_Select");
	console.log(js_Select+" is the status of js_Select");
	console.log(sequel_Select+" is the status of sequel_Select");
	for (var i = 0; i < ob_Array.length;i++)
	{
		var nested_Obj = ob_Array[i].files;
		
		for(key in nested_Obj)
		{
			var nested_Obj_2 = nested_Obj[key];
			
			for(key_2 in nested_Obj_2)
			{
				if(nested_Obj_2.hasOwnProperty('language'))
				{
					lang_holder = nested_Obj_2.language;
				}			
			}
		}
		
		if(pyth_Select == false && jso_Select == false && js_Select == false && sequel_Select == false)
		{
			temp.push(ob_Array[i]);
		}
		else
		{
			if(lang_holder == 'Python' && pyth_Select == true)
			{
				temp.push(ob_Array[i]);
			}
						
			if(lang_holder == 'JSON' && jso_Select == true)
			{
				temp.push(ob_Array[i]);
				console.log(jso_Select);
			}
						
			if(lang_holder == 'JavaScript' && js_Select == true)
			{
				temp.push(ob_Array[i]);
			}
						
			if((lang_holder == 'SQL' || lang_holder == 'sql') && sequel_Select == true)
			{
				temp.push(ob_Array[i]);
			}
		}
	}
	
	return temp;
	
};

//Function to produce array of queries upon request
function createGistTable(ul,qArray)
{	
	_resetTable(ul);
	
	var page_num = document.getElementById('per-page');
	var page_num_value = page_num.value;
	var page_size = 30;
	var to_display = page_size*page_num_value;
	
	var save_Button;
	
	if(qArray.length < to_display)
	{
		to_display = qArray.length;
	}
	
	for(var j = 0; j < to_display ;j++)
	{
		var entry = document.createElement('li');
		var entry_ID = String(qArray[j].id);
		
		save_Button = document.createElement("input");
		save_Button.type = "button";
		save_Button.setAttribute("value","Save");
		save_Button.setAttribute("name","Save");
		save_Button.setAttribute("onclick","toFavorites()");
		
		save_Button.setAttribute("id","save"+entry_ID);
		
		if(qArray[j].hasOwnProperty.call(qArray[j],'description') ===  false)
		{
			entry.innerHTML = '<input type="button" name="remove" value="Remove" onclick="removeFavorite()" id="remove">'+ '<a href='+qArray[j].url + '>' + "Description does not exist" + '</a>';
			//console.log(entry_ID);
			 
		}
		else if(qArray[j].description === "" )
		{
			entry.innerHTML = '<input type="button" name="remove" value="Remove" onclick="removeFavorite()" id="remove">'+'<a href='+qArray[j].url + '>'+"Description empty"+'</a>' + '</a>';
			//console.log(entry_ID);
		}
		else
		{
			entry.innerHTML = '<input type="button" name="remove" value="Remove" onclick="removeFavorite()" id="remove">'+'<a href='+qArray[j].url+'>'+qArray[j].description+'</a>';
			//console.log(entry_ID);
		}
		
		//document.getElementById(entry_ID).addEventListener("click",function(){fav_Array.push(qArray[j]);});
		console.log(entry_ID);
		ul.appendChild(entry);
		
		save_Button.appendTo(entry);
	}
};


function toFavorites()
{	
	
	localStorage.setItem('Favorites',JSON.stringify(favorite_Array));
}


function _resetTable(ul)
{
	for(var i = ul.childNodes.length-1; i>=0; i--)
	{
		ul.removeChild(ul.childNodes[i]);
	}
};

