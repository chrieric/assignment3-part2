


function requestData()
{
	var request;
	var init_url = "http://api.github.com/gists/public";
	var pages = 4;
	
	var page_size = 30;
	var page_num = document.getElementById('per-page');
	var page_num_value = page_num.value;
	
	var to_display = page_size*page_num_value;
	
	console.log(to_display);
	
	for(var i = 1;i <=pages;i++)
	{
		request = new XMLHttpRequest;
	
		if(!request)
		{
			alert('Unable to create http request');
		}
	
		var url = init_url+"?page="+i+"&per_page="+to_display;
	
		request.open('GET',url);
		request.send();
		
		request.onreadystatechange = function()
		{
			if(request.readyState === 4)
			{
				if(request.status === 200)
				{
					var response = JSON.parse(this.responseText);
					createGistTable(document.getElementById('display-q'),response);
				}
			}
		};
	}
};


//Function to produce array of queries upon request
function createGistTable(ul,qArray)
{	
	_resetTable(ul);
	for(var i = 0; i < qArray.length ;i++)
	{
		var entry = document.createElement('li');
		

		if(qArray[i].hasOwnProperty.call(qArray[i],'description') ===  false)
		{
			entry.innerHTML = '<a href=""+qArray[i].url + ">' + "Description does not exist" + '</a>';

		}
		else if(qArray[i].description === "" )
		{
			entry.innerHTML = '<a href=""+qArray[i].url + ">'+"Description empty"+'</a>';
		}
		else
		{
			entry.innerHTML = '<a href=""+ qArray[i].url+"">' + qArray[i].description+'</a>';
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

