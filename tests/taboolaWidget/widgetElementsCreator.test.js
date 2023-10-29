// widget.test.js
import { createWidgetHeader, createWidgetContainer, createCardComponents } from '../../taboolaWidget/widgetElementsCreator.js';

describe('Widget Functions', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '<div id="testContainer"></div>';
        container = document.getElementById('testContainer');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('createWidgetHeader adds the widget header to the parent', () => {
        createWidgetHeader(container);

        const header = container.querySelector('.taboola-widget-header');
        expect(header).not.toBeNull();

        const title = header.querySelector('.taboola-header-title');
        expect(title).not.toBeNull();
        expect(title.innerHTML).not.toBeNull();

        const sponsor = header.querySelector('.taboola-header-provider');
        expect(sponsor).not.toBeNull();
        expect(sponsor.innerHTML).not.toBeNull();
    });

    it('createWidgetContainer creates and returns the widget container', () => {
        const widget = createWidgetContainer(container);
        expect(widget).not.toBeNull();
        expect(widget.classList.contains('taboola-widget-container')).toBeTruthy();
    });

    it('createCardComponents adds cards to the widget container', () => {
        const testApiResult = {
            list: [{
                url: 'testURL',
                thumbnail: [{ url: 'testThumbnailURL' }],
                name: 'TestName',
                branding: 'TestBranding',
                type: 'sponsored'
            }]
        };

        const widgetContainer = createWidgetContainer(container);
        createCardComponents(widgetContainer, testApiResult);

        const card = container.querySelector('.taboola-card');
        expect(card).not.toBeNull();

        const imageContainer = card.querySelector('.taboola-card-image-container');
        expect(imageContainer.getAttribute('href')).toBe('testURL');
        expect(imageContainer.getAttribute('target')).toBe('_blank'); // since type is "sponsored"

        const image = imageContainer.querySelector('.taboola-card-image');
        expect(image.getAttribute('src')).toBe('testThumbnailURL');

        const body = card.querySelector('.taboola-card-body');
        expect(body).not.toBeNull();

        const title = body.querySelector('.taboola-card-title');
        expect(title.innerHTML).toBe('TestName');

        const footer = body.querySelector('.taboola-card-footer');
        const branding = footer.querySelector('.taboola-card-branding');
        expect(branding.innerHTML).toBe('TestBranding');
    });
});
