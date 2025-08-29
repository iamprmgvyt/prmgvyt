document.addEventListener('DOMContentLoaded', function() {
    const fileButtonsContainer = document.querySelector('.file-buttons-container');
    const codeViewerContainer = document.querySelector('.code-viewer-container');

    // CSS Styling
    const cssContent = `
.file-buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.file-button {
    background-color: #569cd6;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.file-button:hover {
    background-color: #4a8ac1;
    transform: translateY(-2px);
}

.file-button.active {
    background-color: #2ecc71;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(46, 204, 113, 0.4);
}

.code-viewer-container {
    text-align: left;
    margin-top: 20px;
    width: 100%;
}

.code-block {
    background-color: #2b2b2b;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    padding: 20px;
    overflow-x: auto;
    transition: transform 0.3s ease;
}

pre {
    margin: 0;
    padding: 0;
}

code {
    display: block;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-all;
    color: #f0f0f0;
}
    `;

    // Inject CSS into the document's head
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = cssContent;
    document.head.appendChild(styleSheet);

    // Hàm để tải và hiển thị nội dung tệp
    async function loadFiles() {
        try {
            const response = await fetch('viewsource.json');
            if (!response.ok) {
                throw new Error('Failed to load viewsource.json');
            }
            const data = await response.json();
            
            // Tạo nút cho mỗi tệp
            data.files.forEach(file => {
                const button = document.createElement('button');
                button.classList.add('file-button');
                button.textContent = file.name;
                
                button.addEventListener('click', () => {
                    // Xóa mã nguồn cũ
                    codeViewerContainer.innerHTML = '';
                    
                    // Tạo khối mã nguồn mới
                    const codeBlock = document.createElement('div');
                    codeBlock.classList.add('code-block');
                    
                    const preElement = document.createElement('pre');
                    const codeElement = document.createElement('code');
                    
                    // Thêm class để highlight cú pháp
                    if (file.name.endsWith('.html')) {
                        codeElement.classList.add('language-html');
                    } else if (file.name.endsWith('.css')) {
                        codeElement.classList.add('language-css');
                    } else if (file.name.endsWith('.js')) {
                        codeElement.classList.add('language-js');
                    } else if (file.name.endsWith('.json')) {
                        codeElement.classList.add('language-json');
                    }

                    // Đặt nội dung của tệp vào thẻ code
                    codeElement.textContent = file.content;
                    
                    preElement.appendChild(codeElement);
                    codeBlock.appendChild(preElement);
                    codeViewerContainer.appendChild(codeBlock);
                    
                    // Đánh dấu nút đang hoạt động
                    document.querySelectorAll('.file-button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
                
                fileButtonsContainer.appendChild(button);
            });
        } catch (error) {
            console.error('Error loading files:', error);
            fileButtonsContainer.innerHTML = '<p style="color:red; text-align: center;">Could not load source files. Please check file paths.</p>';
        }
    }
    
    loadFiles();
});