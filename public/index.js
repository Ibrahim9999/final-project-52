// Interaction 1
var postsCache = {};
// Code for when user presses "Search"
function handleSearch(event)
{
	var keyword = "";
	/*
	var equationArray = JSON.parse("equationData.json");
	var fractalArray = JSON.parse(fs.readFileSync("fractalData.json"));
	var designArray = JSON.parse(fs.readFileSync("designData.json"));
	var otherArray = JSON.parse(fs.readFileSync("otherData.json"));
	
	alert(equationArray.length);*/
	
	//document.getElementById("filter-text").value();
	
	// If user has text entered in text field
	keyword = document.getElementById("search-text").value;// set search string
	
	// Remove posts
	var posts = document.getElementsByClassName("post");
	/*
	if (postsCache.length == 0 || postsCache == null)
		postsCache = document.getElementsByClassName("post");
	else
		posts = postsCache;
	
	alert(postsCache.length);*/
	
	for (var i = 0; i < posts.length; i++)
	{
		// Remove posts if substring in "keyword" exists
		if (!posts[i].getElementsByClassName("post-title")[0].textContent.includes(keyword))
		{
			posts[0].parentNode.removeChild(posts[i]);
			
			i--;
			continue;
		}
		
	}
}


document.getElementsByClassName("action-button")[0].addEventListener("click", handleSearch);