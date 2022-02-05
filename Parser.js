//file with parsing methods

//main method

//helper method

//parsing method

// handle 
document.getElementById('input')
    .addEventListener('change', getFiles);

function getFiles(){
    // get all files because we can have option to get multiple files
    let files = input.files;
    if (files.length == 0) return;

    let reader = new FileReader();

    const file = files[0]

    reader.onload = (e) => {
        // try to get the text file
        const file = e.target.result;
        const lines = lines.split(/\r\n|\n/);
        for (let i = 0; i < lines.length; i++){
            let line = lines[i];
            if (line.includes("Exam") || line.includes("Midterm")){
                convertLine(line);
            }
        }
        // add for loop to check if need to parse
    };

    // incase there is an error
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(files)
}

function convertLine(line){
    let words = line.split(" ");
    for (let i = 0; i < words.length; i++){
        
    }
}

// series of helper functions to help me parse 
