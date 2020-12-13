

export default class Cron {
	constructor() {
		this.minutes = null;
		this.hours = null;
		this.day_of_month = [];
		this.month = null;
		this.days_of_week = [false, false, false, false, false, false, false];
		this.year = null;
	}

	getMinutes() {
		return this.minutes;
	}

	setMinutes(minutes) {
		this.minutes = minutes;
	}

	getHours() {
		return this.hours;
	}

	setHours(hours) {
		this.hours = hours;
	}

	getDayOfMonth() {
		return this.day_of_month;
	}

	setDayOfMonth(day_of_month) {
		this.day_of_month = day_of_month
	}

	getMonth() {
		return this.month;
	}

	setMonth(month) {
		this.month = month;
	}

	getDaysOfWeek() {
		return this.days_of_week;
	}

	setDaysOfWeek(days_of_week) {
		this.days_of_week = days_of_week;
	}

	getYear() {
		return this.year;
	}

	setYear(year) {
		this.year = year;
	}

	parseCronExpression(cron_expresion) {
		cron_expresion = cron_expresion.split(' ');
		this.minutes = cron_expresion[0].split(',')[0];
		this.hours = cron_expresion[1].split(',')[0];
		this.day_of_month = cron_expresion[2].split(',')[0];
		this.month = cron_expresion[3].split(',')[0];
		this.days_of_week = cron_expresion[4].split(',');
		this.year = cron_expresion[5].split(',')[0];

		if (this.days_of_week[0].length === 0 || this.days_of_week[0] === '*') {
			this.days_of_week = [true, true, true, true, true, true, true];
		} else {
			let aux = this.days_of_week;
			this.days_of_week = [false, false, false, false, false, false, false];
			for(let i=0; i<aux.length; i++)
				this.days_of_week[parseInt(aux[i])] = true;
		}
		//console.warn(this.days_of_week);
	}

	getCronExpression() {
		let days_of_week = '';
		this.days_of_week.forEach( (day, index) => {
			days_of_week += day === true ? `${index},` : ''
		});

		days_of_week = days_of_week.substr(0, days_of_week.length - 1);
		return `${this.minutes} ${this.hours} ? * ${days_of_week} *`;
	}

}
