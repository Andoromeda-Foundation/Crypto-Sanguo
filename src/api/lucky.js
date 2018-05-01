import { getPackTx } from '@/api';
import * as config from '@/config';
import web3 from '@/web3';
import agent from 'superagent';

const network = config.network[web3.version.network] || config.defaultNetwork;


function getDateTimeString(time) {
  return new Date(time).toLocaleString();
}

async function getTokenHistoryTx(itemId) {
  const api = network.getPackTxApi;
  const address = network.LuckyPackage;
  const topic0 =
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
  const basicParams = network.params;
  const params = { address, topic0, apikey: 'YourApiKeyToken' };
  // Use query instead of hard-encoded params
  const response = await agent
    .get(api)
    .query(basicParams)
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
