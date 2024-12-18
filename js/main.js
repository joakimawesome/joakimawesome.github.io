// Filter functionality
const buttons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projects.forEach(project => {
            const tags = project.getAttribute('data-tags').split(' ');
            if (filter === 'all' || tags.includes(filter)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    });
});