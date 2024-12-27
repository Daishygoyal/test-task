import axios from 'axios';

export const getSalesRep = async (req, res, next) => {
    try {
        const API_BASE = 'http://127.0.0.1:8080';
        const endpoint = '/countries';
        const { data } = await axios.get(`${API_BASE}${endpoint}`);

        const regions = {}
        data.map((country) => {
            if(typeof regions[country.region] === 'undefined') {
                regions[country.region] = [];
            }
            regions[country.region].push(country.name);
        })

        const salesRepRequirement = [];
        
        Object.keys(regions).map((region) => {
            const countriesInRegion = regions[region];
            salesRepRequirement.push({
                region,
                minSalesReq: Math.ceil(countriesInRegion.length / 7),
                maxSalesReq: Math.ceil(countriesInRegion.length / 3),
            });
        })

        return res.json(salesRepRequirement);
    } catch (err) {
        next(err);
    }
};
