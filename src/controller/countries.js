import ConnectDB from '../config/db.js';
import Country from '../models/Country.js';

export const getCountries = async (req, res, next) => {
    try {
        ConnectDB();

        let { region = null } = req.query;

        let filter = {};
        if (region) {
            filter.region = region;
        }

        const countries = await Country.find(filter,  { _id: 0 });

        return res.json(countries);
    } catch (err) {
        next(err);
    }
};
