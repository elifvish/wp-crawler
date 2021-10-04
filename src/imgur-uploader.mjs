import captureWebsite from 'capture-website';
import axios from 'axios';
import FormData from 'form-data';
import readline from 'readline';
async function wp_crawler_image_upload (hex)
{
    var data = new FormData();
    
    var link=[];
    var linkss = "";
    
    data.append('image', `${hex}`);


    var clientId= '4ae768365646515';

    var config = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: { 
        'Authorization': `Client-ID ${clientId}`, 
        ...data.getHeaders()
    },
    data : data
    };

    await axios(config)
    .then(function (response) {
    link = JSON.parse(JSON.stringify(response.data));

    linkss = link['data']['link'] + ' , ' + link['data']['deletehash'];    
     
    })
    .catch(function (error) {
    console.log(error);
    });

    return linkss;
    
}

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

while(true){
    rl.question("Enter link")
}

var link_site ='https://www.brodo.com/when-to-broth/';

var hex =  await captureWebsite.base64(`${link_site}`);

wp_crawler_image_upload(hex).then(res => console.log(res));
