/*var imgInput = document.getElementById('image');
var displayImage = document.getElementById('display');

imgInput.addEventListener("change", function(event){
    if(event.target.files.length == 0){
        return;
    }
    var tempUrl = URL.createObjectURL(event.target.files[0]);
    displayImage.setAttribute("src", tempUrl);
});
*/

function preview(event) {
    
    if(event.target.files.length == 0){
        return;
    }
    console.log(event.target.files[0]);
    var imgUrl = URL.createObjectURL(event.target.files[0]);
    const imgSize = event.target.files[0].size;
   // var imgdiv = document.getElementById('display');
   // var newImg = document.createElement('img');
   // newImg.src = imgUrl;
    var display_img = document.getElementById('displayImg');
    display_img.setAttribute('src', imgUrl)

    display_img.onload = function(){
        document.getElementById('height').innerHTML= this.height;
        document.getElementById('width').innerHTML = this.width;
        document.getElementById('size').innerHTML = Math.round( (imgSize)) + 'MB' ;

        console.log('height= ',this.height);
        console.log('width= ' ,this.width);
        console.log('size= ',  imgSize/1024);

        if(this.height>500 || this.width>500 || imgSize>1){
            document.getElementById('set').style.visibility = 'visible';
        }

       /* let canvas = document.createElement('canvas');
        let ratio = imgWidth / event.target.width ;
        canvas.width= imgWidth;
        canvas.height= event.target.height * ratio;

        const context = canvas.getContext("2d");
        context.drawImage(newImg,0,0, canvas.width, canvas.height);
        canvas.style.backgroundColor= 'grey';
        let new_image_url= context.canvas.toDataURL('image/jpg', 100);
        let new_image = document.createElement("img");
        new_image.src = new_image_url;
        imgdiv.appendChild(new_image); */ 

    //imgdiv.appendChild(newImg);

   }
   document.getElementById('canvas').style.visibility = 'hidden';
   document.getElementById('table').style.visibility = 'visible';
   document.getElementById('set').style.visibility = 'visible';
   document.getElementById('clear').style.visibility = 'visible';
   
}

function canvasImg() {
    document.getElementById('download').style.visibility = 'visible';

    var height = document.getElementById('displayImg').clientHeight;
    var width = document.getElementById('displayImg').clientWidth;

    if(height<500 && width<500){
        console.log(height, '&', width);
        var canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');canvas.style.backgroundColor= "transparent";
        canvas.height=500;
        canvas.width=500;

        const canvas_img_size = document.getElementById('displayImg').size;
        console.log('canvas-size:',canvas_img_size);

        var x = canvas.width/2 - width/2;
        var y = canvas.height/2 - height/2;
        ctx.drawImage(displayImg,x,y,width,height);

       // console.log('canvasH= ', img_inCanvas_height, 'canvasW= ', img_inCanvas_width);
        document.getElementById('canvas').style.visibility = 'visible';

    }
    else{
    
    console.log(height, '&', width);
    const img_inCanvas_width = 500;
    var canvas = document.getElementById('canvas');
    //const cw = canvas.width;
    canvas.width= img_inCanvas_width;
    
    var ratio =img_inCanvas_width / width ;
    var img_inCanvas_height = height * ratio ;
    console.log(img_inCanvas_width, ratio, img_inCanvas_height)
    
        if(img_inCanvas_height>500){
            
            const img_inCanvas_height=500;
            const ctx = canvas.getContext('2d');
            canvas.height = img_inCanvas_height;
            canvas.width = img_inCanvas_width;
            canvas.style.backgroundColor= "transparent";
            ctx.drawImage(displayImg,0,0,canvas.width,img_inCanvas_height);

            console.log('canvasH= ', img_inCanvas_height, 'canvasW= ', img_inCanvas_width);
            document.getElementById('canvas').style.visibility = 'visible';
        }
        else{
            const ctx = canvas.getContext('2d');
            canvas.height = img_inCanvas_height;
            canvas.width = img_inCanvas_width;
            canvas.style.backgroundColor= "grey";

            var x = canvas.width/2 - canvas.width/2;
            var y = canvas.height/2 - img_inCanvas_height/2;
            ctx.drawImage(displayImg,x,y,canvas.width,img_inCanvas_height);
        // ctx.drawImage(displayImg,0,0,canvas.width,img_inCanvas_height);

            console.log('canvasH= ', img_inCanvas_height, 'canvasW= ', img_inCanvas_width);
            document.getElementById('canvas').style.visibility = 'visible';
        }
    }   
}

function download(){
    const imgConverted = document.getElementById('downloadImg')
    const dataURI = canvas.toDataURL('image/jpeg');

    imgConverted.src = dataURI;
    console.log (dataURI);

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), 'canvasImg.png');
        console.log('if condition');
    }
    else{
        const a = document.createElement('a');

        document.body.appendChild(a);
        a.href= canvas.toDataURL('image/jpeg', 0.5);
        a.download= 'canvasImg.jpg';
        a.click();
        document.body.removeChild(a);
    }
}