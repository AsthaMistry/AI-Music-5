song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_Intentions = "";
song_what_do_you_mean = "";

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }

}

function modelLoaded() {
    console.log('PoseNet is intialized');
}

function draw(){
    image(video, 0, 0, 600, 530);
    fill("#ba74e8");
    stroke("#883ab5");

    song_Intentions = song1.isPlaying();
    console.log(song_Intentions);

    song_what_do_you_mean = song2.isPlaying();
    console.log(song_what_do_you_mean);

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song_Intentions == false){
            song1.play();
        } 
        else{
            console.log("Song Name: Intentions")
            document.getElementById("song").innerHTML = "Song Name: Intentions song";
        }
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song_what_do_you_mean == false){
            song2.play();
        } 
        else{
            console.log("Song Name: What Do You Mean")
            document.getElementById("song").innerHTML = "Song Name: What Do You Mean song";
        }
    }
}

function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}