let video;
let poseNet;
let pose;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)
}

function gotPoses(poses) {
  console.log(poses)
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log("model is loaded")
}

function draw() {
  image(video, 0, 0);
  if(pose) {
    fill(255,0,0);
    ellipse(pose.nose.x, pose.nose.y, 32);  
    ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 32);
    ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 32);
    ellipse(pose.rightElbow.x, pose.rightElbow.y, 32);
    ellipse(pose.leftElbow.x, pose.leftElbow.y, 32);
  }
}