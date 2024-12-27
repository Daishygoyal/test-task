import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { use, expect }  from 'chai';
import chaiHttp from 'chai-http';
import Country from '../src/models/Country.js';

import app from '../index.js';

const chai = use(chaiHttp);

let mongoServer;

const countries = [
    { _id: new mongoose.Types.ObjectId(), name: 'Morocco', region: 'MEA' },
    { _id: new mongoose.Types.ObjectId(), name: 'Kenya', region: 'MEA' },
    { _id: new mongoose.Types.ObjectId(), name: 'United Arab Emirates', region: 'MEA' },
    { _id: new mongoose.Types.ObjectId(), name: 'Romania', region: 'Europe' },
    { _id: new mongoose.Types.ObjectId(), name: 'Indonesia', region: 'Apac' },
    { _id: new mongoose.Types.ObjectId(), name: 'Netherlands', region: 'Europe' },
    { _id: new mongoose.Types.ObjectId(), name: 'Mauritius', region: 'MEA' },
];

describe('Country API Tests', () => {
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Country.insertMany(countries);
    });

    afterEach(async () => {
        await Country.deleteMany();
    });

    it('should return all countries if no region is specified', async () => {
        const res = await chai.request.execute(app).get('/countries');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.has.length(countries.length);
    });

    it('should return countries in the specified region', async () => {
        const res = await chai.request.execute(app).get('/countries?region=Europe');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.deep.includes({
            name: 'Romania',
            region: 'Europe',
        });
        expect(res.body).to.be.an('array').that.deep.includes({
            name: 'Netherlands',
            region: 'Europe',
        });
    });

    it('should return an empty array for regions with no countries', async () => {
        const res = await chai.request.execute(app).get('/countries?region=Africa');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.is.empty;
    });
});
