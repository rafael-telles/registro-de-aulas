import Peer from 'peerjs';

export function createPeer(id?: string): Promise<Peer> {
  return new Promise((resolve, reject) => {
    const peer = new Peer(id);

    peer.on('open', () => {
      resolve(peer);
    });

    peer.on('error', (err) => {
      reject(err);
    });
  });
}
