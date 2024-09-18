document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastUpdatedDate').textContent = new Date(document.lastModified).toLocaleDateString("en-US");
})