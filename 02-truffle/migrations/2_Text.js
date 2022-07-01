const Text = artifacts.require('Text');

module.exports = function (deployer) {
  deployer.deploy(Text, 'Hello Truffle');
};
