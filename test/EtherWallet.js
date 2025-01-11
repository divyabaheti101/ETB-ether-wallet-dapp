const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require("hardhat")
const {expect} = require('chai')

describe('EtherWallet', function(){
    async function deployFixture(){
        const [owner, otherAccount] = await ethers.getSigners();

        const EtherWallet = await ethers.getContractFactory('EtherWallet');
        const etherWallet = await EtherWallet.deploy();
        
        return {etherWallet, owner, otherAccount};
    }

    describe('deployment', function(){
        it('should deploy and set owner to the deployer address', async function(){
            const {etherWallet, owner} = await loadFixture(deployFixture)
            expect(await etherWallet.owner()).to.equal(owner.address)
        })
    })
})