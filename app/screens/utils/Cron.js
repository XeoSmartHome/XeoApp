export default class Cron {
    /*constructor({second, minute, hour, day_of_them_month, month, days_of_the_week}) {
        this._second = second;
        this._minute = minute;
        this._hour = hour;
        this._day_of_month = day_of_them_month;
        this._month = month;
        this._days_of_week = days_of_the_week;
    }*/

    constructor(cron_string) {
        const cron = cron_string.match(/(?<second>\*|[0-9]+) (?<minute>\*|[0-9]+) (?<hour>\*|[0-9]+) (?<day_of_the_month>\*|[0-9]+) (?<month>\*|[0-9]+) (?<days_of_the_week>\*|([0-9],?)+)/);
        try {
            this._second = cron.groups.second;
            this._minute = cron.groups.minute;
            this._hour = cron.groups.hour;
            this._day_of_month = cron.groups.day_of_the_month
            this._month = cron.groups.month;
            this._days_of_week = this.getDaysOfTheWeekFromString(cron.groups.days_of_the_week);
        } catch (e) {
            this._second = '0';
            this._minute = '0';
            this._hour = '0';
            this._day_of_month = '*';
            this._month = '*'
            this._days_of_week = {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            };
        }
    }

    getDaysOfTheWeekFromString(days_string) {
        const days_list = days_string.split(',');
        return {
            monday: days_string === '*' || days_list.includes('1'),
            tuesday: days_string === '*' || days_list.includes('2'),
            wednesday: days_string === '*' || days_list.includes('3'),
            thursday: days_string === '*' || days_list.includes('4'),
            friday: days_string === '*' || days_list.includes('5'),
            saturday: days_string === '*' || days_list.includes('6'),
            sunday: days_string === '*' || days_list.includes('7') || days_list.includes('0')
        };
    }

    getSecond() {
        return this._second;
    }

    getMinute() {
        return this._minute;
    }

    getHour() {
        return this._hour;
    }

    getDayOfMonth() {
        return this._day_of_month;
    }

    getMonth() {
        return this._month
    }

    /**
     * @return {{
     *     monday: boolean,
     *     tuesday: boolean,
     *     wednesday: boolean,
     *     thursday: boolean,
     *     friday: boolean,
     *     saturday: boolean,
     *     sunday: boolean
     * }}
     */
    getDaysOfWeek() {
        return this._days_of_week;
    }

    setSecond(second) {
        if (second === '*' || 0 <= Number(second) && Number(second) <= 59) {
            this._second = second;
        } else {
            throw "Invalid second";
        }
    }

    setMinute(minute) {
        if (minute === '*' || 0 <= Number(minute) && Number(minute) <= 59) {
            this._minute = minute;
        } else {
            throw "Invalid minute";
        }
    }

    setHour(hour) {
        if (hour === '*' || 0 <= Number(hour) && Number(hour) <= 23) {
            this._hour = hour;
        } else {
            throw "Invalid hour";
        }
    }

    setDayOfMonth(day_of_month) {
        if (day_of_month === '*' || 1 <= Number(day_of_month) && Number(day_of_month) <= 31) {
            this._day_of_month = day_of_month;
        } else {
            throw "Invalid day of month";
        }
        this._day_of_month = day_of_month;
    }

    setMonth(month) {
        if (month === '*' || 1 <= Number(month) && Number(month) <= 12) {
            this._month = month;
        } else {
            throw "Invalid month";
        }
    }

    setDaysOfWeek(days_of_week) {
        this._days_of_week = days_of_week;
    }

    getDaysOfWeekString() {
        if (this._days_of_week.monday === true && this._days_of_week.tuesday === true && this._days_of_week.wednesday === true && this._days_of_week.thursday === true && this._days_of_week.friday === true && this._days_of_week.saturday === true && this._days_of_week.sunday === true)
            return '*';

        let days = [];
        if (this._days_of_week.monday === true) {
            days.push(1);
        }
        if (this._days_of_week.tuesday === true) {
            days.push(2);
        }
        if (this._days_of_week.wednesday === true) {
            days.push(3);
        }
        if (this._days_of_week.thursday === true) {
            days.push(4);
        }
        if (this._days_of_week.friday === true) {
            days.push(5);
        }
        if (this._days_of_week.saturday === true) {
            days.push(6);
        }
        if (this._days_of_week.sunday === true) {
            days.push(7);
        }

        return days.join(',');
    }

    getCronExpression() {
        return `${this._second} ${this._minute} ${this._hour} ${this._day_of_month} ${this._month} ${this.getDaysOfWeekString()}`;
    }
}
