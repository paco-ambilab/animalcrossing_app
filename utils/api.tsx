
import IslandModel from '../models/islandModel';


const domain = 'https://78045f5b-8021-4a75-94bf-14aaacacdde0.api.beta.kintohub.com/animalcrossingserver/graphql/'

const fetchEx = (url="", params={}, timeout=20000) => {
    let isTimeout = false;
    return new Promise(function(resolve, reject) {
        const TO = setTimeout(function() {
            isTimeout = true;
            reject(new Error('Fetch timeout'));
        }, timeout);

        fetch(url, params)
            .then(res => {
                clearTimeout(TO)
                if(!isTimeout) {
                    resolve(res)
                }
            }).catch(e => {
                if( isTimeout ){
                    return
                }
                reject(e)
            })
    })
}

type FetchIslandsParams = {
  token: string,
  search: string,
}

const getCommonHeaders = (token='') => {
	return {
	      'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'Authorization': token,
	  	}
}

function fetchIslands(params: FetchIslandsParams) {
	const query = `
    query ($search: String) {
      islands(search: $search) {
      accountInfo {
          user {
            username
          }
        switchID
        }
      id
      location
      islandPassCode
      hashTagDescription
      createTime
      }
    }`;

	var search = '';
	if (params.search) {
	  search = params.search
	}
	var token = '';
	if (params.token) {
		token = params.token
	}
	return fetchEx(domain, {
    	method: 'POST',
	    headers: getCommonHeaders(token),
	  	body: JSON.stringify({
		  query,
		  variables: { search },
		})
	});
}

type FetchBuysParams = {
  token: string,
  search: string,
}


function fetchBuys(params: FetchBuysParams) {
	const query = `
    query ($search: String) { 
      buys(search: $search) {
        id
        itemName
        unitPrice
        numberOfItem
        islandPassCode
        createTime
        close
      }
    }`;

	var search = '';
	if (params.search) {
	  search = params.search
	}
	var token = '';
	if (params.token) {
		token = params.token
	}
	return fetchEx(domain, {
    	method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'Authorization': token,
	  	},
	  	body: JSON.stringify({
		  query,
		  variables: { search },
		})
	});
}

type CreateIslandParams = {
  token: string,
}

function createIsland(params: CreateIslandParams) {

}

type EnqueueIslandParams = {
  token: string,
}

function enqueueIsland(params: EnqueueIslandParams) {

}

type CreateBuyParams = {
  token: string,
}

function createBuy(params: CreateBuyParams) {

}

type EnqueueBuyParams = {
  token: string,
}

function enqueueBuy(params: EnqueueBuyParams) {
	
}

type FetchAccountInfoParams = {
  token: string,
}

function fetchAccountInfo(params: FetchAccountInfoParams) {

}

type SignInParams = {
  token: string,
}

function login(params: SignInParams) {

}

type CreateAccountParams = {
  token: string,
}

function createAccount(params: CreateAccountParams) {

}


export { fetchIslands, fetchBuys }