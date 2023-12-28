const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

const fileName = 'counts.json';
const port = 5000;

app.use(cors());

app.get('/api', function(request, response)
{
	console.log("Request received!");
	
	if (request.url === "/favicon.ico")
	{
		response.end();
	}
	
	const json = fs.readFileSync(fileName, 'utf-8');
	const obj = JSON.parse(json);
	
	obj.views = obj.views + 1;
	if (request.query.type === 'visit-view')
		obj.visits = obj.visits + 1;
	
	const newJSON = JSON.stringify(obj);
	fs.writeFileSync(fileName, newJSON);
	
	response.send(newJSON);
	console.log("Response sent!");
});

app.listen(process.env.PORT || port, () => {
	console.log("Server is live on port " + (process.env.PORT || port));
});