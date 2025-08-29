document.addEventListener('DOMContentLoaded', function() {
    fetch('apikey.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load apikey.json');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('api-keys-container');

            if (data.apikeys && Array.isArray(data.apikeys)) {
                data.apikeys.forEach(apiKeyData => {
                    const keyCard = document.createElement('div');
                    keyCard.classList.add('api-key-card');

                    const title = document.createElement('h3');
                    title.classList.add('key-title');
                    title.textContent = apiKeyData.name;

                    const description = document.createElement('p');
                    description.classList.add('key-description');
                    description.textContent = apiKeyData.description;

                    const keyContainer = document.createElement('div');
                    keyContainer.classList.add('key-container');

                    const keyText = document.createElement('span');
                    keyText.classList.add('key-text');
                    keyText.textContent = apiKeyData.key;
                    keyContainer.appendChild(keyText);

                    const copyButton = document.createElement('button');
                    copyButton.classList.add('copy-button');
                    copyButton.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Key`;
                    
                    // Add copy functionality to the button
                    copyButton.addEventListener('click', () => {
                        navigator.clipboard.writeText(apiKeyData.key).then(() => {
                            copyButton.textContent = 'Copied!';
                            copyButton.disabled = true;
                            setTimeout(() => {
                                copyButton.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Key`;
                                copyButton.disabled = false;
                            }, 2000);
                        }).catch(err => {
                            console.error('Could not copy text: ', err);
                            alert('Failed to copy key. Your browser might not support this feature on a local file.');
                        });
                    });

                    keyContainer.appendChild(copyButton);

                    keyCard.appendChild(title);
                    keyCard.appendChild(description);
                    keyCard.appendChild(keyContainer);
                    
                    container.appendChild(keyCard);
                });
            } else {
                container.innerHTML = '<p>No API keys found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or rendering API keys:', error);
            const container = document.getElementById('api-keys-container');
            container.innerHTML = '<p style="color:red;">Could not load API keys. Please check the file.</p>';
        });
});