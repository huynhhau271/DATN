import dayjs from "dayjs";

export const formatDate = (date?: Date | string, format = "DD-MM-YYYY") => {
     return dayjs(date).format(format);
};
