"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
describe('Testing server if the logic is working or not', () => {
    let app;
    let patientToken;
    let insurerToken;
    let claimId;
    const testPatient = {
        email: 'testuser@example.com',
        password: 'testpassword',
        role: 'patient',
    };
    const testInsurer = {
        email: 'insurertest@example.com',
        password: 'testpassword',
        role: 'insurer',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        yield app.init();
    }));
    describe('Patient: Register, Auth & Claim Creation', () => {
        it('should register a new patient', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .post('/users/register')
                .send(testPatient)
                .expect(201);
            expect(response.body.email).toEqual(testPatient.email);
        }));
        it('should login with valid patient credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const loginPayload = { email: testPatient.email, password: testPatient.password };
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send(loginPayload)
                .expect(201);
            expect(response.body.token).toBeDefined();
            patientToken = response.body.token;
        }));
        it('should create a new claim', () => __awaiter(void 0, void 0, void 0, function* () {
            const newClaim = {
                patientName: 'John Doe',
                patientEmail: testPatient.email,
                amount: 100,
                description: 'Test Claim',
                supportingDocuments: ['doc.jpg'],
            };
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .post('/claims')
                .set('Authorization', `Bearer ${patientToken}`)
                .send(newClaim)
                .expect(201);
            expect(response.body._id).toBeDefined();
            expect(response.body.patientName).toEqual(newClaim.patientName);
            claimId = response.body._id;
        }));
        it('should retrieve all claims for patient', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .get('/claims')
                .set('Authorization', `Bearer ${patientToken}`)
                .expect(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            const createdClaim = response.body.find((claim) => claim._id === claimId);
            expect(createdClaim).toBeDefined();
        }));
    });
    describe('Insurer: Register, Auth & Claim Management', () => {
        it('should register a new insurer', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .post('/users/register')
                .send(testInsurer)
                .expect(201);
            expect(response.body.email).toEqual(testInsurer.email);
        }));
        it('should login with valid insurer credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const loginPayload = { email: testInsurer.email, password: testInsurer.password };
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send(loginPayload)
                .expect(201);
            expect(response.body.token).toBeDefined();
            insurerToken = response.body.token;
        }));
        it('insurer updates the claim status', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatePayload = { status: 'approved' };
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .patch(`/claims/${claimId}`)
                .set('Authorization', `Bearer ${insurerToken}`)
                .send(updatePayload)
                .expect(200);
            expect(response.body.status).toEqual('approved');
        }));
        it('get all claims(insurer)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app.getHttpServer())
                .get('/claims')
                .set('Authorization', `Bearer ${insurerToken}`)
                .expect(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            const updatedClaim = response.body.find((claim) => claim._id === claimId);
            expect(updatedClaim).toBeDefined();
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield app.close();
    }));
});
