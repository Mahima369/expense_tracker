const balance=document.getElementById("balance");
const moneyplus=document.getElementById("money-plus");
const moneyminus=document.getElementById("money-minus");
const text=document.getElementById("text");
const amount=document.getElementById("amount");
const form=document.getElementById("form");
const list1=document.getElementById("list");
let id=1;





const localstorage=JSON.parse(localStorage.getItem("transactions"));

let transactions=localStorage.getItem("transactions") !==null ? localstorage:[];

function addtransaction(e)
{
    e.preventDefault();  //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.Clicking on a "Submit" button, prevent it from submitting a form
   /* Clicking on a link, prevent the link from following the URL*/
if (text.value.trim()===""|| amount.value.trim()==="")
{
    alert("enter a valid amount and text");
}

else{
const transaction={  //it is a object with the following properties
id:generateID(),
text:text.value,
amount:+amount.value,   //the unary operator is used to convert the value to a number
}
transactions.push(transaction)
addtransactionsDOM(transaction);
updatelocalstorage();
updatevalues()
text.value="";
amount.value="";


}

};

function generateID(){
return Math.floor(Math.random()*100000)

}

function addtransactionsDOM(transactions) {

const sign=transactions.amount < 0 ? "-":"+";
const item=document.createElement("li");

item.classList.add(
transactions.amount < 0 ? "minus":"plus"
);

item.innerHTML=`${transactions.text}<span>${sign}${Math.abs(transactions.amount)}</span><button onclick="removetransaction(${transactions.id})">X</button>`;
    
  
    
 
list1.appendChild(item);

}

function removetransaction(id){

    transactions=transactions.filter(transaction => transaction.id!==id);
    updatelocalstorage();
    Init();  //to restore the balance,income and expenses
}


function updatevalues(){

const amounts=transactions.map((transaction)=>transaction.amount);//creates new array with only the amount
const total=amounts.reduce((acc,value)=>(acc+=value),0); //refer programming with mosh for reduce() concept
const income=amounts.filter(item=>item>0).reduce((acc,value)=>(acc+=value),0);
const expense=amounts.filter(item=>item<0).reduce((acc,value)=>(acc+=value),0)*-1;




balance.innerHTML=`₹${total}.00`;
moneyplus.innerHTML=`₹${income}.00`;
moneyminus.innerHTML=`₹${expense}.00`;




}


function Init(){
list1.innerHTML="";
transactions.forEach(addtransactionsDOM);
updatevalues();

}

function updatelocalstorage()
{
    localStorage.setItem("transactions" , JSON.stringify(transactions));
}


Init();

form.addEventListener("submit",addtransaction);  //All you need to do is add the EventListener to the form and you can access any information that will be submitted by the form.to get information of the form submit event listener is used instead of click