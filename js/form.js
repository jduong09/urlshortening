document.addEventListener('DOMContentLoaded', () => {
  const inputUrl = document.getElementById('input-url');
  const inputSubmit = document.getElementById('input-submit');
  const inputError = document.getElementById('input-error-message');
  const listShortenedUrls = document.querySelector('.list-shortened-urls');

  inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    if (!inputUrl.value) {
      inputUrl.classList.add('nonfilled');
      inputError.classList.add('reveal');
    } else {
      inputUrl.classList.remove('nonfilled');
      inputError.classList.remove('reveal');
      const http = new XMLHttpRequest();
      const method = 'GET';
      const url = `https://api.shrtco.de/v2/shorten?url=${inputUrl.value}`;

      http.addEventListener('readystatechange', (e) => {
        if (http.readyState === XMLHttpRequest.DONE) {
          const status = http.status;
          const response = JSON.parse(http.response);
          if (status === 0 || (status >= 200 && status < 400)) {
            const itemShortenedUrl = document.createElement('li');
            const divGivenUrl = document.createElement('div');
            divGivenUrl.classList.add('given-url');
            divGivenUrl.innerText = response.result.original_link;

            const divShortenedUrl = document.createElement('div');
            divShortenedUrl.classList.add('shortened-url');
            divShortenedUrl.innerText = response.result.full_short_link;

            const btnCopy = document.createElement('button');
            btnCopy.classList.add('btn-copy');
            btnCopy.innerText = 'Copy';

            btnCopy.addEventListener('click', (e) => {
              e.preventDefault();

              navigator.permissions.query({name: "clipboard-write"}).then((result) => {
                if (result.state === "granted" || result.state === "prompt") {
                  navigator.clipboard.writeText(response.result.full_short_link).then(() => {
                    btnCopy.innerText = 'Copied!';
                    btnCopy.classList.add('copied');
                  }, () => {
                    console.log('clipboard write failed');
                  });
                }
              });
            })

            itemShortenedUrl.append(divGivenUrl, divShortenedUrl, btnCopy);

            listShortenedUrls.append(itemShortenedUrl);
          } else {
            console.log(response.error);
          }
        }
      });

      http.open(method, url, true);
      http.send();
    }
  });
});