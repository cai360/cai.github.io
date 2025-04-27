document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.getElementById('menu-toggle');
    const internalLink = document.getElementById('internal_link');

    menuToggle.addEventListener('click', function() {
        internalLink.classList.toggle('show');
    });
    
    let user = localStorage.getItem('username');
    document.getElementById('userName').innerHTML = "user: " + user || "Guest!";


    document.getElementById('scOption').style.display='none';

    const synth = window.speechSynthesis;

    


    // Image array with HTML for each image
    const transportationPics = [
        '<img src="./final_pic/bus.jpg" alt="Bus">',
        '<img src="./final_pic/high_speed_rail.jpg" alt="High Speed Rail">',
        '<img src="./final_pic/MRT.jpg" alt="MRT">',
        '<img src="./final_pic/train.jpg" alt="Train">',
        '<img src="./final_pic/Ubike.jpg" alt="Ubike">'
    ];

    const transportation_Pinyin = [
        'Gōngchē', 'Gāosù tiělù', 'Jié yùn', 'Huǒchē', 'Zìxíngchē',
    ]

    const transportation_Mandarin = [
        '公車', '高速鐵路', '捷運', '火車', '自行車',
    ]

    const transportation_English = [
        'bus', 'high speed rail', 'metro', 'train', 'bicycle',
    ]

    // State variables
    let currentPicIndex = 0; // Tracks the current image index
    const transportPic = document.getElementById('transport_p'); // Container for images
    // Container for words
    const tr_pin = document.getElementById('tr_pinyin');
    const tr_madrin = document.getElementById('tr_madarin');
    const tr_en = document.getElementById('tr_en');
    


    // Function to update the displayed image
    function updateImage() {
        if (transportPic) {
            transportPic.innerHTML = transportationPics[currentPicIndex];
            tr_pin.innerHTML = transportation_Pinyin[currentPicIndex];
            tr_madrin.innerHTML = transportation_Mandarin[currentPicIndex];
            tr_en.innerHTML = transportation_English[currentPicIndex];
        } else {
            console.log('Element with id "transport_p" not found.');
        }
    }

    // Event handlers for navigation buttons
    function showPreviousImage() {
        if (currentPicIndex > 0) {
            currentPicIndex--;
            updateImage();
        }
    }

    function showNextImage() {
        if (currentPicIndex < transportationPics.length - 1) {
            currentPicIndex++;
            updateImage();
        }
    }

    // Attach event listeners to buttons
    const backButtonPic = document.getElementById('backBtnPic');
    const nextButtonPic = document.getElementById('nextBtnPic');
    const soundButtonPic = document.getElementById('soundBtnPic');

    if (backButtonPic) {
        backButtonPic.addEventListener('click', showPreviousImage);
    } else {
        console.log('Back button not found.');
    }

    if (nextButtonPic) {
        nextButtonPic.addEventListener('click', showNextImage);
    } else {
        console.log('Next button not found.');
    }

    if (!('speechSynthesis' in window)) {
        console.error('Speech synthesis not supported in this browser.');
    }

    
    if (soundButtonPic) {
        soundButtonPic.addEventListener('click', function () {      
            let textVocabluary = transportation_Mandarin[currentPicIndex];
            speak(textVocabluary,1);
        });
    } else {
        console.log('Sound button not found.');
    }
    
    function speak(text, speed){ 
        // Cancel any ongoing or queued speech
        synth.cancel();

        // Create a new utterance
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'zh-TW'; // Mandarin Chinese (Taiwan)
        utterance.text = text;
        utterance.rate = speed;

        // Speak the utterance
        synth.speak(utterance);          
    }

    // Initialize the first image
    updateImage();
    

    //conversation
    const cs1 = document.getElementById('cs1');
    const cs2 = document.getElementById('cs2');
    const cs3 = document.getElementById('cs3');
    const cs4 = document.getElementById('cs4');
    const cs5 = document.getElementById('cs5');
    const cs6 = document.getElementById('cs6');


    cs1.addEventListener('click', function () {      
        var text= "請問火車站怎麼走"
        speak(text,1);
    });

    cs2.addEventListener('click', function () {      
        var text= "你往前直走，到第二個紅綠燈左轉，火車站就在左邊。"
        speak(text,1);
    });

    cs3.addEventListener('click', function () {      
        var text= "謝謝！那高鐵站怎麼去?"
        speak(text,1);
    });

    cs4.addEventListener('click', function () {      
        var text= "高鐵站比較遠，你可以搭捷運到那邊"
        speak(text,1);
    });

    cs5.addEventListener('click', function () {      
        var text= "好的，我知道了，謝謝您"
        speak(text,1);
    });

    cs6.addEventListener('click', function () {      
        var text= "不客氣！"
        speak(text,1);
    });




    // Get references to the select element and the relevant <p> elements
    const selectElement = document.getElementById('sentences_S1');
    const pinyinDisplay = document.querySelector('.sentences_Pinyin'); // Pinyin display below the select
    const sentenceDisplay = document.getElementById('sentences_S2'); // Sentence <p> element
    const sentencePinyinDisplay = sentenceDisplay.nextElementSibling; // Pinyin <p> element for sentences_S2

    // Add an event listener to update displays when the selection changes
    selectElement.addEventListener('change', function () {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const chineseText = selectedOption.textContent; // Text content (e.g., 火車站)
        const pinyinText = selectedOption.value; // Value (e.g., huǒ chē zhàn)

        // Update the Pinyin display for sentences_S1
        pinyinDisplay.textContent = pinyinText || ''; // Show Pinyin or clear if no selection

        // Update the sentences_S2 and its Pinyin
        sentenceDisplay.textContent = chineseText || '(place)'; // Show text or default "(place)"
        sentencePinyinDisplay.textContent = pinyinText || 'place'; // Show Pinyin or default "place"
    });



    
    /*Single Choice*/
    const sc_question = ['自行車', '高速鐵路', '公車', '火車', '捷運',];
    
    const sc_answers= ['bicycle', 'high speed rail', 'bus', 'train', 'metro', ];
    const SQquestions = 5;//how many quesitons
    const SQoptionsCount = 4;
    const single_choice = document.getElementById('sc_question');
    const SQops = [
        document.getElementById('sc0'),
        document.getElementById('sc1'),
        document.getElementById('sc2'),
        document.getElementById('sc3'),
    ];
    let ansIndex = []; 

    let currentSQIndex = 0;
    let SQerror = []; //Incorrect Answer
    let SQfeedback = "";
    let SQcorrect = [];
    let anweredCount = 0;
    let sCfb = [];
    let scSecond = 20;


    

    const single_q_index = randomRandomNums(sc_question.length, SQquestions);

    // Attach event listeners to buttons
    const nextButtonSQ = document.getElementById('nextBtnSQ');
    const startButtonSQ = document.getElementById('raccoonPic');
    const finishButtonSQ = document.getElementById('finishBtnSQ');
    const submitButtonSQ = document.getElementById('submitBtnSQ');


    //start the single choice test
    startButtonSQ.addEventListener('click', function () {
        document.getElementById('raccoonPic').style.display="none"; 
        document.getElementById('scOption').style.display="block"; 
        cleanSingleQuestionRecord();
        opensel();
        updateSingleChoiceQ();
        SQtimerStart(scSecond);
        anweredCount ++;
    });

    /*to show next question*/
    nextButtonSQ.addEventListener('click', function() {

        if(currentSQIndex < SQquestions)
        {
            checkSingleQuestion();
        }
        if (currentSQIndex < SQquestions-1){   
            nextSingleQuestion();
        }
        else{
            finishButtonSQ.disabled = false;
            closesel();
        }
                
        
    });

    /*finish to answer*/
    finishButtonSQ.addEventListener('click', function () {
        submitButtonSQ.disabled = false;
        if(anweredCount == SQquestions)
        {
            closesel();
            clearInterval(timerSQ);
            ShowSQFeedback(); 
            SQagain();
            
        }
        else{
            document.getElementById('SQFeedback').innerHTML = "please finish all th questions";
        }
        

    });

    /* recored the result */
    submitButtonSQ.addEventListener('click', function () {  
        localStorage.setItem('SQ_correct', SQcorrect.length); // Save correct count
        localStorage.setItem('SQ_Error', SQerror.join(", ")); // Save error array as a string
        localStorage.setItem('scList', sCfb.join(", "));
    });
    
    function SQagain(){
        document.getElementById('raccoonPic').style.display="block"; 
        document.getElementById('scOption').style.display="none"; 
    }



    function cleanSingleQuestionRecord(){
        SQerror = []; //clear the error list
        SQcorrect = [];
        SQfeedback = "";
        currentSQIndex = 0;
        document.getElementById('SQFeedback').innerHTML = SQfeedback;//clear the feedback
    }

    function updateSingleChoiceQ(){
        // Generate random indices for button positions
        ansIndex = randomRandomNums(SQoptionsCount, SQoptionsCount); 
    

        if (single_choice) {
            // Update the question
            single_choice.innerHTML = sc_question[single_q_index[currentSQIndex]]; 
            // Assign the correct answer to a random button
            SQops[ansIndex[0]].innerHTML = sc_answers[single_q_index[currentSQIndex]];

            // Create a pool of dummy answers, excluding the correct answer
            let dummyAnswers  = sc_answers.slice();
            
            dummyAnswers.splice(single_q_index[currentSQIndex], 1);

            // Generate unique dummy answers index
            let dummyIndices  = randomRandomNums(dummyAnswers.length, SQoptionsCount-1); 

            // Assign dummy answers to the remaining buttons
            for(var i = 1; i < SQoptionsCount; i++)
            {
                let dummyAnswer = dummyAnswers[dummyIndices[i-1]];
                SQops[ansIndex[i]].innerHTML = dummyAnswer;
                
            }
            
         
        } else {
            alert("F");
        }
    }
    
    function nextSingleQuestion(){
        if(currentSQIndex < SQquestions)
        {
            currentSQIndex++;
            updateSingleChoiceQ();
            anweredCount ++;
        }
        else{
            document.getElementById('SQFeedback').innerHTML = "no more question"
        }
    }

   

    function randomRandomNums(range, outputCount) {

        let arr = []
        for (let i = 1; i <= range; i++) {
          arr.push(i)
        }
        console.log(arr);
      
        let result = [];
      
        for (let i = 1; i <= outputCount; i++) {
          const random = Math.floor(Math.random() * (range - i)); 
          console.log(random);
          result.push(arr[random]-1); 
          arr[random] = arr[range - i];
        }
        console.log(result);
        return result;
      }
    

      
      function checkSingleQuestion() {
        
        const selectedOption = document.querySelector('input[name="q1"]:checked');
        if (!selectedOption) {
            SQerror.push(sc_question[single_q_index[currentSQIndex]]);
            sCfb.push(sc_question[single_q_index[currentSQIndex]]+ ": "+sc_answers[single_q_index[currentSQIndex]]);
            SQfeedback = "No option selected!";
        } else {
            // Check if the selected option is correct
            if (parseInt(selectedOption.value) === ansIndex[0]) {
                SQcorrect.push(sc_question[single_q_index[currentSQIndex]]);
                SQfeedback = "Correct!";
            } else {
                SQerror.push(sc_question[single_q_index[currentSQIndex]]);
                sCfb.push(sc_question[single_q_index[currentSQIndex]]+ ": "+sc_answers[single_q_index[currentSQIndex]]);
                SQfeedback = "Incorrect!";
            }
        }
        document.getElementById('SQFeedback').innerHTML = SQfeedback;
    }
    

    function ShowSQFeedback() {
        // If all questions are correct
        if (SQcorrect.length === SQquestions) {
            document.getElementById('SQFeedback').innerHTML = "Good job! All answers are correct!";
            
        } else {
            // Loop through all questions to identify unanswered or incorrect ones
            for (let i = 0; i < SQquestions; i++) {
                // If the question is not answered correctly, add it to SQerror
                if (!SQcorrect.includes(sc_question[single_q_index[i]]) && !SQerror.includes(sc_question[single_q_index[i]])) {
                    SQerror.push(sc_question[single_q_index[i]])
                }
            }
            submitButtonSQ.disabled = false;
            // Display feedback with incorrect answers
            document.getElementById('SQFeedback').innerHTML = 
                `You got ${SQcorrect.length} correct. Incorrect: ${SQerror.join(", ")}`;
        }
    }
    
    /* Timer */

    let timerSQ;
    function SQtimerStart(seconds) {
        // Clear any existing interval to avoid overlap
        clearInterval(timerSQ);
        opensel();
        
        timerSQ = window.setInterval(function () {
            if (seconds > 0) {
                document.getElementById("SQtimer").innerHTML = "time: " + seconds;
                seconds--;
            } else {
                // Stop the timer when it reaches 0
                clearInterval(timerSQ);
                document.getElementById("SQtimer").innerHTML = "Time's up!";
                closesel(); // Disable options when the timer ends
                ShowSQFeedback(); // Display feedback after time is up
                SQagain();
            }
        }, 1000); // Run every 1000ms (1 second)
    }
    
    
    function closesel() {
        // Disable all radio inputs
        document.querySelectorAll('input[name="q1"]').forEach(option => {
            option.disabled = true;
        });
        nextButtonSQ.disabled = true;
        finishButtonSQ.disabled = false;

    }

    function opensel() {
       // Undisable all radio inputs
        document.querySelectorAll('input[name="q1"]').forEach(option => {
        option.disabled = false; 
        });
        
        nextButtonSQ.disabled = false;
        finishButtonSQ.disabled = false;
    }



    /*Mutiple Choice Question */
    const Mutiple_choice_q = document.getElementById('mutiple_question');

     // Select all checkboxes within the 'options' class
    const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');

    const mcBuilding = ['腳踏車', '公車站', '捷運站', '火車站', '高鐵站',];

    let MQCerrentIndex = 0;
    const MCQ = ['先直走後左轉再右轉', '先直走後左轉再右轉再右轉後左轉', '直走後右轉左轉再左轉後右轉'];
    const startingPint = ['map75', 'map75','map57'];
    const endingPint = ['map02', 'map05', 'map50']; 
    const pathIds1 = ['map65', 'map55', 'map54', 'map53', 'map52', 'map42', 'map32', 'map22', 'map12', 'map02'];
    const pathIds2 = ['map65', 'map55', 'map54', 'map53', 'map52', 'map42', 'map32', 'map22', 'map23', 'map24', 'map25', 'map15', 'map05'];
    const pathIds3 = ['map56', 'map55', 'map45', 'map35', 'map25', 'map24', 'map23', 'map22', 'map32', 'map42', 'map52', 'map51'];
    const pathIds = [pathIds1, pathIds2, pathIds3];
    const buildingMapIds = ['map01', 'map33', 'map41', 'map14', 'map36'];
    let mcA1 = ['0,1,2', '1,2,3', '1,2,3,4'];
    let mcCorrectCount=0;

   
    const MCsubmitBotton = document.getElementById('MCSubmitbtn');
    const MCCheckBotton = document.getElementById('mcCheck');
    const MCStartBotton = document.getElementById('MCStartbtn');
    const MCPathBotton = document.getElementById('MCPathbtn');
    const MCNextBotton = document.getElementById('MCNextbtn');

    MCStartBotton.addEventListener('click',  startMC);
   
    //to get the values from user for mutiple choice question
    MCCheckBotton.addEventListener('click', checkMQAnswer);

    MCNextBotton.addEventListener('click', showNextMCQuestion);

    MCPathBotton.addEventListener('click', showPath);
   
    MCsubmitBotton.addEventListener('click', toSubmitMC);  

    function startMC(){
        MQCerrentIndex = 0; // Reset index
        clearMQ();
        setMark(); 
        showMCQuestion();
        ifDisabledMCCheckBox(false);
        MCCheckBotton.disabled=false;
        MCNextBotton.disabled=true;
    }

    function showNextMCQuestion(){
        setBuilding();
        if (MQCerrentIndex < pathIds.length-1) {
            clearMQ();
            MQCerrentIndex++;
            setMark();
            showMCQuestion();
            ifDisabledMCCheckBox(false);
            MCCheckBotton.disabled=false;
            MCNextBotton.disabled=true;
        } else {
            document.getElementById('mcFeedback').innerHTML = "No more questions!";
            Mutiple_choice_q.innerHTML="";
            ifDisabledMCCheckBox(true);
        }

    }

    function toGetValueFromMC(groupName = "mcQ") {
        // Get all checked checkboxes with the specified name
        let selectedOptions = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    
        // Extract the values into an array
        let selectedValues = Array.from(selectedOptions).map(option => option.value);
    
        // Return selected values or an empty array if none are selected
        return selectedValues.length > 0 ? selectedValues : [];
    }
   
    function showMCQuestion(){
        Mutiple_choice_q.innerHTML=MCQ[MQCerrentIndex];
    }

    function toSubmitMC(){
        localStorage.setItem('MC_correct_count', mcCorrectCount);
        localStorage.setItem('MC_incorrect_count', MCQ.length - mcCorrectCount);
    }
    
    
    //to change specific cell color in table
    function showPath() {
        
        pathIds[MQCerrentIndex].forEach(id => {
            document.getElementById(id).style.backgroundColor = 'red';
        });
        MCPathBotton.disabled=true;

        let ansb = [[0, 1, 2],[1, 2, 3],[1, 2, 3, 4]];
        for(var i=0; i<ansb[MQCerrentIndex].length; i++)
        {
            document.getElementById(buildingMapIds[ansb[MQCerrentIndex][i]]).style.backgroundColor = 'green';
        }
        
    }

    function setStartEnd(){
        document.getElementById(startingPint[MQCerrentIndex]).innerHTML = "start";
        document.getElementById(startingPint[MQCerrentIndex]).style.backgroundColor = 'gray';
        document.getElementById(endingPint[MQCerrentIndex]).innerHTML = "end";
        document.getElementById(endingPint[MQCerrentIndex]).style.backgroundColor = 'gray';
    }

    function setBuilding(){
        var mcBIndexes = 0;
        buildingMapIds.forEach(id => {
            document.getElementById(id).innerHTML = mcBuilding[mcBIndexes];
            document.getElementById(id).style.backgroundColor = 'blue';
            document.getElementById(id).style.borderRadius= "40px";
            document.getElementById(id).style.color= "white";
            mcBIndexes ++;
        })
    }

    //set the mark on the map
    function setMark(){
        setStartEnd();
        setBuilding();
    }

    //check the mutiple question's answer
    function checkMQAnswer(){
        userAnswer = toGetValueFromMC();
        
        if(mcA1[MQCerrentIndex] == userAnswer){
            document.getElementById('mcFeedback').innerHTML = "correct";
            mcCorrectCount ++;
        }
        else{
            document.getElementById('mcFeedback').innerHTML = "incorrect";
            MCPathBotton.disabled=false;
        }    
        // Disable each checkbox
        ifDisabledMCCheckBox(true);
        MCNextBotton.disabled=false;
        MCCheckBotton.disabled=true;
        if(MQCerrentIndex == 2){
            MCsubmitBotton.disabled = false;
        }
    
            
    }

    function ifDisabledMCCheckBox(shouldClose){
        if(shouldClose){
            checkboxes.forEach(checkbox => {
                checkbox.disabled = true;
            });
        }else{
            checkboxes.forEach(checkbox => {
                checkbox.disabled = false;
            });
            
        }
    }

    function clearMQ() {

        //clear correct times;
        mcCorrectCount= 0;

        //clear quesiton
        Mutiple_choice_q.innerHTML="";


        // Uncheck all checkboxes
        document.querySelectorAll('input[name="mcQ"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    
        // Clear feedback
        document.getElementById('mcFeedback').innerHTML = "";

    
        // Reset map styles
        document.querySelectorAll('.road').forEach(cell => {
            cell.style.backgroundColor = "black"; // Reset color
            cell.innerHTML = ""; // Clear content
        });

        document.getElementById(startingPint[MQCerrentIndex]).style.backgroundColor = "black"; // Reset color
        document.getElementById(startingPint[MQCerrentIndex]).innerHTML = ""; // Clear content
        document.getElementById(endingPint[MQCerrentIndex]).style.backgroundColor = "black"; // Reset color
        document.getElementById(endingPint[MQCerrentIndex]).innerHTML = ""; // Clear content  
        
    }
    




        /* Derection Game */
    // Constants
    // Retrieve buttons and elements
    const DGStartButton = document.getElementById('DGStartBtn');
    const DGCheckButton = document.getElementById('DGcheckBtn');
    const DGFeedback = document.getElementById('DGfeedback');
    const hintButton = document.getElementById('conditionalBtn');
    const DGsoundButton = document.getElementById('DGsoundBtn');
    const DGsubmitButton = document.getElementById('DGsubmitBtn');
    const DGsimulateButton = document.getElementById('DGsimulateBtn');

    // Questions, answers, and hints
    const DGToPlay = "直走後左轉，火車站就在右邊。經過火車站後右轉，高鐵站就在左邊。高鐵站對面是公車站。過高鐵站右轉，捷運站就在右邊。腳踏車在捷運站對面。";
    const DGQuestions = [
        '直走後左轉，火車站就在右邊',
        '經過火車站後右轉，高鐵站就在左邊',
        '高鐵站對面是公車站',
        '過高鐵站右轉，捷運站就在右邊',
        '腳踏車在捷運站對面'
    ];
    const DGAnswers = ['火車站', '高鐵站', '公車站', '捷運站', '腳踏車'];
    const hintIds = ['hint0', 'hint1', 'hint2', 'hint3', 'hint4'];
    const selectIds = ['select4', 'select1', 'select0', 'select2', 'select3'];

    // Variables
    let DGfeedback = "";
    let DGtimer;
    let DGsec = 0;
    let DGIncorrectCount = 0;
    let hintTimes = 0;

    // Event listeners
    DGStartButton.addEventListener('click', toStartDG);
    DGCheckButton.addEventListener('click', handleCheckButton);
    hintButton.addEventListener('click', toGiveHint);
    DGsoundButton.addEventListener('click', toplayQuestion);
    DGsubmitButton.addEventListener('click', toSubmitDGAns);
    DGsimulateButton.addEventListener('click', DGsimulation);

    // Start the game
    function toStartDG() {  
        hintTimes = 0;  
        DGsec = 0;
        DGfeedback = "";
        DGIncorrectCount = 0;
        clearInterval(DGtimer);
        startTimer();
        enableGame();
        toggleButton(DGsoundButton, true);
    }

    // Show or hide a button
    function toggleButton(button, shouldShow) {
        button.style.display = shouldShow ? "block" : "none";
    }

    // Main handler for the Check Button
    function handleCheckButton() {
        const userAnswers = getSelectedOptions();
        if (userAnswers) {
            if (evaluateAnswers(userAnswers, DGAnswers)) {
                DGfeedback = "Good Job!";
                DGsubmitButton.disabled = false;
                disableGame();
            } else {
                DGfeedback = "Incorrect. Try again or use a hint.";
                toggleButton(hintButton, true);
                DGIncorrectCount++;
            }
            displayFeedback(DGfeedback);
        }
    }

    // Retrieve user selections
    function getSelectedOptions() {
        const userAnswers = selectIds.map(id => {
            const selectElement = document.getElementById(id);
            return selectElement?.value.trim() || "Not Selected";
        });

        console.log("User Answers:", userAnswers);
        return userAnswers;
    }

    // Compare user answers with correct answers
    function evaluateAnswers(userAnswers, correctAnswers) {
        return userAnswers.every((answer, index) => answer.toLowerCase() === correctAnswers[index].toLowerCase());
    }

    // Display feedback
    function displayFeedback(message) {
        DGFeedback.innerHTML = message;
    }

    // Enable or disable <select> elements in iframe
    function toggleSelects(enable) {
        const selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
            select.disabled = !enable;
        });
    }

    // Disable game functionality
    function disableGame() {
        clearInterval(DGtimer);
        toggleSelects(false);
        DGCheckButton.disabled = true;
    }

    // Enable game functionality
    function enableGame() {
        toggleSelects(true);
        hintButton.disabled = false;
        DGCheckButton.disabled = false;
    }

    // Start the timer
    function startTimer() {
        toplayQuestion();
        DGtimer = setInterval(() => {
            document.getElementById('DGtime').innerHTML = `Time: ${DGsec}`;
            DGsec++;
        }, 1000);
    }

    // Provide a hint
    function toGiveHint() {
        if (hintTimes >= DGQuestions.length) {
            hintButton.disabled = true;
            return;
        }

        const hintElement = document.getElementById(hintIds[hintTimes]);
        if (hintElement) {
            hintElement.innerHTML = DGQuestions[hintTimes];
        } else {
            console.error(`Hint element with ID ${hintIds[hintTimes]} not found.`);
        }
        hintTimes++;
    }

    // Play the question audio
    function toplayQuestion() {
        speak(DGToPlay, 0.55); // Assumes a speak function exists
    }

    // Submit user answers
    function toSubmitDGAns() {

        localStorage.setItem('DG_timeSpend', DGsec);
        console.log("DG_timeSpend in localStorage:", localStorage.getItem('DG_timeSpend'));
    }

    // Simulate the game
    function DGsimulation() {
        let i = 0;

        toggleSelects(true);
        const intervalId = setInterval(() => {
            if (i < DGAnswers.length) {
                const hintElement = document.getElementById(hintIds[i]);
                const selectElement = document.getElementById(selectIds[i]);

                if (hintElement) {
                    hintElement.innerHTML = DGQuestions[i];
                } else {
                    console.error(`Hint element with ID ${hintIds[i]} not found.`);
                }

                if (selectElement) {
                    selectElement.value = DGAnswers[i];
                    selectElement.style.backgroundColor = 'blue';
                    selectElement.style.color = 'white';
                } else {
                    console.error(`Select element with ID ${selectIds[i]} not found.`);
                }

                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 2000);
    }
        


});
