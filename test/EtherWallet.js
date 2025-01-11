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

    // describe('deposit', function(){
    //     it('should deposit ETH to wallet', async function(){
    //         const {etherWallet} = await loadFixture(deployFixture)
            
    //         const tx = await etherWallet.deposit({
    //             value: ethers.utils.parseEther('1')
    //         })
    //         await tx.wait()

    //         const balance = await ethers.provider.getBalance(etherWallet.address)
    //         expect(balance.toString()).to.equal(ethers.utils.parseEther('1'))
    //     })

    // })

    // describe('withdraw', function(){
    //     it('should withdraw ETH from contract with value 0', async function(){
    //         const {etherWallet, owner} = await loadFixture(deployFixture)

    //         const tx = await etherWallet.connect(owner).withdraw(owner.address, ethers.utils.parseEther('0'))
    //         await tx.wait()

    //         const balance = await ethers.provider.getBalance(etherWallet.address)
    //         expect(balance.toString()).to.equal(ethers.utils.parseEther('0'))
    //     })

    //     it('should withdraw ETH from contract with value non zero', async function(){
    //         const {etherWallet, owner} = await loadFixture(deployFixture)

    //         //let's first deposit some ether
    //         const depositTx = await etherWallet.deposit({
    //             value: ethers.utils.parseEther('1')
    //         })
    //         await depositTx.wait()

    //         const balance = await ethers.provider.getBalance(etherWallet.address)
    //         expect(balance.toString()).to.equal(ethers.utils.parseEther('1'))

    //         const withdrawTx = await etherWallet.withdraw(owner.address, ethers.utils.parseEther('1'))
    //         await withdrawTx.wait()
    //         const withdrawBalance = await ethers.provider.getBalance(etherWallet.address)
    //         expect(withdrawBalance.toString()).to.equal(ethers.utils.parseEther('0'))

    //     })
    // })

})