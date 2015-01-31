
var object_Array = [];

function requestData()
{
	var request;
	var init_url = "http://api.github.com/gists/public";
	var pages =	3;
	var page_size = 90;

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
};

function arrayBuilder(ob_Array)
{
	var temp= [];
	for(var i = 0;i < ob_Array.length;i++)
	{
		object_Array.push(ob_Array[i]);
		//console.log(object_Array[i]);
	}
	
	temp = byLanguage(object_Array);
	
	createGistTable(document.getElementById('display-q'),temp);
}



function byLanguage(ob_Array)
{
	var temp = [];
	
	var pyth = document.getElementById('Python');
	var jso = document.getElementById('JSON');
	var js = document.getElementById('Javascript');
	var sequel = document.getElementById('SQL');
	
	var pyth_Select = pyth.value;
	var jso_Select = jso.value;
	var js_Select= js.value;
	var sequel_Select = sequel.value;
	
	var lang_holder;
	
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
		
		if(pyth_Select != 'Python' && jso_Select != 'JSON' && js_Select != 'Javascript' && sequel_Select != 'SQL')
		{
			
			temp.push(ob_Array[i]);
			
		}
		else
		{
			if(lang_holder == pyth_Select)
			{
				temp.push(ob_Array[i]);
			}
						
			if(lang_holder == jso_Select)
			{
				temp.push(ob_Array[i]);
			}
						
			if(lang_holder == js_Select)
			{
				temp.push(ob_Array[i]);
			}
						
			if(lang_holder == sequel_Select)
			{
				temp.push(ob_Array[i]);
			}
		}
	}
	console.log(temp[i]);
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
	
	if(qArray.length < to_display)
	{
		to_display = qArray.length;
	}
	
	for(var j = 0; j < to_display ;j++)
	{
		var entry = document.createElement('li');
		

		if(qArray[j].hasOwnProperty.call(qArray[j],'description') ===  false)
		{
			entry.innerHTML = '<a href='+qArray[j].url + '>' + "Description does not exist" + '</a>';

		}
		else if(qArray[j].description === "" )
		{
			entry.innerHTML = '<a href='+qArray[j].url + '>'+"Description empty"+'</a>';
		}
		else
		{
			entry.innerHTML = '<a href='+qArray[j].url+'>'+qArray[j].description+'</a>';
		}
		
		ul.appendChild(entry);
	}
};


function saveToFavorites()
{
	//intentionally blank at this time
}

function _resetTable(ul)
{
	for(var i = ul.childNodes.length-1; i>=0; i--)
	{
		ul.removeChild(ul.childNodes[i]);
	}
};

