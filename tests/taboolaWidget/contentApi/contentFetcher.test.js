import {fetchContent, buildApiUrl} from '../../../taboolaWidget/contentApi/contentFetcher'; // Update this import with the name of your module

// Mock the config
jest.mock('../../../taboolaWidget/contentApi/config/apiConfig.js', () => ({
    API_BASE_URL: "mockedBaseURL/",
    RECOMMENDATION_GET: "/mockedRecommendationGet?",
    API_PARAMETERS: {
        publisher: "mockedPublisher",
        params: {
            "mocked.key": "mockedValue",
            "mocked.key2": "mockedValue",
        },
    },
}));

describe('fetchContent', () => {
    let mockXHR = {
        open: jest.fn(),
        send: jest.fn(),
        readyState: 4,
        status: 200,
        response: 'success',
        onerror: null
    };
    setTimeout(() => {
        // @ts-ignore
        mockXHR['onreadystatechange']();
    }, 0);

    beforeEach(() => {
        window.XMLHttpRequest = jest.fn(() => mockXHR);
    });

    it('should resolve with data on successful request', async () => {
        const data = await fetchContent();
        expect(data).toBe('success');
    });

    it('should reject on request error', async () => {
        mockXHR.onerror = jest.fn(() => mockXHR.onerror());
        expect(fetchContent()).rejects.toBe('Request failed.');
    });

    it('should reject on non-200 status codes', async () => {
        mockXHR.status = 400;
        mockXHR.statusText = 'Bad Request';
        expect(fetchContent()).rejects.toBe('Bad Request');
    });

    it('should build url correctly', async () => {
        const expectedUrl = "mockedBaseURL/mockedPublisher/mockedRecommendationGet?mocked.key=mockedValue&mocked.key2=mockedValue";
        expect(buildApiUrl()).toBe(expectedUrl);
    });
});
