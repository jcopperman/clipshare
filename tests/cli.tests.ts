// cli.tests.ts

import { exec } from 'child_process';

describe('clipshare encrypt', () => {
  it('should encrypt a secret message', (done) => {
    // Execute the compiled cli.js directly with a longer timeout
    exec('node dist/cli.js encrypt "My secret message"', { timeout: 5000 }, (error, stdout, stderr) => { 
      if (error) {
        console.error("Error executing command:", error);
        done(error); // Fail the test if there's an error
        return;
      }

      console.log("Output:", stdout); // Log the output for debugging

      expect(stdout).toContain('Encrypted data:');
      expect(stdout).toContain('IV:');
      expect(stdout).toContain('Key:');
      done();
    });
  });
});