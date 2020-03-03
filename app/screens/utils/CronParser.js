
export default class CronParser {
	seconds = [];
	minutes = [];
	hours =[];
	days_of_month = [];
	months = [];
	days_of_week = [];
	years = [];

	constructor(){

	}

	deserializeCron(cron_expresion: string){
		try {
			cron_expresion = cron_expresion.split(' ');

			this.seconds = cron_expresion[0].split(',');
			this.minutes = cron_expresion[1].split(',');
			this.hours = cron_expresion[2].split(',');
			this.days_of_month = cron_expresion[3].split(',');
			this.months = cron_expresion[4].split(',');
			this.days_of_week = cron_expresion[5].split(',');
			this.years = cron_expresion[6].split(',');

			if (this.seconds.length === 0) {
				this.seconds.push('0')
			}
			if (this.minutes.length === 0) {
				this.minutes.push('0')
			}
			if (this.hours.length === 0) {
				this.hours.push('0')
			}
			if (this.days_of_month.length === 0) {
				this.days_of_month.push('?')
			}
			if (this.months.length === 0) {
				this.months.push('*')
			}
			if (this.days_of_week.length === 0 || this.days_of_week[0] === '*') {
				this.days_of_week = [true, true, true, true, true, true, true];
			} else {
				let aux = this.days_of_week;
				this.days_of_week = [false, false, false, false, false, false, false];
				for(let i=0; i<aux.length; i++)
					this.days_of_week[parseInt(aux[i])] = true;

			}
			if (this.years.length === 0) {
				this.years.push('*')
			}
		}catch (e) {
			this.seconds = ['0'];
			this.minutes = ['0'];
			this.hours =['0'];
			this.days_of_month = ['?'];
			this.months = ['*'];
			this.days_of_week = [true, true, true, true, true, true, true];
			this.years = ['*'];
		}
	}

	serializeCron(){
		return ''
	}

}
