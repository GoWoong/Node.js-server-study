//Pro,is is a JavaScript object for asynchronous operation.
//1. state
//2. producer and consummer
//state: pending -> fulfuiled or rejected
//producer vs consumer

//1.Producer
//when new promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
  //doing some heavy work (network, read files)
  console.log('doing something...');
  setTimeout(() => {
    resolve('ko');
    //reject(new Error('no network'));
  }, 2000);
});

//2. consummers: then, catch, finally
promise//
  .then((value) =>{
    console.log(value);
  })
  .catch(error =>{
    console.log(error);
  })
  .finally(() =>{
    console.log('finally');
  })

//3, promise chaining
const fetchNumber = new Promise((resolve, reject) =>{
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num -1), 1000);
    });
  })
  .then(num => console.log(num));

//4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) =>{
    setTimeout(() => resolve(`＋`), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`${hen} => a`)), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => b`), 1000);
  })

getHen()
  .then(hen => getEgg(hen))
  .catch(error =>{
    return 'c';
  })
  .then(egg => cook(egg))
  .then(meal => console.log(meal))
  .catch(console.log);
