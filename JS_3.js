alert(
  "Simulator Instructions\n     Left key : Kick\n     Right Key : Punch\n     Up key : Forward\n     Down key : Backward\n     Any key : Block"
);

var c = document.getElementById("my-canvas");
var cxt = c.getContext("2d");

document.body.style.backgroundImage = "url('D:/New/images/background.jpg')";

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "D:/New/images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  // Calls back with an array of loaded images
  let images = {
    idle: [],
    kick: [],
    punch: [],
    forward: [],
    backward: [],
    block: [],
  };
  let imagesToLoad = 0;

  ["idle", "kick", "punch", "forward", "backward", "block"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);
        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (cxt, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      cxt.clearRect(0, 0, 500, 500);
      cxt.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });

  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimation = [];
  let aux = () => {
    let selectedAnimation;

    if (queuedAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimation.shift();
    }

    animate(cxt, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick").onclick = () => {
    queuedAnimation.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    queuedAnimation.push("punch");
  };

  document.getElementById("forward").onclick = () => {
    queuedAnimation.push("forward");
  };

  document.getElementById("backward").onclick = () => {
    queuedAnimation.push("backward");
  };

  document.getElementById("block").onclick = () => {
    queuedAnimation.push("block");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (key === "ArrowLeft") {
      queuedAnimation.push("kick");
    } else if (key === "ArrowRight") {
      queuedAnimation.push("punch");
    } else if (key === "ArrowUp") {
      queuedAnimation.push("forward");
    } else if (key === "ArrowDown") {
      queuedAnimation.push("backward");
    } else {
      queuedAnimation.push("block");
    }
  });
});
