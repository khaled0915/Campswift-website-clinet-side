import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useParticipant from "../../../hooks/useParticipant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {


    const stripe = useStripe();

    const [ clientSecret , setClientSecret ] = useState('')

    const [error, setError] = useState('')
const [ transactionId , setTransactionId ] = useState('')
const elements = useElements();
const {user} = useAuth();

const navigate = useNavigate();

const [participant , refetch] = useParticipant();

const totalPrice  = participant.reduce( (total , item ) => total + item.campFees , 0)

const axiosSecure = useAxiosSecure();


useEffect( () =>{

    axiosSecure.post('/create-payment-intent' , {campFees : totalPrice})
    .then( res=> {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
    } )




} , [axiosSecure , totalPrice] )


const handleSubmit  = async (event) =>{
    event.preventDefault();

    if(!stripe || !elements){
        return
    }


    const card = elements.getElement(CardElement)


    if(card === null){
        return
    }

    const {error , paymentMethod} = await stripe.createPaymentMethod({
        type : 'card',
        card
    })

    if(error){
        console.log('payment error'  , error);
        setError(error.message)
    }
    else{
        console.log('payment method' , paymentMethod);
        setError('')
    }

    // confirm payment 

    const {paymentIntent  , error : confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method : {
            card : card ,
            billing_details : {
            
            email : user?.email || 'anonymous' ,
            name : user?.displayName || 'anonymous' 
            
            }

        }
    })

    if(confirmError){
        console.log('confirm error');
    }
    else{
        console.log('payment intent' , paymentIntent);
        if(paymentIntent.status === 'succeeded') {
            console.log('transaction id' , paymentIntent.id);
            setTransactionId(paymentIntent.id)


            // now save the data in the database 

            const payment = {
                email : user.email , 

                campFees : totalPrice ,
                transactionId : paymentIntent.id,
                date : new Date(),  //utc date convert . use moment js 

                campItemId : participant.map(item => item.campId),
                
                status : 'pending'

            }

     const res = await  axiosSecure.post('/payments' , payment)
     console.log( 'payment save', res.data);
refetch() ;
if(res.data?.paymentResult?.insertedId){
Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your payment is successfully complete",
    showConfirmButton: false,
    timer: 1500
  });
//   navigate('/dashboard/paymentHistory')
}


        }
    }





    





}
    return (

        <form onSubmit={handleSubmit}>

        <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <button className="btn  btn-outline btn-success my-6" type="submit"


          >
            
                Pay
              </button>
              <p className="text-red-500"> {error} </p>
        
        {
            transactionId && <p className="text-green-500"> Your transaction id : {transactionId} </p> 
        }
        
        
               </form>
        
    );
};

export default CheckOutForm;