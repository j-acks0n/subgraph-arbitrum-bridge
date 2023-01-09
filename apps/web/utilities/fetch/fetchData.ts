import { SUBGRAPH_URL } from '../../lib';
import { ETHDeposits } from '../types/data';

type JSONResponse = {
  data?: {
    ethDeposits: ETHDeposits;
  };
  errors?: Array<{ message: string }>;
};

export const fetchData = async (amount = 10): Promise<ETHDeposits> => {
  const headers = {
    'content-type': 'application/json',
  };
  const requestBody = {
    query: `query {
              ethDeposits(first: ${amount}) {
                senderAliased
                destAddr
                value
                msgData
                transactionHash
                blockCreatedAt
              }
            }`,
  };
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  };
  const response = await fetch(SUBGRAPH_URL, options);
  const { data, errors }: JSONResponse = await response.json();
  if (response.ok) {
    const ethDeposits = data?.ethDeposits;
    if (ethDeposits) {
      return ethDeposits;
    } else {
      return Promise.reject(new Error(`No data`));
    }
  } else {
    // handle the graphql errors
    const error = new Error(
      errors?.map((e) => e.message).join('\n') ?? 'unknown'
    );
    return Promise.reject(error);
  }
};

// import { SUBGRAPH_URL } from '../../lib';

// export const fetchData = async () => {
//   try {
//     const headers = {
//       'content-type': 'application/json',
//     };
//     const requestBody = {
//       query: `query {
//               ethDeposits(first: 10) {
//                 senderAliased
//                 destAddr
//                 value
//                 msgData
//                 transactionHash
//                 blockCreatedAt
//               }
//             }`,
//     };
//     const options = {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(requestBody),
//     };
//     const response = await (await fetch(SUBGRAPH_URL, options)).json();
//     return response?.data.ethDeposits;

//   } catch (err) {
//     console.log('ERROR DURING FETCH REQUEST', err);
//   }
// };
