let result = [];

document.getElementById('submitButton')
    .addEventListener('click', getFiles);

function get_array(){
    return result;
}

function getFiles(){
    // get all files because we can have option to get multiple files
    let files = input.files;
    if (files.length == 0) return;

    let reader = new FileReader();

    const file = files[0]

    reader.onload = (e) => {
        // try to get the text file
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        for (let i = 0; i < lines.length; i++){
            let line = lines[i];
            if (line.match("[0-9]{2}(/-.)[0-9](2)") != null){
                result.push(convertLine(line));
            }
        }
        // add for loop to check if need to parse
    };

    // incase there is an error
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(files)
    return result; // don't know if this has to be below or above this line. don't know what readAsText does. 
}

function convertLine(line){
    let words = line.split(" "); // splits strings by space
    let event = new Events();
    // name date or date name
    // assume format of date is month date yaer
    function set_dates(date_string){
        let formatted = date_string.replace('/', '.');
        formatted = date_string.replace('-', '.');
        event.set_year_month_date(moment(formatted, "DD.MM.YYYY").format('YYYY-MM-DD')); // set YYYY-MM-DD format
    }
    if (words[0] === "Date:"){
        // the format is Date: ______ names.....
        set_dates(words[1]);
        let nameArray = words.slice(2);
        let event_name = nameArray.join(' '); // concatenate strings with space in between each word
        event.set_name(event_name);
    }
    else{
        let event_name = '';
        for (let i = 0; i < words.length; i++){
            if (words[i] === "Date:"){
                event.set_name(event_name);
                set_dates(words[i+1]);
                continue;
            }
            event_name = event_name === '' ? words[i] + ' ' : event_name + ' ' + words[i];
        }
    }

    // make the formatting the way google calendar wants it
    
    return event;
    
}



// series of helper functions to help me parse 
