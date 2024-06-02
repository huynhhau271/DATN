import { CronJob } from "cron";
import bookingService from "../services/booking.service";

export const cronjobNotifi = CronJob.from({
    cronTime: "0 0 9 * * *",
    onTick: async function () {
        await bookingService.notification();
    },
    start: true,
    timeZone: "Asia/Ho_Chi_Minh",
});
