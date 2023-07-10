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
    //console.log(multiMetricSelectorChart);
    if (multiMetricSelectorChart.shadowRoot != null) {
        const multiMetricSelector = multiMetricSelectorChart.shadowRoot.querySelector('mp-multi-metric');

        if (multiMetricSelector) {
            const metricSelector = multiMetricSelector.shadowRoot.querySelector('mp-metric');
            
            if (metricSelector) {
                const valueTooltip = metricSelector.getAttribute('value-tooltip');
                const value = metricSelector.shadowRoot.querySelector('div.value');
                value.innerHTML = valueTooltip;
                value.style.fontSize = '4vw';

                return true;
            }
        }
    }

    return false;
}

function updateMetrics() {
    const allMetricCharts = document.querySelectorAll('mp-insights-metric-chart');
    
    if (allMetricCharts.length === 0) {
        return false;
    }
    // Fetch all metrics and try to update
    for (let i = 0; i < allMetricCharts.length; i++) {
        if (!updateMetric(allMetricCharts[i])) {
            return false;
        }
    }

    return true;
}

function hideDescriptionBar() {
    const topIntroHeader = document.querySelector('div.header');

    if (topIntroHeader) {
        topIntroHeader.style.display = 'none';

        return true;
    }

    return false;
}

function hideSearchBar() {
    const topHeader = document.querySelector('#wrapper').firstChild.nextSibling;

    if (topHeader) {
        topHeader.style.display = 'none';
        return true;
    }

    return false;
}

// Log state, so we can continue to update.
var updatesComplete = {};

function update() {
    //console.log(window.location.toString());
    // Only active when tv=true
    if (window.location.toString().indexOf('tv=true') === -1) {
        return;
    }

    if (shouldHideSearchBar && !updatesComplete.hideSearchBar) {
        if (hideSearchBar()) {
            updatesComplete.hideSearchBar = true;
        }
    }

    if (shouldHideDescriptionBar && !updatesComplete.hideDescriptionBar) {
        if (hideDescriptionBar()) {
            updatesComplete.hideDescriptionBar = true;
        }
    }
    
    if (shouldDisplayConcreteNumbers && !updatesComplete.displayConcreteNumbers) {
        if (updateMetrics()) {
            updatesComplete.displayConcreteNumbers = true;
        }
    }

    if (updatesComplete.hideSearchBar && updatesComplete.hideDescriptionBar && updatesComplete.displayConcreteNumbers) {
        return;
    }
    else {
        // Rerun function if one of the updates failed.
        setTimeout(update, 500);
    }
}

setTimeout(update, 500);