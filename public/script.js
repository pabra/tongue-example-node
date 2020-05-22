(function(w) {
  const handleLoad = () => {
    const formEl = w.document.getElementsByTagName('form')[0];
    const logEl = w.document.getElementById('log');
    const handleSubmit = ev => {
      ev.preventDefault();
      const formData = new w.FormData(formEl);
      const lang = formData.get('lang');
      const name = formData.get('name');
      const request = new w.Request(`/api/${lang}/greet/${name}`);
      const url = new w.URL(request.url);
      logEl.textContent += `-> Request URL: ${url.pathname}\n`;
      w.fetch(request)
        .then(response => {
          return response.text();
        })
        .then(responseText => {
          logEl.textContent += `<- Response text: ${responseText}\n\n`;
        });
    };

    formEl.addEventListener('submit', handleSubmit);
  };
  w.addEventListener('load', handleLoad);
})(window);
