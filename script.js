const toggleMenu = document.querySelector('.toggle-menu');
const mobileMenuContainer = document.querySelector('.mobile-menu-content');

toggleMenu.addEventListener('click', () => {
    mobileMenuContainer.classList.toggle('active')
});

const input = document.getElementsByTagName('input')[0];
const errorMessage = document.querySelector('.error-message');
const shortenBtn = document.querySelector('.shorten-btn');
const resultContainer = document.querySelector('.result-container');
 const endPoint = 'https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten';
console.log(resultContainer);

/*
https://cors-anywhere.herokuapp.com/corsdemo;

if it throws an you click on the above link to 
gain temporary access to the endpoint

*/

shortenBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const inputValue = input.value.trim();

  if (!inputValue) {
    showErrorMessage('Please add a link');
  } else {
    shortenLink(inputValue);
  }
});

function showErrorMessage(err) {
    errorMessage.textContent = err;
    input.style.border = '2px solid red';
    errorMessage.style.color = 'red';
}

function clearErrorMessage() {
    input.style.border = '';
    errorMessage.textContent = '';
}

input.addEventListener('focus', clearErrorMessage);


async function shortenLink(urlToShorten) {
    try {
        let response = await fetch(endPoint, {
            method: "POST",
            body: JSON.stringify({ url: urlToShorten }), 
            headers: { 'Content-type': 'application/json' }
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        displayLinks(urlToShorten, data.result_url);
        input.value = ''; 
        
    } catch (err) {
        showErrorMessage("Failed to shorten link. Try again.");
        console.error(err);
        setTimeout(() => {
        input.value = ''; 
        }, 2000)
    }
}

function displayLinks(original, short) {
   
    resultContainer.innerHTML = `
    <div class="result-card">
        <div class="url-container">
            <span class="original-url">${original}</span>
            <span class="short-url">${short}</span>
        </div>
        <button class="copy-btn" onclick="copyToClipboard(this, '${short}')">Copy</button>
    </div>
    `;
}

function copyToClipboard(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = '#3b3054'; 
    });
};
