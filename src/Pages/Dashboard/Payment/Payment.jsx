import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    return (
        <div>
            <h2 className="text-3xl underline font-bold text-center p-5 text-amber-400"> This is Payment Section  </h2>

            <div>
                <Elements stripe={stripePromise} >

<CheckOutForm></CheckOutForm>

                </Elements>
            </div>
        </div>
    );
};

export default Payment;