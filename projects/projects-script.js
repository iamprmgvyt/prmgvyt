document.addEventListener('DOMContentLoaded', function() {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load projects.json');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('projects-container');

            if (data.projects && Array.isArray(data.projects)) {
                data.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.classList.add('project-card');

                    if (project.image) {
                        const projectImage = document.createElement('img');
                        projectImage.src = project.image;
                        projectImage.alt = project.name;
                        projectImage.classList.add('project-image');
                        projectDiv.appendChild(projectImage);
                    }

                    const title = document.createElement('h3');
                    title.classList.add('project-title');
                    title.textContent = project.name;
                    projectDiv.appendChild(title);

                    const description = document.createElement('p');
                    description.classList.add('project-description');
                    description.textContent = project.description;
                    projectDiv.appendChild(description);

                    const techList = document.createElement('p');
                    techList.classList.add('project-tech');
                    techList.textContent = `Technologies: ${project.tech.join(', ')}`;
                    projectDiv.appendChild(techList);

                    if (project.url) {
                        const link = document.createElement('a');
                        link.href = project.url;
                        link.target = '_blank';
                        link.classList.add('project-link');
                        link.innerHTML = `<i class="fa-solid fa-code"></i> View Code`;
                        projectDiv.appendChild(link);
                    }
                    
                    container.appendChild(projectDiv);
                });
            } else {
                container.innerHTML = '<p>No projects found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or rendering projects:', error);
            const container = document.getElementById('projects-container');
            container.innerHTML = '<p style="color:red;">Could not load projects. Please check the file.</p>';
        });
});