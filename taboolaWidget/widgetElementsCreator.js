const addAttributes = (attributes, element) => {
    Object.keys(attributes).forEach((attr) => {
        if (element[attr] !== undefined) element[attr] = attributes[attr];
    });
}

const createChildElements = (obj, element) => {
    (obj.child || []).forEach((childObj) => {
        element.appendChild(createElementFromObject(childObj));
    });
}

const createElementFromObject = (obj) => {
    const {elementType, class: className, innerHTML, ...attributes} = obj;
    const element = document.createElement(elementType);

    if (elementType === "a" && attributes.type === "sponsored") {
        element.setAttribute("target", "_blank");
    }

    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;

    addAttributes(attributes, element);
    createChildElements(obj, element);

    return element;
}

export const createWidgetHeader = (parent) => {
    const widgetHeader = {
        elementType: "div",
        class: "taboola-widget-header",
        child: [
            {
                elementType: "span",
                innerHTML: "You May Like",
                class: "taboola-header-title",
            },
            {
                elementType: "span",
                innerHTML: "Taboola",
                class: "taboola-header-provider",
            },
        ],
    };

    parent.appendChild(createElementFromObject(widgetHeader));
};

export const createWidgetContainer = (parent) => {
    const widgetContainer = {
        elementType: "div",
        class: "taboola-widget-container",
    };

    const widgetContainerElement = createElementFromObject(widgetContainer);
    parent.appendChild(widgetContainerElement);

    return widgetContainerElement
};

const createCardsFromResult = (cardContent, container) => {
    (cardContent.list || []).forEach((card) => {
        const {url, thumbnail, name, branding, type} = card;
        const cardObject = {
            elementType: "div",
            class: "taboola-card",
            child: [
                {
                    elementType: "a",
                    class: "taboola-card-image-container",
                    href: url,
                    type: type,
                    child: [
                        {
                            elementType: "img",
                            class: "taboola-card-image",
                            src: thumbnail[0].url,
                        },
                    ],
                },
                {
                    elementType: "div",
                    class: "taboola-card-body",
                    child: [
                        {
                            elementType: "a",
                            href: url,
                            class: "taboola-card-title",
                            type: type,
                            innerHTML: name,
                            dir: "auto",
                        },
                        {
                            elementType: "div",
                            class: "taboola-card-footer",
                            child: [
                                {
                                    elementType: "a",
                                    href: url,
                                    class: "taboola-card-branding",
                                    type: type,
                                    innerHTML: branding,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        container.appendChild(createElementFromObject(cardObject));
    });
}

export const createCardComponents = (widgetContainer, result) => {
    const cardContainer = {
        elementType: "div",
        class: "taboola-cards-container",
    };

    const container = createElementFromObject(cardContainer);
    widgetContainer.appendChild(container);
    createCardsFromResult(result, container);
};
