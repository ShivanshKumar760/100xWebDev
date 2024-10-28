import os from "os";

const opSys=os;
const user=opSys.userInfo();
console.log(user);

const upTime=os.uptime();
console.log(upTime);

const currentOS={
    osType:os.type(),
    release:os.release(),
    mem:os.totalmem(),
    freemem:os.freemem()
}
console.log(currentOS);