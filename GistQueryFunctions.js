
var object_Array = [];
var fav_Array = [];

//requests data from server and then creates an unordered list based on the servers results
function requestData()
{
	var request;
	var init_url = "http://api.github.com/gists/public";
	var pages =	3;
	var page_size = 90;
	var temp_Array = [];

	//loops to grab appropriate number of pages
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
		
		//verifies server response before adding values to array using arrayBuilder function
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
	//calls byLanguage to rebuild array with selected languages listed
	temp_Array = byLanguage(object_Array);
	
	//clears object array
	object_Array = [];
	
	//calls createGistTable to populate table on web-page
	createGistTable(document.getElementById('display-q'),temp_Array);
};

//adds gist objects to an array
function arrayBuilder(ob_Array)
{
	for(var i = 0;i < ob_Array.length;i++)
	{
		object_Array.push(ob_Array[i]);
	}
};

//builds and returns array from array parameter filtering out all
//gist objects with languages that do not match those selected by user
function byLanguage(ob_Array)
{
	var temp = [];
	
	//variables to capture checked status of checkboxes
	var pyth_Select = document.getElementById('Python').checked;
	var jso_Select = document.getElementById('JSON').checked;
	var js_Select = document.getElementById('Javascript').checked;
	var sequel_Select = document.getElementById('SQL').checked;
	
	var lang_holder;
	
	//for-test
	//console.log(pyth_Select+" is the status of pyth_Select");
	//console.log(jso_Select+" is the status of jso_Select");
	//console.log(js_Select+" is the status of js_Select");
	//console.log(sequel_Select+" is the status of sequel_Select");
	
	//steps through array parameter and finds the language key of the gist object
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
		
		//if no checkboxes are selected it simply adds all gist objects to temp array
		//otherwise it verifies that the language of the current object matches the checkbox language
		//and that the checkbox is checked
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
	
	//returns array
	return temp;
};

//Function to produce array of queries upon request
function createGistTable(ul,qArray)
{	
	//resets lists before building new list
	_resetTable(ul);
	
	//sets length of which to iterate over
	var page_num = document.getElementById('per-page');
	var page_num_value = page_num.value;
	var page_size = 30;
	var to_display = page_size*page_num_value;
	
	//creates a variable to store the save_Button
	var save_Button;
	
	
	if(qArray.length < to_display)
	{
		to_display = qArray.length;
	}
	
	//iterates over array parameter entered, creates list items and appends them to the list then adds the appropriate
	//html text for said item, additionally creates a save button for each item and appends it to the item
	for(var j = 0; j < to_display ;j++)
	{
		var entry = document.createElement('li');
		
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

//creates a button object to add items to local storage
function addButton(text,array,index,id)
{
	var contain = document.createElement('input');
	var i = index;
	
	contain.type = 'button';
	contain.value = text;
	contain.name = text;
	contain.id = id;
	
	//handles onclick events for this button, adding data to local storage
	//removing the item from the parent list that was passed to it
	//rewriting the GistTable to show the removal of the item
	//and calling displayFavorites to update the favoite list
	contain.onclick = function()
	{
		localStorage['Favorites'+id] = JSON.stringify(array[i]);
		array.splice(i,1);
		createGistTable(document.getElementById('display-q'),array);
		displayFavorites(document.getElementById('display-fav'));
	};
	
	//returns button object
	return contain;
}

//creates a button object to remove items from local storage
function removeButton(text,id)
{
	var contain = document.createElement('input');
	
	contain.type = 'button';
	contain.value = text;
	contain.name = text;
	contain.id = id;
	
	//handles onclick events for this button, deletes item from local storage
	//calls dipslayFavorites to update favorite list after removal
	contain.onclick = function()
	{
		delete window.localStorage["Favorites"+id];
		displayFavorites(document.getElementById('display-fav'));
	};
	
	return contain;
}

//display list of favorites for the user
function displayFavorites(list_Name)
{
	_resetTable(list_Name);
	
	var stor_Str;
	var stor_Obj;
	var entry;
	var remove_Button
	var obj_id;
	
	//iterates over local storage and parses the strings back into gist objects
	//creates table list item elements with links
	//appends list items to list
	//appends remove button to list items
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

//resets table
function _resetTable(ul)
{
	for(var i = ul.childNodes.length-1; i>=0; i--)
	{
		ul.removeChild(ul.childNodes[i]);
	}
};

//displays favorites on page load
window.onload = function()
{
	displayFavorites(document.getElementById('display-fav'));
}
