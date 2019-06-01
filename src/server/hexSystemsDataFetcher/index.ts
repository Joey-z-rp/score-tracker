import fetch from 'cross-fetch';

const fetcher = () => {
    return fetch('http://shooting.hexsystems.com.au/shooter/18565')
        .then(response => response.text())
};

export default fetcher;