var model;
cocossd.load().then(
  function(res){
    model = res;
    alert("Model is ready");
  },
  function(){
    console.log("Model did not load");
  }
);

function invoke_upload_image()(){
  document.getElementById('upload_image').click();
}

function upload_image(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");


  var input_clon = document.querySelector("input[type = file]");
  var file = input_clon.files[0];
  const image = document.getElementById('img');
  var reader = new FileReader();
  reader.addEventListener(
    "load",
    function(){
      image.src = reader.result;
      setTimout(function(){
        if(image.height > 500) {
          image.width = image.height * (500/image.height);
          image.height = 500;
        }

        model.detect(image).then(function(predictions) {
          draw_res(canvas, ctx, image, predictions);
        })
      }), 1000);
    }
  ), false;
};

if(file){
  ctx.clearRect(0,0,ctx.canvas_width, ctx.canvas_height);
  reader.readAsDataURL(file);
}

function draw_res(canvas, ctx, image, predictions) {
  canvas.height = image.height;
  canvas.width = image.width;
  ctx.clearRect(0,0,ctx.canvas_width, ctx.canvas_height);
  ctx.drawImage(image,0,0,ctx.canvas_width, ctx.canvas_height);
  ctx.font = "16px sans-serif";
  ctx.textBaseline = "top";

  draw_box(ctx, predictions, font);
  draw_label(ctx, predictions);

}
