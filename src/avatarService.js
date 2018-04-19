import blockies from 'ethereum-blockies-png';
import superagent from 'superagent';

export const getBlockie = address => blockies.createDataURL({ seed: address, scale: 10 });

export const getAvatarFromAddress = _address => `https://s3-ap-northeast-1.amazonaws.com/dravatar.frankwei.xyz/${_address}`;
// const dravatarStorage = 'https://s3-ap-northeast-1.amazonaws.com/dravatar.frankwei.xyz/';
// const address = _address.toLowerCase();
// const result = await superagent
//   .get(`${dravatarStorage}${address}`)
//   .responseType('arraybuffer');

// console.log(result);
// const blockie = getBlockie(_address);
// return result.data;
