function requestSBTHandler(uri) {
  sbtContract.methods
    .requestSBT(ethereum.selectedAddress, { uri })
    .send({ from: ethereum.selectedAddress });
}
