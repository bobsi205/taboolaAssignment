import {fetchContent} from "./contentApi/contentFetcher.js";
import {createWidgetHeader, createCardComponents, createWidgetContainer} from "./widgetElementsCreator.js";


export const createCards = async (widgetContainer) => {
    try {
        let rawResult = await fetchContent();
        let result = JSON.parse(rawResult);

        createCardComponents(widgetContainer, result);
    } catch (error) {
        console.error("Failed to create cards", error);
    }
}


export const createWidget = async (pageWidgetContainerClass) => {
    const pageWidgetContainer = document.querySelector(pageWidgetContainerClass);
    if (pageWidgetContainer) {
        const widgetContainer = createWidgetContainer(pageWidgetContainer);
        createWidgetHeader(widgetContainer);
        await createCards(widgetContainer);
    } else {
        console.error("Error: no widget container found.");
    }
}