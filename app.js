const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

document.getElementById("upload").onchange = e=>{
    img.src = URL.createObjectURL(e.target.files[0]);
};

function convertSprite(){

    ctx.clearRect(0,0,64,64);

    // resize to FireRed size
    ctx.drawImage(img,0,0,64,64);

    let imageData = ctx.getImageData(0,0,64,64);
    let data = imageData.data;

    // simple 16-color reduction
    for(let i=0;i<data.length;i+=4){
        data[i]   = Math.floor(data[i]/32)*32;
        data[i+1] = Math.floor(data[i+1]/32)*32;
        data[i+2] = Math.floor(data[i+2]/32)*32;
    }

    ctx.putImageData(imageData,0,0);

    document.getElementById("download").href =
        canvas.toDataURL("image/png");
}
