var shouldHideSearchBar = false;
var shouldHideDescriptionBar = false;
var shouldDisplayConcreteNumbers = false;

// Fetch options
chrome.storage.sync.get(
{
    hideSearchBar: true,
    hideDescriptionBar: true,
    displayConcreteNumbers: true
},
(items) => {
    shouldHideSearchBar = items.hideSearchBar;
    shouldHideDescriptionBar = items.hideDescriptionBar;
    shouldDisplayConcreteNumbers = items.displayConcreteNumbers;

});

function updateMetric(multiMetricSelectorChart) {
    if (multiMetricSelectorChart.shadowRoot != null) {
        const multiMetricSelector = multiMetricSelectorChart.shadowRoot.querySelector('mp-multi-metric');

        if (multiMetricSelector) {
            const metricSelector = multiMetricSelector.shadowRoot.querySelector('mp-metric');
            
            if (metricSelector) {
                const valueTooltip = metricSelector.getAttribute('value-tooltip');
                const value = metricSelector.shadowRoot.querySelector('div.value');
                value.innerHTML = valueTooltip;
                value.style.fontSize = '4vw';
            }
        }
    }
}

function updateMetrics() {
    const allMetricCharts = document.querySelectorAll('mp-insights-metric-chart');

    // Fetch all metrics and try to update
    for (let i = 0; i < allMetricCharts.length; i++) {
        updateMetric(allMetricCharts[i]);
    }
}

function hideDescriptionBar() {
    const topIntroHeader = document.querySelector('div.header');

    if (topIntroHeader) {
        topIntroHeader.style.display = 'none';
    }    
}

function hideSearchBar() {
    const topHeader = document.querySelector('#wrapper').firstChild.nextSibling;

    if (topHeader) {
        topHeader.style.display = 'none';
    }    
}

function update() {
    console.log(window.location.toString());
    // Only active when tv=true
    if (window.location.toString().indexOf('tv=true') === -1) {
        return;
    }

    if (shouldHideSearchBar) {
        hideSearchBar();
    }

    if (shouldHideDescriptionBar) {
        hideDescriptionBar();
    }
    
    if (shouldDisplayConcreteNumbers) {
        updateMetrics();
    }
}

setTimeout(update, 500);