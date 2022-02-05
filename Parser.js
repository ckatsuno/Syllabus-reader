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
        if lines.includes(/* midterm, exam, other stuff*/){
            parse_stuff()
        }
        // add for loop to check if need to parse
    };

    // incase there is an error
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(files)
}

function parse_stuff(){
    
}

// series of helper functions to help me parse 
