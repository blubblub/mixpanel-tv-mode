var hideSearchBar = false;
var hideDescriptionBar = false;
var displayConcreteNumbers = false;

// Fetch options
chrome.storage.sync.get(
{
    hideSearchBar: true,
    hideDescriptionBar: true,
    displayConcreteNumbers: true
},
(items) => {
    hideSearchBar = items.hideSearchBar;
    hideDescriptionBar = items.hideDescriptionBar;
    displayConcreteNumbers = items.displayConcreteNumbers;
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

    if (hideSearchBar) {
        hideSearchBar();
    }

    if (hideDescriptionBar) {
        hideDescriptionBar();
    }
    
    if (displayConcreteNumbers) {
        updateMetrics();
    }
}

setTimeout(update, 500);