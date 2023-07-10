// Global Settings and State
var shouldHideSearchBar = true;
var shouldHideDescriptionBar = false;
var shouldDisplayConcreteNumbers = true;

// Log state, so we can continue to update.
var updatesComplete = {};
var observers = {};

// Fetch options
chrome.storage.sync.get(
{
    hideSearchBar: true,
    hideDescriptionBar: false,
    displayConcreteNumbers: true
},
(items) => {
    shouldHideSearchBar = items.hideSearchBar;
    shouldHideDescriptionBar = items.hideDescriptionBar;
    shouldDisplayConcreteNumbers = items.displayConcreteNumbers;

});

function updateMetricFromTooltip(metricSelector) {
    const valueTooltip = metricSelector.getAttribute('value-tooltip');
    const value = metricSelector.shadowRoot.querySelector('div.value');

    value.innerHTML = valueTooltip;
    value.style.fontSize = '4vw';
}

function updateMetric(multiMetricSelectorChart) {
    //console.log(multiMetricSelectorChart);
    if (multiMetricSelectorChart.shadowRoot != null) {
        const multiMetricSelector = multiMetricSelectorChart.shadowRoot.querySelector('mp-multi-metric');

        if (multiMetricSelector) {
            const metricSelector = multiMetricSelector.shadowRoot.querySelector('mp-metric');
            
            if (metricSelector) {
                const value = metricSelector.shadowRoot.querySelector('div.value');

                updateMetricFromTooltip(metricSelector);

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
        const currentMetricChart = allMetricCharts[i];

        if (!updateMetric(currentMetricChart)) {
            return false;
        }
    }

    return true;
}

function hideCompleteDescriptionBar() {
    const topIntroHeader = document.querySelector('div.header');

    if (topIntroHeader) {
        topIntroHeader.style.display = 'none';

        return true;
    }

    return false;
}

function hideDescriptionBar() {
    const topIntroHeader = document.querySelector('div.header');

    if (!topIntroHeader) {
        return false;
    }

    const mpLastUpdatedSelector = topIntroHeader.querySelector('mp-last-updated');

    if (!mpLastUpdatedSelector) {
        return false;
    }

    mpLastUpdatedSelector.parentElement.style.marginTop = '0px';
    mpLastUpdatedSelector.parentElement.style.marginBottom = '0px';

    // Board description container
    const boardDescriptionContainer = mpLastUpdatedSelector.parentElement.parentElement.parentElement;

    // Remove first child
    boardDescriptionContainer.firstChild.style.display = 'none';

    const boardDescriptionContainerWrapper = boardDescriptionContainer.parentElement;

    boardDescriptionContainerWrapper.firstChild.style.display = 'none';

    // Container of two columns that contains entire board description.
    const boardCompleteDescription = boardDescriptionContainerWrapper.parentElement;

    boardCompleteDescription.lastChild.style.display = 'none';

    return true;
}

function hideSearchBar() {
    const topHeader = document.querySelector('#wrapper').firstChild.nextSibling;

    if (topHeader) {
        topHeader.style.display = 'none';
        return true;
    }

    return false;
}

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

            // Set an observer to repeatedly update the metrics.
            const changingSelector = document.querySelector('.cards-container');

            const hash = changingSelector.hash;

            // Add observer
            if (!observers[hash]) {
                let observer = new MutationObserver(function(mutations) {
                    updatesComplete.displayConcreteNumbers = false;

                    update();
                });

                observer.observe(changingSelector, {
                    childList: true,
                    subtree: true
                });
                observers[hash] = observer;
            }
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