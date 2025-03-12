import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('Testing server if the logic is working or not', () => {
  let app: INestApplication;
  let patientToken: string;
  let insurerToken: string;
  let claimId: string;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Patient: Register, Auth & Claim Creation', () => {
    it('should register a new patient', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(testPatient)
        .expect(201);
      expect(response.body.email).toEqual(testPatient.email);
    });

    it('should login with valid patient credentials', async () => {
      const loginPayload = { email: testPatient.email, password: testPatient.password };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginPayload)
        .expect(201);
      expect(response.body.token).toBeDefined();
      patientToken = response.body.token;
    });

    it('should create a new claim', async () => {
      const newClaim = {
        patientName: 'John Doe',
        patientEmail: testPatient.email,
        amount: 100,
        description: 'Test Claim',
        supportingDocuments: ['doc.jpg'],
      };

      const response = await request(app.getHttpServer())
        .post('/claims')
        .set('Authorization', `Bearer ${patientToken}`)
        .send(newClaim)
        .expect(201);

      expect(response.body._id).toBeDefined();
      expect(response.body.patientName).toEqual(newClaim.patientName);
      claimId = response.body._id;
    });

    it('should retrieve all claims for patient', async () => {
      const response = await request(app.getHttpServer())
        .get('/claims')
        .set('Authorization', `Bearer ${patientToken}`)
        .expect(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      const createdClaim = response.body.find((claim: any) => claim._id === claimId);
      expect(createdClaim).toBeDefined();
    });
  });

  describe('Insurer: Register, Auth & Claim Management', () => {
    it('should register a new insurer', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(testInsurer)
        .expect(201);
      expect(response.body.email).toEqual(testInsurer.email);
    });

    it('should login with valid insurer credentials', async () => {
      const loginPayload = { email: testInsurer.email, password: testInsurer.password };
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginPayload)
        .expect(201);
      expect(response.body.token).toBeDefined();
      insurerToken = response.body.token;
    });

    it('insurer updates the claim status', async () => {
      const updatePayload = { status: 'approved' };
      const response = await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .set('Authorization', `Bearer ${insurerToken}`)
        .send(updatePayload)
        .expect(200);
      expect(response.body.status).toEqual('approved');
    });

    it('get all claims(insurer)', async () => {
      const response = await request(app.getHttpServer())
        .get('/claims')
        .set('Authorization', `Bearer ${insurerToken}`)
        .expect(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      const updatedClaim = response.body.find((claim: any) => claim._id === claimId);
      expect(updatedClaim).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
