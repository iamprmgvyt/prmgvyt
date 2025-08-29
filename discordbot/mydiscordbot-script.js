document.addEventListener('DOMContentLoaded', function() {
    fetch('mydiscordbot.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load mydiscordbot.json');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('bots-container');
            
            if (data.bots && Array.isArray(data.bots)) {
                data.bots.forEach(botData => {
                    const botCard = document.createElement('div');
                    botCard.classList.add('bot-card');

                    const avatar = document.createElement('img');
                    avatar.classList.add('bot-avatar');
                    // Sử dụng thuộc tính 'image' và thêm phần mở rộng .png
                    avatar.src = botData.image + '.png'; 
                    avatar.alt = botData.name + ' avatar';

                    const botDetails = document.createElement('div');
                    botDetails.classList.add('bot-details');

                    const title = document.createElement('h3');
                    title.classList.add('bot-title');
                    title.textContent = botData.name;

                    const description = document.createElement('p');
                    description.classList.add('bot-description');
                    description.textContent = botData.description;

                    const status = document.createElement('p');
                    status.classList.add('bot-status');
                    // Sử dụng botData.status.toLowerCase() để phù hợp với CSS class online/offline
                    status.innerHTML = `Status: <span class="${botData.status.toLowerCase()}">${botData.status}</span>`;

                    const linksContainer = document.createElement('div');
                    linksContainer.classList.add('bot-links-container');

                    // Hiển thị nút Invite nếu có 'link'
                    if (botData.link) {
                        const inviteLink = document.createElement('a');
                        inviteLink.classList.add('bot-link', 'invite-button');
                        inviteLink.href = botData.link;
                        inviteLink.target = '_blank';
                        inviteLink.innerHTML = '<i class="fa-brands fa-discord"></i> Invite';
                        linksContainer.appendChild(inviteLink);
                    }

                    // Hiển thị nút Website nếu có 'website'
                    if (botData.website) {
                        const websiteLink = document.createElement('a');
                        websiteLink.classList.add('bot-link', 'website-button');
                        websiteLink.href = botData.website;
                        websiteLink.target = '_blank';
                        websiteLink.innerHTML = '<i class="fa-solid fa-link"></i> Website';
                        linksContainer.appendChild(websiteLink);
                    }

                    botDetails.appendChild(title);
                    botDetails.appendChild(description);
                    botDetails.appendChild(status);
                    botDetails.appendChild(linksContainer);

                    botCard.appendChild(avatar);
                    botCard.appendChild(botDetails);

                    container.appendChild(botCard);
                });
            } else {
                container.innerHTML = '<p>No Discord bots found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or rendering Discord bots:', error);
            const container = document.getElementById('bots-container');
            container.innerHTML = '<p style="color:red;">Could not load Discord bots. Please check the file.</p>';
        });
});