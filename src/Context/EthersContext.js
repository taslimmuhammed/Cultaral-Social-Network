import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
import { abi } from "../Utils/abi";
import { English } from "../Comonents/Languages/English";
import { Chinese } from "../Comonents/Languages/Chinese";
import { Sorter } from "./Sorter";
import { useNavigate } from "react-router-dom";
export const EthersContext = createContext(null);
const {ethereum} = window
export default function Ethers({children}){
   const navigate = useNavigate()
  const contractAddress = "0x9E1f9732258431eA82102EaD97FE0dC419837E8e"
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi,signer)
  const [currentAccount, setCurrentAccount] = useState(null);
    const checkIfWalletIsConnect = async () => {
      try {
        if (!ethereum) return alert("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
          setCurrentAccount(accounts[0]); 
          return 1;
        } else {
          alert("No accounts found");
          return 0;
        }
      } catch (error) {
        console.log("this is check wallet error",error);
        return 0;
      }
    };

    const connectWallet = async () => {
      try {
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
        const accounts = await ethereum.request({method: "eth_accounts"})
        const account  = accounts[0]
         const ownerAddress = await contract.owner()
         let x= false;
         if(account.toUpperCase()===ownerAddress.toUpperCase()) x=true
         return x
      }

      const checkSignIn = async()=>{
        const accounts = await ethereum.request({method: "eth_accounts"})
        const account  = accounts[0]
         const s1 = await contract.active(account)
         const s2 =  parseInt(s1, 16)
         return s2;
      }

      const signIn= async(address, active)=>{
        try{
          const transfer = await contract.signIn(address, active)
          await transfer.wait()
          alert("Sign In succeful, if your are not redirected , refresh after few minutes")
        }catch(e){
           // alert(e.data.message)
            console.log(e)
        }
      }
      const getAdminDetails = async()=>{
        try{
            let totalSupply = await contract.totalSupply()
            let days =  await contract.getDays()
            let currentMonth = await contract.currentMonth()
            let userLimit = await contract.userLimit()
            let unitLimit = await contract.unitLimit()
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
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.referenceProfit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)

        }
      }

      const unitBalance = async()=>{
        try{
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          // let balance = await contract.unitBalance(account)
          // let s2 =  parseInt(balance._hex, 16)
         
          let balance1 = await contract.unitCount(account)
          let s21 =  parseInt(balance1._hex, 16)
          let arr = [s21];
          const benifit = await contract.benifit(account)
          const s22 =  parseInt(benifit._hex, 16)
          arr.push(s22)
          
          const balance3 = await contract.referenceProfit(account)
          const s23 =  parseInt(balance3._hex, 16)
          arr.push(s23)
          const balance4 = await contract.IN(account)
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
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.benifit(account)
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const getRefaralList = async()=>{
        try{
          let arr = await contract.getCurrentMonthWinners()
          arr = await Sorter(arr)
          return arr
        }catch(e){
          console.log(e)
        }
      }

      const unitCount = async()=>{
        try{
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const balance = await contract.unitCount(account)
          const s2 =  parseInt(balance._hex, 16)
          //console.log("unitcounr",s2)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const limitCount = async()=>{
        try{
          const balance = await contract.unitLimit()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const getTotalSupply = async()=>{
        try{
          const balance = await contract.totalSupply()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }
      const getDaysLeft = async()=>{
        try{
          const balance = await contract.getDays()
          const s2 =  parseInt(balance._hex, 16)
          return s2
        }catch(e){
          console.log(e)
        }
      }

      const buyToken= async(x)=>{
          let y = parseInt(x) 
          let z = y*10
          z = z+""
          let amount  = ethers.utils.hexlify(y)
          const overrides={
            value: ethers.utils.parseEther(z)
          }
          console.log("Sending.....")
          const transfer = await contract.buyUnitToken(amount, overrides)
          await transfer.wait()
          console.log("transferred")
      }
     


      
      const enterGame= async()=>{
          const gameEntry = await contract.enterGame()
          await gameEntry.wait()
      }
      const changeOwner= async(address)=>{
        try{
          await contract.changeOwner(address)
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const changeLimit= async(limit)=>{
        try{
          const chlmt = await contract.changeLimit(limit)
          await chlmt.wait()
          alert("Limit changed succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const changeUserLimit= async(limit)=>{
        try{
          const chlmt = await contract.changeUserLimit(limit)
          await chlmt.wait()
          alert("Limit changed succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }
      const withDrawMoney= async()=>{
        try{
          const transaction = await contract.withDrawMoney()
          await transaction.wait()
          alert("The cash has been withdrawn succefully")
        }catch(e){
          console.log(e)
          alert(e.data.message)
        }
      }

      const referanceData = async()=>{
        try{
          const accounts = await ethereum.request({method: "eth_accounts"})
          const account  = accounts[0]
          const referals = await contract.myRefferals(account)
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

    useEffect(() => {
      checkIfWalletIsConnect();
      // changeNetwork()
      getN()
    }, []);

    // useEffect(() => {
    //   if(Lang==true) setLanguage(English)
    //   else setLanguage(Chinese)
    // }, [Lang])
    


    return(
        <EthersContext.Provider value={{connectWallet,unitCount,referanceData,getReferanceProfit, currentAccount,changeLimit,limitCount, checkIfWalletIsConnect , checkOwner,checkSignIn, signIn,withDrawMoney,unitBalance,buyToken,enterGame,changeOwner,rBenifit,getTotalSupply,getAdminDetails}}>
          {children}
        </EthersContext.Provider>
    )
}
