let obj = {
  value: "maz",
  status: [this.value ? this.value : "pending"],
  resolve: function (val) {
    let valueTaker = val;
    this.value = val;
    return 1;
  },
  reject: function (val) {
    return 0;
  },
  thenSol: function (cb, val, resolved) {
    // let valueTaker=this.value;
    // let result = this.resolve; //will call resolve
    if (resolved === 1) {
      cb(val);
    } else {
      console.log("rejected");
    }
  },
  then: function (cb, val) {
    // let valueTaker=this.value;
    // let result = this.resolve; //will call resolve
    let instanceValue = val;
    const catchResult = this.resolve(instanceValue); //will set the value if passed
    if (catchResult === 1) {
      cb(instanceValue); //callback how to pass in high order totally //depends on high order function
      //here cb is a callback for then () function but it will act
      //as high order for other function passed inside then()
    } else {
      console.log("rejected");
    }
  },
  test: function (cb) {
    cb;
  },
  then2: function (cb, val) {
    cb(this.resolve(this.value || val));
  },
  then3: function (cb, val) {
    let result = this.resolve;
    let instanceValue = val;
    cb(result, instanceValue || this.value);
  },
};

function logger(instanceVal) {
  //   let r = cb(instanceVal);
  console.log(instanceVal);
}
let object = obj;
console.log(object);
obj.then(logger, "a");
// obj.test(console.log("hello"));
// obj.then2(console.log, "david");
// obj.then3(logger, "machie");
// obj.then3(logger);

const result = object.reject("Hello World");
object.thenSol(logger, "Hello world", result);
