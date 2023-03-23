import { Experience } from "./database/ExperienceCtor";

const sortExperience = (
    a: Experience,
    b: Experience,
    newest_first: boolean = true
) => {
    const dateFrom_a = new Date(newest_first ? b.dateFrom : a.dateFrom);
    const dateFrom_b = new Date(newest_first ? a.dateFrom : b.dateFrom);

    const startDiff = dateFrom_a.getTime() - dateFrom_b.getTime();

    switch (startDiff) {
        case 0:
            const dateTo_a = new Date(a.dateTo ?? new Date());
            const dateTo_b = new Date(b.dateTo ?? new Date());
            return dateTo_a.getTime() - dateTo_b.getTime();
        default:
            return startDiff;
    }
};

export default sortExperience;
