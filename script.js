const mobileMenuContent = document.querySelector('.mobile-menu-content');
const mobileToggle = document.querySelector('.mobile-toggle');

mobileToggle.addEventListener('click', () => {
  mobileMenuContent.classList.toggle('active');
});

const linkInput = document.getElementsByTagName('input')[0];
const shortenBtn = document.querySelector('.shorten-btn');
const errorMessage = document.querySelector('.error-message');
const shortenedLinksContainer = document.querySelector('.shortened-links-container');

function urlInput() {
   const inputValue = linkInput.value.trim()
  
    if (inputValue === '') {
      errorMessage.textContent = 'Enter a link';
      linkInput.style.border = '2px solid red';
    }

    linkInput.value = '';
};

function clearErrorMessage() {
   errorMessage.textContent = '';
   linkInput.style.border = 'none';
};


async function shortenUrl(longUrl) {
   const endPoint = 'https://cleanuri.com/api/v1/shorten';

   try {
      const response = fetch(endPoint, {
      method: 'POST',
      headers: 'application/json()',
      body: JSON.stringify(URL, longUrl),
    });
   
    if (!response.ok) {
        throw new Error(`Fail request with status: ${response.status}`)
    }
   }

   catch(error) {

   }
};

shortenBtn.addEventListener('click', urlInput);
linkInput.addEventListener('focus', clearErrorMessage);
