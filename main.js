song1_Status = "";
song2_Status = "";

song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("believer.mp3");
}

function setup()
{
    canvas = createCanvas(400, 600);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 400, 600);
    fill("#FF0000");
    stroke("#FF0000");
    song1_Status = song1.isPlaying();
    console.log(song1_Status);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1_Status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name: Mile Sur"; 
        }
    }

    song2_Status = song2.isPlaying();
    console.log(song2_Status);

    if(scoreRgihtWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2_Status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song Name: Believer"; 
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet is Initialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " ,leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " ,rightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " ,scoreLeftWrist = " + scoreLeftWrist);
    }
}

