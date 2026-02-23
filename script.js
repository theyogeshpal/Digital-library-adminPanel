function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    event.target.closest('.nav-item').classList.add('active');
    
    const titles = {
        'dashboard': 'Dashboard',
        'users': 'User Management',
        'books': 'Book Management',
        'settings': 'Settings'
    };
    document.getElementById('page-title').textContent = titles[sectionId];
}

function showAddUserModal() {
    alert('Add User functionality - Connect to your backend API');
}

function showAddBookModal() {
    alert('Add Book functionality - Connect to your backend API');
}

document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Edit functionality - Connect to your backend API');
    });
});

document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
        if(confirm('Are you sure you want to delete?')) {
            alert('Delete functionality - Connect to your backend API');
        }
    });
});

document.querySelector('.logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    if(confirm('Are you sure you want to logout?')) {
        window.location.href = '../Frontend/index.html';
    }
});
