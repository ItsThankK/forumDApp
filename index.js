import {Contract, ethers, Signer} from "./ethers-5.1.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const add = document.getElementById("add")
const get = document.getElementById("get")

connectButton.onclick =  connect
add.onclick =  addComment
get.onclick =  getComments



async function connect() {
    if (typeof window.ethereum !== undefined) {
       await window.ethereum.request({method: "eth_requestAccounts"})
       connectButton.innerHTML = "Wallet Connected"
    } else {
        connectButton.innerHTML = "Get MetaMask!"
        return;
    }
}

async function addComment() {
  if (typeof window.ethereum !== undefined) {
    const message = document.getElementById("message").value
    if(message === ''){
        alert('Please enter a feedback!!')
    }
     console.log(`Adding your ${message}...`);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
  
    try {
      const transactionResponse = await contract.addComment(message)({
        value: ethers.utils.parseEther(message),
    })
      await listenForTransactionMine(transactionResponse, provider)
  } catch(error) {
            console.log(error);
    }
  } else { console.log("connect MM first");}


}
 
   
const main = document.querySelector('main')


function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReciept) => {
      console.log(`Completed ${transactionReciept.confirmations}`)
      resolve()
    })
  })
}

async function getComments() {

  if (typeof window.ethereum !== undefined) {
    let isloading = true
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    if(isloading){
      main.classList.add('loading')
      main.innerHTML = 'Getting all Feedbacks &#129300...'
    }
    contract.getComments().then(data => {
     if(data){
      isloading = false
      main.classList.remove('loading')
      const mainCommentList = data.map( data => {
        const { creator_address, message } = data
          return ` <section>
          <article>
              <h3>Creator Address: ${creator_address}</h3>
              <h4>FeedBack Message: ${message}</h4>
          </article>
          <hr>
      </section>`
      })
      main.innerHTML = mainCommentList.join('')
     }
    
     
    }).catch(err => {
      main.innerHTML = 'Please connect metamask first'
    })

  }

}
