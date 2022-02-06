class Events{
    constructor(){
        this.event_name = '';
        this.year_month_date = ''
        this.start = '00:00:00';
        this.end = '00:00:00';
        this.keep = false;
    }

    set_name(name){
        this.event_name = name;
    }

    set_year_month_date(date){
        this.date = date;
    }

    set_start(start){
        this.start = start;
    }

    set_end(end){
        this.end = end;
    }

    get_name(){
        return this.event_name;
    }

    get_year_month_date(){
        return this.date;
    }

    get_start(){
        return this.start;
    }

    get_end(){
        return this.end;
    }

    get_keep(){
        return this.keep;
    }

    get_start_string(){
        return this.get_year_month_date() + 'T' + this.get_start() + "-5:00";
    }

    get_end_string(){
        return this.get_year_month_date() + 'T' + this.get_end() + "-5:00";
    }

    get_start_end_time(){
        return this.get_start() + ' - ' + this.get_end();
    }

}