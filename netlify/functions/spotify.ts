import { Handler } from '@netlify/functions';
import * as qs from 'qs'
import axios from 'axios';

const handler: Handler = async (event, context) => {
  const url = `https://accounts.spotify.com/api/token`;

  const client_id = process.env['client-id'] || 'CLIENT-ID';
  const client_secret = process.env['secret'] || 'CLIENT-SECRET';
  const data = { grant_type: 'client_credentials' }

  try {
    const resp = await axios.post(
      url,
      qs.stringify(data)
      ,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(client_id + ':' + client_secret).toString('base64'),
        }
      }
    );
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        ok: false,
        data: resp.data
      }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        ok: false,
        msg: 'Verifique credenciales'
      }),
    };
  }



};

export { handler };
