

export class Cron {
    constructor({second, minute, hour, day_of_them_month, month, days_of_the_week}) {
        this.second = second;
        this.minute = minute;
        this.hour = hour;
        this.day_of_month = day_of_them_month;
        this.month = month;
        this.days_of_week = days_of_the_week;
    }
}


export const parseCronFromString = (cron_string) => {
    const cron = cron_string.match(/(?<second>\*|[0-9]+) (?<minute>\*|[0-9]+) (?<hour>\*|[0-9]+) (?<day_of_the_month>\*|[0-9]+) (?<month>\*|[0-9]+) (?<days_of_the_week>\*|([0-9],?)+)/);
    console.log(cron);
    return new Cron({
        second: cron.groups.second,
        minute: cron.groups.minute,
        hour: cron.groups.hour,
        day_of_them_month: cron.groups.day_of_the_month,
        month: cron.groups.month,
        days_of_the_week: cron.groups.days_of_the_week
    });
}