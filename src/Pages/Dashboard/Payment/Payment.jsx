import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.)

const Payment = () => {
    return (
        <div>
            <h2 className="text-3xl underline font-bold text-center p-5 text-amber-400"> This is Payment Section  </h2>

            <div>
                <Elements stripe={stripePromise} >


                </Elements>
            </div>
        </div>
    );
};

export default Payment;