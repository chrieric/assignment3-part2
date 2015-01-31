
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
	for(var i = 0;i < ob_Array.length;i++)
	{
		object_Array.push(ob_Array[i]);
		//console.log(object_Array[i]);
	}
	
	createGistTable(document.getElementById('display-q'),object_Array);
}


//Function to produce array of queries upon request
function createGistTable(ul,qArray)
{	
	var page_num = document.getElementById('per-page');
	var page_num_value = page_num.value;
	var page_size = 30;
	var to_display = page_size*page_num_value;
	
	_resetTable(ul);
	
	for(var j = 0; j < to_display ;j++)
	{
		var entry = document.createElement('li');
		

		if(qArray[j].hasOwnProperty.call(qArray[j],'description') ===  false)
		{
			entry.innerHTML = '<a href=""+qArray[j].url + ">' + "Description does not exist" + '</a>';

		}
		else if(qArray[j].description === "" )
		{
			entry.innerHTML = '<a href=""+qArray[j].url + ">'+"Description empty"+'</a>';
		}
		else
		{
			entry.innerHTML = '<a href=""+ qArray[j].url+"">' + qArray[j].description+'</a>';
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

