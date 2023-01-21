
let carts=document.querySelectorAll('.add-cart');
let products=[
 
  {
    name:'Pinkie Handbag',
    tag:'pinkiehandbag',
    price:10,
    inCart:0,
    img:'img2'
   
  },
  {
    name:'Office Ladies Handbag',
    tag:'officeladieshandbag',
    price:25,
    inCart:0,
    img:'img3'
  },
  {
    name:'Brownie Nested Handbag',
    tag:'brownienestedhandbag',
    price:15,
    inCart:0,
    img:'img4'
  },
  {
    name:'Ladies Trend Handbag',
    tag:'ladiestrendhandbag',
    price:45,
    inCart:0,
    img:'img5'
  },
  {
    name:'Brownie Handbag',
    tag:'browniehandbag',
    price:50,
    inCart:0,
    img:'img6'
  },
  {
     name:'Black Gucci Handbag',
    tag:'blackguccihandbag',
    price:30,
    inCart:0,
    img:'img1'
  }






]
 

for (let i=0; i< carts.length; i++){
  carts[i].addEventListener('click', ()=>{
    //console.log('Added to cart')
    //We call this function whenever the button is clicked. It is attached to a  click EVENT LISTENER To the buttons
    cartNumbers(products[i]);
    totalCost(products[i])


  }); 
}

//this functio is for our cart not to go back to '0' when we REFRESH OUR PAGE.It's similar our fn cartNumbers(), we created first
function onLoadCartNumbers(){
  let productNumbers=localStorage.getItem('cartNumbers');
  if(productNumbers){
    //setting the cart number on our webpage to be equal to the number on the local storage
    document.querySelector('.cart span').textContent=productNumbers;

}
}

function cartNumbers(product){
//Now we paased in products into this fn and will console log this below
//console.log('The product clicked is' , product)

  //we want to do something here
  let productNumbers=localStorage.getItem('cartNumbers');
  //so we then get the number that appears on our LOCAL STORAGE when we click on any product and can be seen in OUR CONSOLE
  //console.log(productNumbers);
  //but what we get here is a string so we have to convert it to a number type
  //console.log(typeof productNumbers);

  productNumbers=parseInt(productNumbers)
  //console.log(typeof productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers +1);
    document.querySelector('.cart span').textContent= productNumbers+1;
  }
    else{
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent=1;
      
    }
    //Calling the new func created from vid3
    setItems(product);
    

  }

  //creating the new func setItem()
  function setItems(product){
    //To make sure it is running
    //console.log('insideof Set Item function');
    //console.log('My product is', product);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    //console.log('My cartItems are', cartItems);//what are are getting here is in JSON format so we want to change this from JSON To JS OBJECT

    //Quick check with if statement
    if(cartItems!=null){

      if(cartItems[product.tag]==undefined){
        //creating a variable which is an object
        cartItems = {
          ...cartItems,
          [product.tag]:product
        }
      }
      //Increasing the incart ppty by 1  
      cartItems[product.tag].inCart += 1;
    }else{
      product.inCart = 1;
      cartItems={
        [product.tag]:product
      }
  
    }
 
    //adding a new thing to our local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }

  function totalCost(product){
    //console.log('The product price is', product.price );
    let cartCost=localStorage.getItem('totalCost');
    
    //console.log('My cartCost is', cartCost);
    //  This shows that whatever we get from our local storage is a string
    //console.log(typeof cartCost );
    //we need to convert to NUMBER using parseInt()
    if (cartCost !=null) {
      cartCost=parseInt(cartCost)
      localStorage.setItem("totalCost",cartCost + product.price)
    } else {
      localStorage.setItem("totalCost", product.price)

    }

    
  }
  function displayCart(){
    //creating a variable that will grab our
    let cartItems = localStorage.getItem("productsInCart");
    cartItems= JSON.parse(cartItems);
    console.log(cartItems);


    let productContainer=document.querySelector(".product");
    if( cartItems && productContainer){
       //To check if its running; console.log('running')
       productContainer.innerHTML=' ';
       Object.values(cartItems).map(item =>{
        productContainer.innerHTML +=
        `
        <div class="product">
         <ion-icon name="close-circle"></ion-icon>
         <img src="Bagimages/${item.img}.avif">
         <span>${item.name}</span>
        </div>

        `

       });

    }

  }


   
  onLoadCartNumbers() ;
  displayCart();
  //whenever we load the page for the first time , it will run and then check our local storage, so if the local storage is 1, it will be 1, even when your refreah the page, becoz its on our local stoarge
