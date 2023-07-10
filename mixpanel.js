const topHeader = document.querySelector('#wrapper').firstChild.nextSibling;

if (topHeader) {
    topHeader.style.display = 'none';
}

const topIntroHeader = document.querySelector('div.header');

if (topIntroHeader) {
    topIntroHeader.style.display = 'none';
}

function updateValue() {
    const valueWrapper = document.querySelector('.metric-container');

    console.log('Yestsso');
    console.log('value', valueWrapper);
    if (valueWrapper) {
        valueWrapper.style.display = 'none';
    }
}

setTimeout(updateValue, 1500);