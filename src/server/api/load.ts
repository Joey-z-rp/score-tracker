import dataFetcher from '../hexSystemsDataFetcher';

export const load = async (req, res) => {
    const result = await dataFetcher();

    res.send(result);
};
