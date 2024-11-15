import { exec } from 'child_process';

describe('clipshare encrypt', () => {
  it('should encrypt a secret message', (done) => {
    exec('npm start encrypt "My secret message"', (error, stdout, stderr) => {
      expect(stdout).toContain('Encrypted data:');
      expect(stdout).toContain('IV:');
      expect(stdout).toContain('Key:');
      done();
    });
  });
});