const topHeader = document.querySelector('#wrapper').firstChild.nextSibling;

if (topHeader) {
    topHeader.style.display = 'none';
}

const topIntroHeader = document.querySelector('div.header');

if (topIntroHeader) {
    topIntroHeader.style.display = 'none';
}

function updateValue() {
    //const valueWrapper = document.querySelectorAll('div.card-report');
    const valueWrapper = document.querySelectorAll('mp-insights-metric-chart');

    console.log('Yestsso');
    console.log('value', valueWrapper);
    if (valueWrapper.length > 0) {
        const valueSelector = valueWrapper[0].shadowRoot.querySelector('mp-multi-metric');
        //valueWrapper[0].style.display = 'none';

        console.log('valueS', valueSelector);

        if (valueSelector) {
            const valueMetric = valueSelector.shadowRoot.querySelector('mp-metric');
            
            if (valueMetric) {
                const valueTooltip = valueMetric.getAttribute('value-tooltip');
                const value = valueMetric.shadowRoot.querySelector('div.value');
                const valueText = value.textContent;
                value.innerHTML = valueTooltip;

                console.log('valueText', valueText);
            }
        }
    }
}

setTimeout(updateValue, 2000);