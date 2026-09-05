import Chanjs from "chanjs";
const chan = new Chanjs();
await chan.start();
chan.run((port) => {
  console.log(`ChanCMS is running on ${port}`);
});