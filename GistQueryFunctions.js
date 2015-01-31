


function requestData()
{
	var request;
	var init_url = "http://api.github.com/gists/public";
	var pages = 6;
	for(var i = 1;i <=pages;i++)
	{
		request = new XMLHttpRequest;
	
		if(!request)
		{
			alert('Unable to create http request');
		}
	
		var url = init_url+"?page="+i+"&per_page=30";
	
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
	
	for(var i = 0; i < qArray.length;i++)
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

/**
window.onload = function()
{
	var drop_down = document.getElementById('per-page');
	var dd_value = drop_down.value;
	
	var num_Child = 30*dd_value;
	
	for(var i = num_Child;i>=0;i--)
	{
		li = document.createElement('li');
		li.innerHTML = null;
		document.getElementById('display-q').appendChild(li);
	}
};
**/
