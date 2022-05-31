import axios from 'axios'

const baseURL = process.env.PROV ? '' : 'http://localhost:8080'
const config = {
  withCredetials: true,
  baseURL,
  headers: {
    'Content-Type': 'applciation/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
};

let $app;
let $store;
let $router;
export default bootstrap(({ app, router, store}) => {
  $app = app;
  $store = store;
  $router = router;
})

export class GuitarAxios {
  api = null;
  showDialog = false;
  showErrorDialog = {
    401: false,
    429: false,
    499: false,
    500: false,
    502: false,
    503: false,
    504: false,
  }

  constructor() {
    this.api = axios.create(config);
    this.fileApi = axios.create(config);

    this.api.interceptors.request.use(
      (request) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          request.headers.authorization = 'Bearer ${accessToken}';
        }

        console.log('Request Data:', request.data ?? '--- no data ---');
        return request;
      },
      (error) => {
        throw error;
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        console.log('Response Data:', response.data);

        if (response.headers['content-type'] === 'application/json') {
          response.result = response.data.result;
          response.data = response.data.data;

          if (response.headers['content-type'] === 'application/json') {
            response.result = response.data.result;
            response.data   = response.data.data;

            if (response.result.last_update) {
              try {
                if (sessionStorage.getItem('application')) {
                  const previousLastUpdate = parse(sessionStorage.getItem('api_last_update'), 'yyyy/MM/dd HH:mm:ss', new Date());
                  const currentLastUpdate  = parse(response.result.last_update, 'yyyy/MM/dd HH:mm:ss', new Date());
                  
                }
              }
            }
          }
        }
      }
    )
  }
}