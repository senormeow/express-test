import listFiles from './listFiles';

function myTimeout() {
    console.log('Been 10 seconds');
    setTimeout(myTimeout, 5000);
}

myTimeout();

const calllist = new Promise(async (resolve, reject) => {
    try {
    const result = await listFiles();
    resolve(result);
    } catch (error) {
        reject("some error");    
    }
});

Promise.all([calllist]).then((values) => {
    console.log('returned', values[0]);
    console.log('Finished');
});
