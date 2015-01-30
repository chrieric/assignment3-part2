
function requestData(url,gist_Data)
{
	//intentionally blank at this time
}



//Function to produce array of queries upon request
function createGistTable(qArray)
{
	var list = document.createElement('tr');
	
	for(var i = 0; i < qArray.length;i++)
	{
		var entry = document.createElement('td');
		
		if(array[i].description.length === 0)
		{
			intem.innerHTML = '<a href=""+qArray[i].url + "> + "No Description" + '</a>';
		}
		else
		{
			item.innerHTML = '<a href=""+ qArray[i].url+"">' + array[i].description+'</a>';
		}
		
		list.appendChild(entry);
	}
	
	return list;
}


function saveToFavorites()
{
	//intentionally blank at this time
}