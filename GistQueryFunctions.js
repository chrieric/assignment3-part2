
function requestData()
{
	var request;
	
	request = new XMLHttpRequest;
	
	if(!request)
	{
		alert('Unable to create http request');
	}
	
	var url = 'https://api.github.com/gists/public';
	
	request.onreadystatechange = function()
	{
		if(request.readyState === 4)
		{
			if(request.status === 200)
			{
				console.log("Request successful");
				var response = JSON.parse(this.responseText);
				createGistTable(document.getElementById('display-q'),response);
			}
		}
	};
	
	request.open('GET',url);
	request.send();
}

	


//Function to produce array of queries upon request
function createGistTable(ul,qArray)
{
	for(var i = ul.childNodes.length-1; i >=0;i--)
	{
		ul.removeChild(ul.childNodes[i]);
		
		var entry = document.createElement('li');
		
		if(qArray[i].description !== null)
		{
			if(qArray[i].description.length === 0)
			{
				entry.innerHTML = '<a href=""+qArray[i].url + ">' + "No Description" + '</a>';
			}

		}
		else
		{
			entry.innerHTML = '<a href=""+ qArray[i].url+"">' + qArray[i].description+'</a>';
		}
		
		ul.appendChild(entry);
		console.log('made it here 2:boogaloo');
	}
}


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
	console.log(num_Child);
	
	for(var i = num_Child;i>=0;i--)
	{
		li = document.createElement('li');
		li.innerHTML='Just print stuff';
		document.getElementById('display-q').appendChild(li);
	}
}
**/