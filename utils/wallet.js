import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import * as config from '../config';

var Tezos = undefined, wallet = undefined;

function setup() {
  if (Tezos || wallet) { return }
  Tezos = new TezosToolkit(config.RPC_URL);

  const options = {
    name: config.NAME,
    // iconUrl: 'https://tezostaquito.io/img/favicon.png',
    preferredNetwork: config.NETWORK,
  };

  wallet = new BeaconWallet(options);

  Tezos.setWalletProvider(wallet);
}

const connectWallet = async () => {
  setup();
  await wallet.requestPermissions({
    network: {
      type: config.NETWORK,
    },
  });
  return wallet;
};

const disconnectWallet = async () => {
  await wallet.clearActiveAccount();
};

const getPKH = async () => {
  connectWallet();
  const pkh = await wallet.getPKH();
  return pkh;
};

const getContract = async () => {
  const contract = await Tezos.wallet.at(config.CONTRACT_ADDRESS);
  return contract;
};

const createPost = async ({ ipfs_url, title, thumbnail_url, frGoal = 0 }) => {
  await connectWallet();
  const contract = await getContract();
  const op = await contract.methods.create_post(
    frGoal,
    ipfs_url,
    thumbnail_url,
    title
  ).send();
  await op.confirmation();
}

const sendTip = async ({ post_id, amount_mutez }) => {
  await connectWallet();
  const contract = await getContract();
  const op = await contract.methods.send_tip(
    post_id
  ).send({
    amount: 100000,
    mutez: true
  });
  await op.confirmation();
}

export { connectWallet, disconnectWallet, getPKH, getContract, createPost, sendTip };
