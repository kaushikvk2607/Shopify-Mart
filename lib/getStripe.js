import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51OlxJQSAWQDT4ThJui7HyqhZiTDqC1xip8JN0gtjsfEGRoUcZUfgcd6Qlalol1tGNHGzttB6hwFwYOnSuWswlB6Z00YhhJ28gQ');
  }

  return stripePromise;
}

export default getStripe;