document.addEventListener('DOMContentLoaded', function() {
    fetch('buttons.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load buttons.json');
            }
            return response.json();
        })
        .then(data => {
            const linksContainer = document.querySelector('.links-container');
            const visibleButtonsLimit = 4;
            const buttons = data.buttons || [];

            if (buttons.length > visibleButtonsLimit) {
                // Mảng để lưu trữ các nút ẩn
                const hiddenButtonsArray = [];

                // Hiển thị các nút ban đầu
                buttons.slice(0, visibleButtonsLimit).forEach(buttonData => {
                    linksContainer.appendChild(createButton(buttonData));
                });

                // Tạo các nút ẩn và lưu vào mảng
                buttons.slice(visibleButtonsLimit).forEach(buttonData => {
                    const button = createButton(buttonData);
                    button.classList.add('hidden-button');
                    hiddenButtonsArray.push(button);
                });

                // Thêm nút Show More vào cuối danh sách ban đầu
                const showMoreButton = document.createElement('a');
                showMoreButton.href = '#';
                showMoreButton.classList.add('link-button');
                showMoreButton.innerHTML = 'Show More <i class="fa-solid fa-chevron-down"></i>';
                linksContainer.appendChild(showMoreButton);

                // Xử lý sự kiện khi nhấp vào nút Show More
                showMoreButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    // Nếu đang ở trạng thái Show Less (đã mở rộng)
                    if (linksContainer.classList.contains('expanded')) {
                         // Thu gọn danh sách
                        linksContainer.classList.remove('expanded');
                        showMoreButton.innerHTML = 'Show More <i class="fa-solid fa-chevron-down"></i>';
                        // Loại bỏ các nút ẩn ra khỏi DOM
                        const buttonsToRemove = linksContainer.querySelectorAll('.hidden-button');
                        buttonsToRemove.forEach(button => linksContainer.removeChild(button));
                    } else {
                        // Mở rộng danh sách
                        linksContainer.classList.add('expanded');
                        showMoreButton.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
                        
                        // Chèn từng nút từ mảng vào trước nút Show More
                        hiddenButtonsArray.forEach(button => {
                            linksContainer.insertBefore(button, showMoreButton);
                        });
                        
                        // Cuộn trang xuống nút sau khi mở rộng
                        setTimeout(() => {
                            showMoreButton.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        }, 100);
                    }
                });
            } else {
                // Hiển thị tất cả các nút nếu số lượng nhỏ hơn giới hạn
                buttons.forEach(buttonData => {
                    linksContainer.appendChild(createButton(buttonData));
                });
            }
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            const linksContainer = document.querySelector('.links-container');
            linksContainer.innerHTML = '<p style="color:red;">Could not load buttons. Please check the file.</p>';
        });
});

function createButton(buttonData) {
    const button = document.createElement('a');
    button.href = buttonData.url;
    button.classList.add('link-button');
    button.target = '_blank';
    button.innerHTML = `<i class="${buttonData.icon}"></i> ${buttonData.name}`;
    return button;
}