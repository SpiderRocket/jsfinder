function Content() {
  
}
Content.prototype.fetch = function(url) {
  let urlValue = url.value.trim();
  if(!urlValue) {
    alert("Something went wrong...")
  }
  const corsProxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://cors-anywhere.herokuapp.com/${url}`
  ];
  tryFetchWithProxies(corsProxies, 0);
  function tryFetchWithProxies(proxies, index) {
      if (index >= proxies.length) {
        alert('Error: The proxies might be rate-limited or temporarily unavailable.');
        return;
      }
      
      fetch(proxies[index])
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
          }
          return response.text();
        })
        .then(html => {
          return html;
        })
        .catch(error => {
          console.error(`Error with proxy ${index}:`, error);
          tryFetchWithProxies(proxies, index + 1);
        });
    }
}
let content = new Content();
