Left_Wrist_X = 0;
Left_Wrist_Y = 0;
Right_Wrist_X = 0;
Right_Wrist_Y = 0;
Score_Left_wrist = 0;
Score_Right_Wrist = 0;

song = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    PoseNetVar = ml5.poseNet(Video, modelLoaded);

}

function draw(){
    image(Video, 0, 0, 600, 500);
    fill("#0000FF");
    stroke("#000000");
    
    if (Score_Right_Wrist > 0.2) {
        circle(Right_Wrist_X, Right_Wrist_Y, 20);

    if (Right_Wrist_Y > 0 && Right_Wrist_Y <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);

    }else if (Right_Wrist_Y > 100 && Right_Wrist_Y <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);

    }else if (Right_Wrist_Y > 200 && Right_Wrist_Y <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);

    }else if (Right_Wrist_Y > 300 && Right_Wrist_Y <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);

    }else if (Right_Wrist_Y > 400 && Right_Wrist_Y <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }

    if (Score_Left_wrist > 0.2) {
        circle(Left_Wrist_X, Left_Wrist_Y, 20);
        Y_For_LeftWrist = Number(Left_Wrist_Y);
        Decimal_remover = floor(Y_For_LeftWrist);
        Volume = Decimal_remover/500;
        document.getElementById("volume").innerHTML = 'Volume of song is now, '+Volume;
    
        song.setVolume(Volume);
    }

    
    

}

function play(){
    song.play();
    song.setVolume(Volume);
    song.rate(1);
}

function modelLoaded(){
    console.log('PoseNet is Initialised!');
    PoseNetVar.on('pose', PoseResult);
}

function PoseResult(results){
    if (results.length > 0) {
        console.log(results);

        Score_Left_wrist = results[0].pose.keypoints[9].score;
        console.log(Score_Left_wrist);

        Score_Right_Wrist = results[0].pose.keypoints[10].score;
        console.log(Score_Right_Wrist);

        Left_Wrist_X = results[0].pose.leftWrist.x;
        Left_Wrist_Y = results[0].pose.leftWrist.y;
        console.log('X Coordinate of Left Wrist = '+ Left_Wrist_X+', Y Coordinate of Left Wrist = '+Left_Wrist_Y);
        
        Right_Wrist_X = results[0].pose.rightWrist.x;
        Right_Wrist_Y = results[0].pose.rightWrist.y;
        console.log('X Coordinate of Right Wrist = '+Right_Wrist_X+', Y Coordinateof Right Wrist = '+Right_Wrist_Y);
    }
}
