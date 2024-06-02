import dayjs from "dayjs";

export const formatDate = (date?: Date | string) => {
     return date
          ? dayjs(date).format("DD-MM-YYYY")
          : dayjs(new Date()).format("DD-MM-YYYY");
};
