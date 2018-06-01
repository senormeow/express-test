import { exec } from 'child_process';

export default source => {
  return new Promise(async (resolve, reject) => {
    console.log('running listFiles');

    //const cmdLine = 'ls -all ../';
    const cmdLine = "perl -e 'exit(1);'";

      exec(cmdLine, (err, stdout, stderr) => {
        if (err) {
          console.log("Error", err);
          reject(err);
        }
        console.log('Command executed');
        resolve(stdout);
      console.log("After exec");
      });

  });
};
