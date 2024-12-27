import axios from 'axios';

export const getOptimal = async (req, res, next) => {
    try {
        const API_BASE = 'http://127.0.0.1:8080';
        const endpoint = '/countries';
        const { data } = await axios.get(`${API_BASE}${endpoint}`);

        const regions = {}
        data.map((country) => {
            if (typeof regions[country.region] === 'undefined') {
                regions[country.region] = [];
            }
            regions[country.region].push(country.name);
        })

        const optimalRequirement = [];

        Object.keys(regions).map((region) => {
            const countriesInRegion = regions[region];
            const minSalesReq = Math.ceil(countriesInRegion.length / 7);
            optimalRequirement.push({
                region,
                counrtyCount: Math.ceil(countriesInRegion.length / minSalesReq),
                countryList: countriesInRegion,
            });
        })

        return res.json(optimalRequirement);
    } catch (err) {
        next(err);
    }
};
