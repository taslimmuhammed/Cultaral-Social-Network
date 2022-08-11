import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { useNavigate } from "react-router-dom";
export const EthersContext = createContext(null);
let Contract
export default function Ethers({children}){
  const navigate = useNavigate()
  const contractAddress = "0xdBD648889D71C778b6B1ef06707963150f820474"
  const [currentAccount, setCurrentAccount] = useState(null);
  const ShortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

    const checkIfWalletIsConnect = async () => {
      try {
          if ( window.ethereum == null) {
          alert("please install metamask")
          navigate('/landing')
            }
            else{
              const {ethereum} = window
              const accounts = await ethereum.request({ method: "eth_accounts" });
              if (accounts.length) {
                setCurrentAccount(accounts[0]); 
                const {ethereum} = window
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(contractAddress, abi,signer)
                Contract = contract
                return 1;
              } else {
                alert("No accounts found");
                navigate('/landing')
                return 0;
              }
            }

      } catch (error) {
        console.log("this is check wallet error",error);
        return 0;
      }
    };

    const FInitiator = async () => {
      try {
          if ( window.ethereum == null) {
            }
            else{
                const {ethereum} = window
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(contractAddress, abi,signer)
                Contract = contract
              }

      } catch (error) {
        console.log("this is check wallet error",error);
      }
    };
    const connectWallet = async () => {
      try {
        const {ethereum} = window
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        setCurrentAccount(accounts[0]);
        await getN()
        window.location.reload();
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");   
      }
    };

      const checkOwner = async()=>{
        const {ethereum} = window
        const accounts = await ethereum.request({method: "eth_accounts"})
        const account  = accounts[0]
         const ownerAddress = await Contract.owner()
         let x= false;
         if(account.toUpperCase()===ownerAddress.toUpperCase()) x=true
         return x
      }

      const checkSignIn = async()=>{
        const {ethereum} = window
        const accounts = await ethereum.request({method: "eth_accounts"})
        const account  = accounts[0]
         const s1 = await Contract.active(account)
         const s2 =  parseInt(s1, 16)
         return s2;
      }

      const signIn= async(address, active)=>{
        try{
          const transfer = await Contract.signIn(address, active)
          await transfer.wait()
          alert("Sign In succeful, if your are not redirected , refresh after few minutes")
          navigate('/premium')
        }catch(e){
           // alert(e.data.message)
            console.log(e)
        }
      }
      const getAdminDetails = async()=>{
        try{
          const {ethereum} = window
            let totalSupply = await Contract.totalSupply()
            let days =  await Contract.getDays()
            let currentMonth = await Contract.currentMonth()
            let userLimit = await Contract.userLimit()
            let unitLimit = await Contract.unitLimit()
            let datas = {
              totalSupply : parseInt(totalSupply._hex, 16),
              days : parseInt(days._hex, 16),
              currentMonth : parseInt(currentMonth._hex, 16),
              userLimit : parseInt(userLimit._hex, 16),
              unitLimit : parseInt(unitLimit._hex, 16),
            }
          return datas;
        }catch(e){
          alert(e)
        }
      }

      const getReferanceProfit= async()=>{
        try{
          const {ethereum} = window
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await Contract.referenceProfit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)

        }
      }

      const getAllrankDetails= async()=>{
        try{
          const {ethereum} = window
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          let rank = await Contract.getRank(account)
           rank =  parseInt(rank._hex, 16)
          let toppers = await Contract.getCurrentMonthWinners()
          console.log(toppers)
          let arr =[]
          for(let i=0; i<toppers.length;i++){
            arr.push({
              address:ShortenAddress(toppers[i].userAddress),
              points: parseInt(toppers[i].referalCount._hex, 16),
              fullAddress: toppers[i].userAddress
            })
          }
          return {
            winners :arr,
            myRank: rank
          }
        }catch(e){
          console.log(e)

        }
      }

      const unitBalance = async()=>{
        try{
          const {ethereum} = window
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          // let balance = await Contract.unitBalance(account)
          // let s2 =  parseInt(balance._hex, 16)
         
          let balance1 = await Contract.unitCount(account)
          let s21 =  parseInt(balance1._hex, 16)
          let arr = [s21];
          const benifit = await Contract.benifit(account)
          const s22 =  parseInt(benifit._hex, 16)
          arr.push(s22)
          
          const balance3 = await Contract.referenceProfit(account)
          const s23 =  parseInt(balance3._hex, 16)
          arr.push(s23)
          const balance4 = await Contract.IN(account)
          const s24 =  parseInt(balance4._hex, 16)
          arr.push(s24)
          // console.log(arr)
          // arr.push(s24)
        return arr
        }catch(e){
          console.log(e)
        }
      }
      const rBenifit = async()=>{
        try{
          const {ethereum} = window
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await Contract.benifit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const unitCount = async()=>{
        try{
          const {ethereum} = window
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await Contract.unitCount(account)
          const s2 =  parseInt(balance._hex, 16)
          //console.log("unitcounr",s2)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const limitCount = async()=>{
        try{
          const balance = await Contract.unitLimit()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const getTotalSupply = async()=>{
        try{
          const balance = await Contract.totalSupply()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }
      const getDaysLeft = async()=>{
        try{
          const balance = await Contract.getDays()
          let s2 =  parseInt(balance._hex, 16)
          s2 = 30-s2
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const buyToken= async(x)=>{
        try{
          let y = parseInt(x) 
          let z = y*10
          z = z+""
          let amount  = ethers.utils.hexlify(y)
          const overrides={
            value: ethers.utils.parseEther(z)
          }
          console.log("Sending.....")
          const transfer = await Contract.buyUnitToken(amount, overrides)
          await transfer.wait()
          console.log("transferred")
          alert(`Succefully bought ${x} ticket`)
        }catch(e){
          alert("Transaction Error")
        }
          
      }
     

      const enterGame= async()=>{
          const gameEntry = await Contract.enterGame()
          await gameEntry.wait()
          alert("1 Ticket has been used Lot, if you win your Ticket balance will increase automatically")
      }
      const changeOwner= async(address)=>{
        try{
          await Contract.changeOwner(address)
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const changeLimit= async(limit)=>{
        try{
          const chlmt = await Contract.changeLimit(limit)
          await chlmt.wait()
          alert("Limit changed succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const changeUserLimit= async(limit)=>{
        try{
          const chlmt = await Contract.changeUserLimit(limit)
          await chlmt.wait()
          alert("Limit changed succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const withDrawMoney= async()=>{
        try{
          console.log(Contract)
          const transaction = await Contract.withDrawMoney()
          await transaction.wait()
          alert("The cash has been withdrawn succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }

      const referanceData = async()=>{
        try{
          const {ethereum} = window
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          console.log(Contract)
          const referals = await Contract.myRefferals(account)
          let arr=[];
          for(let i=0; i<9;i++){
            const s1 = await referals[i]._hex
            const s2 =  parseInt(s1, 16)
            arr.push(s2)
          }
          return arr
        }catch(e){
          console.log(e)
        }
      }
      

      const getN = async()=>{
        const chainId = 137 // Polygon Mainnet

        if (window.ethereum.networkVersion !== chainId) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: "0x89" }]
                });
              } catch (err) {
                  // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainName: 'Polygon Mainnet',
                        chainId: "0x89" ,
                        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                        rpcUrls: ['https://polygon-rpc.com/']
                      }
                    ]
                  });
                }
              }
            }
        
      }
const initiaor = async()=>{
  let x=await checkIfWalletIsConnect();
  if(x)getN()
}
    useEffect(() => {
      initiaor()
    }, []);


    return(
        <EthersContext.Provider value={{connectWallet,unitCount,referanceData,getReferanceProfit, currentAccount,changeLimit,limitCount, FInitiator , checkOwner,checkSignIn, signIn,withDrawMoney,unitBalance,buyToken,enterGame,changeOwner,rBenifit,getTotalSupply,getAdminDetails,getAllrankDetails, getDaysLeft}}>
          {children}
        </EthersContext.Provider>
    )
}
