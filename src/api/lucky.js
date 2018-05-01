import { getPackTx } from '@/api';
import agent from 'superagent';

function getDateTimeString(time) {
  return new Date(time).toLocaleString();
}

async function getTokenHistoryTx(itemId) {
  const api = 'https://kovan.etherscan.io/api';
  const address = '0xb760ada4f12e5d29eff2d9eef3bca94b574a1f2f';
  const topic0 =
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
  const getLogs = {
    module: 'logs',
    action: 'getLogs',
    fromBlock: 4000,
    toBlock: 'latest'
  };
  const params = { address, topic0, apikey: 'YourApiKeyToken' };
  // Use query instead of hard-encoded params
  const response = await agent
    .get(api)
    .query(getLogs)
    .query(params);
  const { result } = response.body;
  const trimResult = ({ data, transactionHash, timeStamp }) => ({
    transactionHash,
    timeStamp,
    tokenId: parseInt(data, 16)
  });
  const onlyThisToken = ({ tokenId }) =>
    tokenId === parseInt(itemId, 10);
    // Map & Filter
  return result.map(trimResult).filter(onlyThisToken);
}

async function getDrawHistoryTx(itemId) {
  const tokenHistory = await getTokenHistoryTx(itemId);

  const cardDrawTxs = await getPackTx();
  // Functions for Filter and Map again
  const isInCDTxs = ({ txHash }) =>
    tokenHistory.find(({ transactionHash }) => transactionHash === txHash);
  const formatDatetime = ({ date, ...rest }) => ({
    date: getDateTimeString(date),
    ...rest
  });

  return cardDrawTxs
    .filter(isInCDTxs)
    .map(formatDatetime);
}

export default getDrawHistoryTx;
