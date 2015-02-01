
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
		//var entry_ID = qArray[j].id;
		
		if(qArray[j].hasOwnProperty.call(qArray[j],'description') ===  false)
		{
			entry.innerHTML = '<a href='+qArray[j].url + '>' + "Description empty" + '</a>';
		}
		else if(qArray[j].description === "" )
		{
			entry.innerHTML = '<a href='+qArray[j].url + '>'+"Description empty"+'</a>' + '</a>';
		}
		else
		{
			entry.innerHTML = '<a href='+qArray[j].url+'>'+qArray[j].description+'</a>';
		}

		ul.appendChild(entry);
		
		save_Button = addButton('Save',qArray,j,qArray[j].id);

		
		entry.appendChild(save_Button);

	}
};

function addButton(text,array,index,id)
{
	var contain = document.createElement('input');
	var i = index;
	
	contain.type = 'button';
	contain.value = text;
	contain.name = text;
	contain.id = id;
	
	contain.onclick = function()
	{
		localStorage['Favorites'+id] = JSON.stringify(array[i]);
		array.splice(i,1);
		displayFavorites(document.getElementById('display-fav'));
	};
	

	
	return contain;
}

function removeButton(text,id)
{
	var contain = document.createElement('input');
	
	contain.type = 'button';
	contain.value = text;
	contain.name = text;
	contain.id = id;
	
	contain.onclick = function()
	{
		delete window.localStorage["Favorites"+id];
		displayFavorites(document.getElementById('display-fav'));
	};
	
	return contain;
}

function displayFavorites(list_Name)
{
	_resetTable(list_Name);
	
	var stor_Str;
	var stor_Obj;
	var entry;
	var remove_Button
	var obj_id;
	
	for(var i = 0; i < localStorage.length;i++)
	{
		entry = document.createElement('li');
		
		stor_Str = localStorage.getItem(localStorage.key(i));
		stor_Obj = JSON.parse(stor_Str);
		
		if(stor_Obj.hasOwnProperty.call(stor_Obj,'description') ===  false)
		{
			entry.innerHTML = '<a href='+stor_Obj.url + '>' + "Description empty" + '</a>';
		}
		else if(stor_Obj.description === "" )
		{
			entry.innerHTML = '<a href='+stor_Obj.url + '>'+"Description empty"+'</a>' + '</a>';
		}
		else
		{
			entry.innerHTML = '<a href='+stor_Obj.url+'>'+stor_Obj.description+'</a>';
		}
		
		list_Name.appendChild(entry);
		
		obj_id = stor_Obj.id;
		
		remove_Button = removeButton('Remove',obj_id);
		
		entry.appendChild(remove_Button);
	}
}

function _resetTable(ul)
{
	for(var i = ul.childNodes.length-1; i>=0; i--)
	{
		ul.removeChild(ul.childNodes[i]);
	}
};


window.onload = function()
{
	displayFavorites(document.getElementById('display-fav'));
}
