
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
				var response = JSON.parse('"url"','"description"');
				createGistTable(response);
			}
		}
	};
	
	request.open('GET',url);
	request.send();
}

	


//Function to produce array of queries upon request
function createGistTable(qArray)
{
	var row = document.createElement('ul');
	
	for(var i = 0; i < qArray.length;i++)
	{
		var entry = document.createElement('il');
		
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
		
		row.appendChild(entry);
	}
	
	return row;
}


function saveToFavorites()
{
	//intentionally blank at this time
}