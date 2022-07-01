const Text = artifacts.require('Text');
const truffleAssert = require('truffle-assertions');

contract('Text', (accounts) => {
  before(async () => {
    this.instance = await Text.deployed();
  });

  it('should be initialized with correct value', async () => {
    const text = await this.instance.getText();

    assert.equal(text, 'Hello Truffle', 'Wrong initialized value');
  });

  it('should change the text', async () => {
    const chnagedText = 'Hello';

    await this.instance.setText(chnagedText, {from: accounts[0]});

    const text = await this.instance.getText();

    assert.equal(text, chnagedText, 'does not change the value');
  });

  it('should throw exception', async () => {
    await truffleAssert.reverts(this.instance.errorOccur(1, {from: accounts[0]}), 'Error');
  });

  it('should throw exception', async () => {
    const rst = await this.instance.errorOccur(0, {from: accounts[0]});

    assert.equal(rst.words[0], 0, 'errorOccur event not emitted');
  });
});
