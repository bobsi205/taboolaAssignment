import {createWidget, createCards} from "../../taboolaWidget/widget";
import {fetchContent} from "../../taboolaWidget/contentApi/contentFetcher";
import {
    createCardComponents,
    createWidgetContainer,
    createWidgetHeader
} from "../../taboolaWidget/widgetElementsCreator.js";

jest.mock("../../taboolaWidget/contentApi/contentFetcher.js");
jest.mock("../../taboolaWidget/widgetElementsCreator.js");

describe("createCards function", () => {
    it("calls createCardComponents with proper arguments", async () => {
        const mockData = {key: "value"};
        fetchContent.mockResolvedValue(JSON.stringify(mockData));
        const mockWidgetContainer = document.createElement('div');
        document.body.appendChild(mockWidgetContainer);

        await createCards(mockWidgetContainer);

        expect(createCardComponents).toHaveBeenCalled()
    });
    it("api call error handled", async () => {
        const mockWidgetContainer = document.createElement('div');
        fetchContent.mockImplementation(() => {
            return Promise.reject(new Error());
        });

        let error = null;
        try {
            await createCards(mockWidgetContainer);
        } catch (e) {
            error = e;
        }

        expect(error).toBeDefined();
    });
});

describe("createWidget function", () => {


    let mockPageWidgetContainer;
    let mockWidgetContainer;

    beforeEach(() => {
        fetchContent.mockReset();
        createWidgetContainer.mockReset();
        createWidgetHeader.mockReset();
        createCardComponents.mockReset();

        mockPageWidgetContainer = document.createElement('div');
        document.body.appendChild(mockPageWidgetContainer);
        mockWidgetContainer = document.createElement('div');
    });

    afterEach(() => {
        document.body.removeChild(mockPageWidgetContainer);
    });

    it("creates widget elements and calls createCards if pageWidgetContainerClass element exists", async () => {
        mockPageWidgetContainer.className = "sampleClass";
        createWidgetContainer.mockReturnValue(mockWidgetContainer);

        await createWidget(".sampleClass");

        expect(createWidgetContainer).toHaveBeenCalledWith(mockPageWidgetContainer);
        expect(createWidgetHeader).toHaveBeenCalledWith(mockWidgetContainer);
    });

    it("logs an error if pageWidgetContainerClass element doesn't exist", async () => {
        console.error = jest.fn();

        await createWidget(".nonExistentClass");

        expect(console.error).toHaveBeenCalledWith("Error: no widget container found.");
    });
});


