document.addEventListener('DOMContentLoaded', function() {
    fetch('blog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load blog.json');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('blog-posts-container');

            if (data.posts && Array.isArray(data.posts)) {
                data.posts.forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.classList.add('blog-post');

                    const title = document.createElement('h2');
                    title.classList.add('post-title');
                    title.textContent = post.title;

                    const date = document.createElement('p');
                    date.classList.add('post-date');
                    date.textContent = `Published on: ${post.date}`;

                    const contentDiv = document.createElement('div');
                    contentDiv.classList.add('post-content');

                    post.content.forEach(paragraphText => {
                        const p = document.createElement('p');
                        p.innerHTML = paragraphText;
                        contentDiv.appendChild(p);
                    });

                    postDiv.appendChild(title);
                    postDiv.appendChild(date);
                    postDiv.appendChild(contentDiv);

                    container.appendChild(postDiv);
                });
            } else {
                console.error('Invalid post data in blog.json.');
                container.innerHTML = '<p>No blog posts found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or rendering blog posts:', error);
            const container = document.getElementById('blog-posts-container');
            container.innerHTML = '<p style="color:red;">Could not load blog posts. Please check the file.</p>';
        });
});