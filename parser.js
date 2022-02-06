let result = [];

let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

input
    .addEventListener('change', getFiles); //automatically invoked when file uploaded
    
function get_array(){ // function that returns the result array containing Events objects.
    return result;
}

function getFiles(){
    // get all files because we can have option to get multiple files
    let files = input.files;
    if (files.length == 0) return;

    const file = files[0]

    let reader = new FileReader();

    reader.onload = (e) => {
        // try to get the text file
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/); // split line by line
        for (let i = 0; i < lines.length; i++){
            let line = lines[i];
            //check to see if the line contains a date
            if (line.match("[0-9]{2}(-)[0-9]{2}(-)[0-9]{4}") != null || line.match("[0-9]{2}(/)[0-9]{2}(/)[0-9]{4}") != null || line.match("[0-9]{2}(.)[0-9]{2}(.)[0-9]{4}") != null){
                result.push(convertLine(line)); //Converts string into google calendar format and adds to collection of Events objects.
            }
        }
        for (let n = 0; n < result.length; n++){
            textarea.value += "start: " + result[n].get_start_string();
            textarea.value += "\nend: " + result[n].get_end_string() + "\n";
        }
    };

    // incase there is an error
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file)
}

function convertLine(line){
    let words = line.split(" "); // splits strings by space
    let event = new Events();
    // name date or date name
    // assume format of date is month date yaer
    function set_dates(date_string){ // function that given a date string, converts it into a uniform format
        let formatted = date_string.replace('/', '.');
        formatted = date_string.replace('-', '.');
        event.set_year_month_date(moment(formatted, "MM.DD.YYYY").format('YYYY-MM-DD')); // set YYYY-MM-DD format
        return;
    }
    if (words[0] === "Date:"){ // parses this way if the format is Date: ____ Event name ____
        // the format is Date: ______ names.....
        set_dates(words[1]);
        let nameArray = words.slice(2);
        let event_name = nameArray.join(' '); // concatenate strings with space in between each word
        event.set_name(event_name);
    }
    else{ // or this way if the foramt is EVent Name ______ Date: ______
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

    return event;
    
}
